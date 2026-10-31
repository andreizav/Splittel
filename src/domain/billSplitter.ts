import { randomUUID } from "node:crypto";
import QRCode from "qrcode";
import { normalizeCurrency, resolveExchangeRate } from "./fxConverter.js";
import { buildContextualRecommendation } from "./recommendationEngine.js";
import { foodPriceTracker } from "./foodPriceTracker.js";
import { anonymizeReceiptForIndex, normalizeGeoPoint } from "./anonymizer.js";
import type { NearbyRestaurantBenchmark } from "./cpaEngine.js";
import type {
  BillMatrixItem,
  ParsedBillBoard,
  PersonAssignedItem,
  PersonBillSummary,
  RawReceiptItem,
  TransactionStatus,
} from "./types.js";

export interface ParseAndSplitInput {
  raw_items: RawReceiptItem[];
  people: string[];
  assignments?: Record<string, string[]>;
  tip_percentage?: number;
  tax_amount?: number;
  currency?: string;
  settlement_currency?: string;
  exchange_rate?: number;
  title?: string;
  baseUrl?: string;
  billId?: string;
  existingStatuses?: Map<
    string,
    { status: TransactionStatus; settled_at?: string; settled_by?: string }
  >;
  ownerSub?: string;
  image_url?: string | null;
  geo_location?: { lat?: number; lng?: number } | null;
  nearbyBenchmarks?: NearbyRestaurantBenchmark[];
}

export function toCents(amount: number): number {
  return Math.round((amount + Number.EPSILON) * 100);
}

export function fromCents(cents: number): number {
  return Number((cents / 100).toFixed(2));
}

function slugifyName(name: string): string {
  return (
    name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9а-яё]+/gi, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 24) || "guest"
  );
}

/**
 * Largest Remainder Method (Hare-Niemeyer) to distribute `totalCents` across
 * `weights` with zero penny/kopek drift: sum(result) === totalCents is strictly guaranteed.
 */
export function allocateProportionalCents(
  totalCents: number,
  weights: number[]
): number[] {
  if (weights.length === 0) return [];
  if (totalCents === 0) return weights.map(() => 0);

  const totalWeight = weights.reduce((acc, w) => acc + Math.max(0, w), 0);
  const effectiveWeights =
    totalWeight > 0 ? weights.map((w) => Math.max(0, w)) : weights.map(() => 1);
  const denom = effectiveWeights.reduce((acc, w) => acc + w, 0);

  const sign = totalCents < 0 ? -1 : 1;
  const absTotal = Math.abs(totalCents);

  const exactQuotas = effectiveWeights.map((w) => (absTotal * w) / denom);
  const floors = exactQuotas.map((q) => Math.floor(q));
  const remainder = absTotal - floors.reduce((acc, f) => acc + f, 0);

  const rankedIndices = exactQuotas
    .map((q, idx) => ({ idx, frac: q - (floors[idx] ?? 0) }))
    .sort((a, b) => (b.frac !== a.frac ? b.frac - a.frac : a.idx - b.idx));

  for (let i = 0; i < remainder; i++) {
    const target = rankedIndices[i];
    if (target !== undefined) {
      floors[target.idx] = (floors[target.idx] ?? 0) + 1;
    }
  }

  return floors.map((v) => v * sign);
}

function normalizeKey(s: string): string {
  return s.trim().toLowerCase();
}

export async function parseAndSplitBill(
  input: ParseAndSplitInput
): Promise<ParsedBillBoard> {
  const tipPercentage = input.tip_percentage ?? 10;
  const taxAmountCents = toCents(Math.max(0, input.tax_amount ?? 0));
  const currency = normalizeCurrency(input.currency, "RUB");
  const fx = resolveExchangeRate({
    fromCurrency: currency,
    toCurrency: input.settlement_currency ?? currency,
    explicitRate: input.exchange_rate,
  });
  const settlementCurrency = fx.to_currency;
  const exchangeRate = fx.rate;

  const title = input.title?.trim() || "Splittel Restaurant Check";
  const cleanBaseUrl = (input.baseUrl ?? "https://localhost:3443").replace(
    /\/+$/,
    ""
  );
  const rawAssignments = input.assignments ?? {};

  const seenPeople = new Map<string, string>();
  for (const p of input.people) {
    const clean = p.trim();
    if (clean && !seenPeople.has(normalizeKey(clean))) {
      seenPeople.set(normalizeKey(clean), clean);
    }
  }
  for (const assignedPerson of Object.keys(rawAssignments)) {
    const clean = assignedPerson.trim();
    if (clean && !seenPeople.has(normalizeKey(clean))) {
      seenPeople.set(normalizeKey(clean), clean);
    }
  }

  const participants = Array.from(seenPeople.values());
  if (participants.length === 0) {
    throw new Error(
      "At least one person must be provided in `people` or `assignments`."
    );
  }

  const canonicalAssignments: Record<string, string[]> = {};
  const personItemOccurrences = new Map<string, Map<string, number>>();
  for (const person of participants) {
    canonicalAssignments[person] = [];
    personItemOccurrences.set(normalizeKey(person), new Map());
  }

  for (const [rawPerson, itemNames] of Object.entries(rawAssignments)) {
    const pKey = normalizeKey(rawPerson);
    const canonicalPerson = seenPeople.get(pKey);
    const map = personItemOccurrences.get(pKey);
    if (!map || !canonicalPerson) continue;
    for (const rawItemName of itemNames) {
      const cleanItem = rawItemName.trim();
      const iKey = normalizeKey(cleanItem);
      if (!iKey) continue;
      canonicalAssignments[canonicalPerson]!.push(cleanItem);
      map.set(iKey, (map.get(iKey) ?? 0) + 1);
    }
  }

  const perPersonItems = new Map<string, PersonAssignedItem[]>();
  const perPersonSubtotalCents = new Map<string, number>();
  for (const person of participants) {
    perPersonItems.set(person, []);
    perPersonSubtotalCents.set(person, 0);
  }

  let billSubtotalCents = 0;
  const unassignedItems: string[] = [];
  const matrixItems: BillMatrixItem[] = [];

  input.raw_items.forEach((rawItem, itemIdx) => {
    const quantity =
      rawItem.quantity !== undefined && rawItem.quantity > 0
        ? Math.round(rawItem.quantity)
        : 1;
    const unitPriceCents = toCents(rawItem.price);
    const lineTotalCents = toCents(rawItem.price * quantity);
    billSubtotalCents += lineTotalCents;

    const itemId = `item_${itemIdx + 1}`;
    matrixItems.push({
      item_id: itemId,
      item_name: rawItem.item_name,
      price: fromCents(unitPriceCents),
      quantity,
      line_total: fromCents(lineTotalCents),
    });

    const itemKey = normalizeKey(rawItem.item_name);

    const weights = participants.map((person) => {
      const pMap = personItemOccurrences.get(normalizeKey(person));
      return pMap?.get(itemKey) ?? 0;
    });

    const totalAssignedWeight = weights.reduce((a, b) => a + b, 0);
    const isUnassigned = totalAssignedWeight === 0;
    if (isUnassigned) {
      unassignedItems.push(rawItem.item_name);
    }

    const effectiveWeights = isUnassigned ? participants.map(() => 1) : weights;
    const totalEffectiveWeight = effectiveWeights.reduce((a, b) => a + b, 0);
    const allocatedCents = allocateProportionalCents(
      lineTotalCents,
      effectiveWeights
    );
    const sharedWithCount = effectiveWeights.filter((w) => w > 0).length;

    participants.forEach((person, idx) => {
      const weight = effectiveWeights[idx] ?? 0;
      const shareCents = allocatedCents[idx] ?? 0;
      if (weight <= 0 && shareCents === 0) return;

      const qtyShare = Number(
        ((quantity * weight) / totalEffectiveWeight).toFixed(2)
      );
      const itemsList = perPersonItems.get(person)!;
      itemsList.push({
        item_id: itemId,
        item_name: rawItem.item_name,
        quantity_share: qtyShare,
        unit_price: fromCents(unitPriceCents),
        line_total: fromCents(lineTotalCents),
        person_share: fromCents(shareCents),
        shared_with_count: sharedWithCount,
        unassigned_split: isUnassigned,
      });

      perPersonSubtotalCents.set(
        person,
        (perPersonSubtotalCents.get(person) ?? 0) + shareCents
      );
    });
  });

  const tipAmountCents = Math.round((billSubtotalCents * tipPercentage) / 100);
  const grandTotalCents = billSubtotalCents + taxAmountCents + tipAmountCents;

  const subtotalWeights = participants.map(
    (person) => perPersonSubtotalCents.get(person) ?? 0
  );
  const taxSharesCents = allocateProportionalCents(
    taxAmountCents,
    subtotalWeights
  );
  const tipSharesCents = allocateProportionalCents(
    tipAmountCents,
    subtotalWeights
  );

  const perPersonReceiptTotalCents = participants.map(
    (_p, idx) =>
      (subtotalWeights[idx] ?? 0) +
      (taxSharesCents[idx] ?? 0) +
      (tipSharesCents[idx] ?? 0)
  );

  // Convert receipt grand total into settlement currency with zero kopek/cent drift
  const settlementGrandTotalCents = Math.round(grandTotalCents * exchangeRate);
  const settlementSharesCents =
    settlementCurrency === currency
      ? perPersonReceiptTotalCents
      : allocateProportionalCents(
          settlementGrandTotalCents,
          perPersonReceiptTotalCents
        );

  const billId =
    input.billId ?? `bill_${randomUUID().replace(/-/g, "").slice(0, 10)}`;
  const shortId = billId.replace(/^bill_/, "");
  const createdAt = new Date().toISOString();
  const shareUrl = `${cleanBaseUrl}/ui/bill-board?bill_id=${encodeURIComponent(billId)}`;

  const peopleShares: PersonBillSummary[] = await Promise.all(
    participants.map(async (person, idx) => {
      const subCents = subtotalWeights[idx] ?? 0;
      const taxCents = taxSharesCents[idx] ?? 0;
      const tipCents = tipSharesCents[idx] ?? 0;
      const totalOwedCents = perPersonReceiptTotalCents[idx] ?? 0;
      const settlementTotalCents =
        settlementSharesCents[idx] ?? totalOwedCents;

      const transactionId = `txn_${shortId}_${idx + 1}_${slugifyName(person)}`;
      const preserved = input.existingStatuses?.get(normalizeKey(person));

      const payUrl = `${cleanBaseUrl}/pay/${encodeURIComponent(transactionId)}`;
      // SBP transfers always use settlement currency (typically RUB)
      const sbpLink = `https://qr.nspk.ru/${shortId}${idx + 1}?type=02&sum=${settlementTotalCents}&cur=${settlementCurrency}`;
      const stripeLink = `https://checkout.stripe.com/c/pay/${encodeURIComponent(transactionId)}?amount=${settlementTotalCents}&currency=${settlementCurrency.toLowerCase()}`;

      const qrSvg = await QRCode.toString(sbpLink, {
        type: "svg",
        margin: 1,
        width: 176,
        color: { dark: "#0f172a", light: "#ffffff" },
      });
      const qrCodeDataUri = `data:image/svg+xml;base64,${Buffer.from(qrSvg, "utf-8").toString("base64")}`;

      return {
        person,
        transaction_id: transactionId,
        status: preserved?.status ?? "PENDING",
        settled_at: preserved?.settled_at,
        settled_by: preserved?.settled_by,
        items: perPersonItems.get(person) ?? [],
        items_subtotal: fromCents(subCents),
        tax_share: fromCents(taxCents),
        tip_share: fromCents(tipCents),
        total_owed: fromCents(totalOwedCents),
        settlement_currency: settlementCurrency,
        settlement_total_owed: fromCents(settlementTotalCents),
        payment: {
          pay_url: payUrl,
          sbp_link: sbpLink,
          stripe_link: stripeLink,
          qr_code_data_uri: qrCodeDataUri,
        },
      };
    })
  );

  const grandTotal = fromCents(grandTotalCents);
  const safeGeo = normalizeGeoPoint(input.geo_location);
  const safeImageUrl =
    typeof input.image_url === "string" && /^https?:\/\//i.test(input.image_url)
      ? input.image_url
      : null;

  const recommendation = buildContextualRecommendation({
    title,
    grand_total: grandTotal,
    currency,
    items: matrixItems,
    people_count: participants.length,
    publicBaseUrl: cleanBaseUrl,
    geo_location: safeGeo,
    nearbyBenchmarks: input.nearbyBenchmarks,
  });

  // Run GDPR PII anonymization pipeline before logging to crowdsourced food price index
  const sanitizedRecords = anonymizeReceiptForIndex({
    restaurant_name: title,
    geo_location: safeGeo,
    currency,
    items: matrixItems.map((m) => ({
      item_name: m.item_name,
      price: m.price,
    })),
    participant_names: participants,
  });

  if (sanitizedRecords.length > 0) {
    foodPriceTracker.recordReceipt({
      id: billId,
      restaurant_name: sanitizedRecords[0]?.restaurant_name ?? undefined,
      geo_location: safeGeo ? `${safeGeo.lat},${safeGeo.lng}` : undefined,
      currency,
      items: sanitizedRecords.map((rec) => ({
        item_name: rec.item_name_clean,
        price: Number(rec.price_cents) / 100,
        category: rec.category,
      })),
      timestamp: createdAt,
    });
  }

  return {
    bill_id: billId,
    title,
    currency,
    settlement_currency: settlementCurrency,
    exchange_rate: exchangeRate,
    created_at: createdAt,
    owner_sub: input.ownerSub,
    image_url: safeImageUrl,
    geo_location: safeGeo,
    share_url: shareUrl,
    raw_items: matrixItems,
    people: participants,
    assignments: canonicalAssignments,
    subtotal: fromCents(billSubtotalCents),
    tax_amount: fromCents(taxAmountCents),
    tip_percentage: tipPercentage,
    tip_amount: fromCents(tipAmountCents),
    grand_total: grandTotal,
    settlement_grand_total: fromCents(settlementGrandTotalCents),
    unassigned_items: unassignedItems,
    people_shares: peopleShares,
    recommendation,
  };
}
