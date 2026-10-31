import type pg from "pg";
import {
  classifyReceiptItemCategory,
  normalizeGeoPoint,
  type DbItemCategory,
  type GeoPoint,
} from "./anonymizer.js";
import { foodPriceTracker } from "./foodPriceTracker.js";
import type { BillMatrixItem, ContextualRecommendation } from "./types.js";

/**
 * Native CPA Recommendation & Spatial Price Benchmarking Engine (`cpaEngine.ts`).
 *
 * 1. Builds parameterized PostGIS `ST_DWithin` spatial queries (1000m radius, SRID 4326)
 *    against `receipt_items` to discover nearby restaurants with lower dish prices.
 * 2. Generates native conversational CPA comparison snippets with promo code `SPLITTEL`.
 * 3. Renders standalone HTML widget containers (`renderCpaPromoCardHtml`) with CTA buttons.
 */

export const DEFAULT_RADIUS_METERS = 1000;

export interface PostGisRadiusQueryInput {
  lat: number;
  lng: number;
  currency: string;
  categories?: DbItemCategory[];
  radiusMeters?: number;
  excludeRestaurantName?: string;
}

export interface FormattedSqlQuery {
  text: string;
  values: unknown[];
}

export interface NearbyRestaurantBenchmark {
  restaurant_name: string;
  category: DbItemCategory;
  sample_count: number;
  avg_price_cents: number;
  min_price_cents: number;
  distance_meters: number;
}

/**
 * Formats a parameterized PostGIS spatial radius query (`ST_DWithin` in meters on `geography`, SRID 4326).
 * Note: PostGIS `ST_MakePoint(longitude, latitude)` takes `lng` as X ($1) and `lat` as Y ($2).
 */
export function formatPostGisRadiusQuery(
  input: PostGisRadiusQueryInput
): FormattedSqlQuery {
  const point = normalizeGeoPoint({ lat: input.lat, lng: input.lng });
  if (!point) {
    throw new Error(
      `Invalid geographic coordinates for PostGIS query: lat=${input.lat}, lng=${input.lng}`
    );
  }

  const radius =
    typeof input.radiusMeters === "number" && input.radiusMeters > 0
      ? Math.min(Math.round(input.radiusMeters), 50_000)
      : DEFAULT_RADIUS_METERS;

  const currency = (input.currency || "RUB").trim().toUpperCase();
  const categories: DbItemCategory[] =
    input.categories && input.categories.length > 0
      ? input.categories
      : ["mains", "drinks", "desserts", "starters", "other"];

  const values: unknown[] = [point.lng, point.lat, currency, categories, radius];
  let excludeClause = "";

  if (input.excludeRestaurantName && input.excludeRestaurantName.trim()) {
    values.push(input.excludeRestaurantName.trim());
    excludeClause = `AND (restaurant_name IS NULL OR LOWER(restaurant_name) <> LOWER($${values.length}))`;
  }

  const text = `
SELECT
  COALESCE(restaurant_name, 'Соседнее заведение') AS restaurant_name,
  category::text AS category,
  COUNT(*)::int AS sample_count,
  ROUND(AVG(price_cents))::bigint AS avg_price_cents,
  MIN(price_cents)::bigint AS min_price_cents,
  ROUND(
    MIN(
      ST_Distance(
        location::geography,
        ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography
      )
    )
  )::int AS distance_meters
FROM receipt_items
WHERE currency = $3
  AND category = ANY($4::item_category[])
  AND location IS NOT NULL
  AND ST_DWithin(
    location::geography,
    ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography,
    $5
  )
  ${excludeClause}
GROUP BY COALESCE(restaurant_name, 'Соседнее заведение'), category
ORDER BY avg_price_cents ASC, distance_meters ASC
LIMIT 10;
`.trim();

  return { text, values };
}

/**
 * Executes the PostGIS 1000m radius query when a live PostgreSQL + PostGIS pool is available.
 */
export async function queryNearbyBenchmarksPostGis(
  pool: pg.Pool | undefined,
  postgisAvailable: boolean,
  input: PostGisRadiusQueryInput
): Promise<NearbyRestaurantBenchmark[]> {
  if (!pool || !postgisAvailable) {
    return [];
  }
  const query = formatPostGisRadiusQuery(input);
  try {
    const res = await pool.query<{
      restaurant_name: string;
      category: DbItemCategory;
      sample_count: number;
      avg_price_cents: string | number;
      min_price_cents: string | number;
      distance_meters: number;
    }>(query.text, query.values);

    return res.rows.map((r) => ({
      restaurant_name: r.restaurant_name,
      category: r.category,
      sample_count: Number(r.sample_count),
      avg_price_cents: Number(r.avg_price_cents),
      min_price_cents: Number(r.min_price_cents),
      distance_meters: Number(r.distance_meters),
    }));
  } catch {
    return [];
  }
}

export function getCurrencyDisplaySymbol(code: string): string {
  switch ((code || "RUB").toUpperCase()) {
    case "ILS":
      return "₪";
    case "RUB":
      return "₽";
    case "USD":
      return "$";
    case "EUR":
      return "€";
    case "THB":
      return "฿";
    case "TRY":
      return "₺";
    case "AED":
      return "AED";
    case "KZT":
      return "₸";
    case "GEL":
      return "₾";
    case "GBP":
      return "£";
    default:
      return code.toUpperCase();
  }
}

export function formatCpaMoney(amount: number, currency: string): string {
  const sym = getCurrencyDisplaySymbol(currency);
  const rounded = Math.round(amount);
  const formatted = rounded.toLocaleString("ru-RU", {
    maximumFractionDigits: 0,
  });
  if (sym === "$" || sym === "€" || sym === "£") {
    return `${sym}${formatted}`;
  }
  return `${formatted} ${sym}`;
}

const PROMO_DISCOUNT_PERCENT = 10;

/**
 * Generates a native CPA recommendation card strictly from live PostGIS spatial benchmarks
 * or live crowdsourced `FoodPriceTracker` records. Returns `null` (explicit empty state)
 * when no cheaper live restaurant benchmark is available in the database.
 */
export function generateCpaRecommendation(params: {
  title?: string;
  grand_total: number;
  currency: string;
  items: BillMatrixItem[];
  people_count: number;
  publicBaseUrl?: string;
  geo_location?: GeoPoint | null;
  nearbyBenchmarks?: NearbyRestaurantBenchmark[];
}): ContextualRecommendation | null {
  const {
    title = "",
    grand_total,
    currency,
    items,
    publicBaseUrl,
    nearbyBenchmarks = [],
  } = params;

  if (!items || items.length === 0 || grand_total <= 0) {
    return null;
  }

  const cur = (currency || "RUB").trim().toUpperCase();
  const normalizedTitle = title.trim().toLowerCase();
  const currentAvgItemCents =
    (items.reduce((acc, item) => acc + item.price, 0) / items.length) * 100;

  let partnerName: string | null = null;
  let cheaperPct = 0;
  let distanceMeters: number | undefined;
  let averageAreaCheck = 0;

  // 1. Primary source: Live PostGIS 1000m spatial radius benchmarks (`receipt_items`)
  if (nearbyBenchmarks.length > 0) {
    const candidate = nearbyBenchmarks.find(
      (b) =>
        b.avg_price_cents > 0 &&
        b.avg_price_cents < currentAvgItemCents &&
        b.restaurant_name.trim().toLowerCase() !== normalizedTitle
    );
    if (candidate) {
      partnerName = candidate.restaurant_name;
      distanceMeters = candidate.distance_meters;
      const computedDiff = Math.round(
        ((currentAvgItemCents - candidate.avg_price_cents) /
          currentAvgItemCents) *
          100
      );
      cheaperPct = Math.max(5, Math.min(50, computedDiff));
      const allAvgCents =
        nearbyBenchmarks.reduce((acc, b) => acc + b.avg_price_cents, 0) /
        nearbyBenchmarks.length;
      averageAreaCheck = Math.max(
        1,
        Math.round(((allAvgCents / 100) * items.length) / 5) * 5
      );
    }
  }

  // 2. Secondary source: Live crowdsourced FoodPriceTracker records (no static seeds)
  if (!partnerName) {
    const liveRecords = foodPriceTracker
      .getRecords({ currency: cur })
      .filter(
        (r) =>
          r.items.length > 0 &&
          r.restaurant_name &&
          r.restaurant_name !== "Anonymous Restaurant" &&
          r.restaurant_name.trim().toLowerCase() !== normalizedTitle
      );

    let bestAvgPrice = currentAvgItemCents / 100;
    for (const rec of liveRecords) {
      const recAvg =
        rec.items.reduce((acc, i) => acc + i.price, 0) / rec.items.length;
      if (recAvg > 0 && recAvg < bestAvgPrice && rec.restaurant_name) {
        bestAvgPrice = recAvg;
        partnerName = rec.restaurant_name;
      }
    }

    if (partnerName) {
      const currentAvg = currentAvgItemCents / 100;
      const computedDiff = Math.round(
        ((currentAvg - bestAvgPrice) / currentAvg) * 100
      );
      cheaperPct = Math.max(5, Math.min(50, computedDiff));
      const indexSummary = foodPriceTracker.getFoodPriceIndex(cur);
      averageAreaCheck =
        indexSummary.average_receipt_total > 0
          ? Math.round(indexSummary.average_receipt_total)
          : Math.round(grand_total);
    }
  }

  // Explicit empty state when no live database / crowdsourced match exists
  if (!partnerName || cheaperPct <= 0) {
    return null;
  }

  const referenceCheck = averageAreaCheck > 0 ? averageAreaCheck : Math.round(grand_total);
  const neighborBasePrice = Math.round(referenceCheck * (1 - cheaperPct / 100));
  const finalPartnerPrice = Math.max(
    1,
    Math.round(neighborBasePrice * (1 - PROMO_DISCOUNT_PERCENT / 100))
  );
  const totalSavingsAmount = Math.max(1, referenceCheck - finalPartnerPrice);

  const baseUrl = (
    publicBaseUrl || "https://splittel-production.up.railway.app"
  ).replace(/\/+$/, "");
  const actionUrl = `${baseUrl}/r/partner-offer?code=SPLITTEL&partner=${encodeURIComponent(
    partnerName
  )}&currency=${encodeURIComponent(cur)}`;

  const distanceNote =
    typeof distanceMeters === "number" && distanceMeters > 0
      ? ` (${distanceMeters} м от вас)`
      : "";

  const message = `Средний чек по базе района — ${formatCpaMoney(
    referenceCheck,
    cur
  )}. В '${partnerName}'${distanceNote} аналогичный заказ на ${cheaperPct}% дешевле — ${formatCpaMoney(
    finalPartnerPrice,
    cur
  )} (дополнительная скидка ${PROMO_DISCOUNT_PERCENT}% по промокоду SPLITTEL).`;

  return {
    type: "partner_offer",
    headline: "Сравнение цен по живой базе чеков (радиус 1 км)",
    badge: `На ${cheaperPct}% дешевле • Промокод SPLITTEL`,
    message,
    restaurant_name: title || undefined,
    average_area_check: referenceCheck,
    partner_name: partnerName,
    partner_price: finalPartnerPrice,
    savings_percent: cheaperPct,
    savings_amount: totalSavingsAmount,
    promo_code: "SPLITTEL",
    action_url: actionUrl,
    cta_text: "Забронировать со скидкой",
  };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Server-side HTML renderer for the CPA native promo card container (`<div>` + CTA button).
 * Returns empty string when `recommendation` is null/undefined.
 */
export function renderCpaPromoCardHtml(
  recommendation: ContextualRecommendation | null | undefined
): string {
  if (!recommendation) {
    return "";
  }
  const headline = escapeHtml(recommendation.headline);
  const badge = escapeHtml(recommendation.badge ?? "CPA-партнер");
  const message = escapeHtml(recommendation.message);
  const promoCode = escapeHtml(recommendation.promo_code ?? "SPLITTEL");
  const actionUrl = escapeHtml(recommendation.action_url ?? "#");
  const ctaText = escapeHtml(
    recommendation.cta_text ?? "Забронировать со скидкой"
  );

  return `<div class="cpa-promo-widget rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4" data-promo-code="${promoCode}">
  <div class="flex flex-wrap items-center justify-between gap-2 mb-1.5">
    <span class="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">💡 ${headline}</span>
    <span class="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-300">${badge}</span>
  </div>
  <p class="text-xs leading-relaxed mb-3">${message}</p>
  <a href="${actionUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white transition hover:bg-emerald-500">
    ${ctaText}
  </a>
</div>`;
}

/**
 * Extracts unique `DbItemCategory` values from bill matrix items for PostGIS radius queries.
 */
export function extractCategoriesFromItems(
  items: Array<{ item_name: string }>
): DbItemCategory[] {
  const set = new Set<DbItemCategory>();
  for (const item of items) {
    set.add(classifyReceiptItemCategory(item.item_name));
  }
  return Array.from(set);
}

