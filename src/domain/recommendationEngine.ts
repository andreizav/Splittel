import { cleanDishName, sanitizeRestaurantName } from "./anonymizer.js";
import {
  generateCpaRecommendation,
  type NearbyRestaurantBenchmark,
} from "./cpaEngine.js";
import type {
  BillMatrixItem,
  ContextualRecommendation,
  ReceiptSnippetRecord,
} from "./types.js";

export function classifyItem(
  name: string
): "meat" | "drinks" | "pizza" | "pasta" | "asian" | "salad" | "dessert" | "other" {
  const lower = name.toLowerCase();
  if (/стейк|рибай|мясо|шашлык|бургер|говядин|телятин|steak|ribeye|beef|meat|bbq|bacon/i.test(lower)) {
    return "meat";
  }
  if (/пицц|pizza|маргарит|пепперони|calzone/i.test(lower)) {
    return "pizza";
  }
  if (/паст|карбонар|лазань|болоньез|спагетти|ризотт|fettuccine|ravioli/i.test(lower)) {
    return "pasta";
  }
  if (/том\s*ям|пад\s*тай|суши|ролл|вок|рамен|фо\s*бо|удон|asian|thai|sushi|ramen|dumpling/i.test(lower)) {
    return "asian";
  }
  if (/пиво|вино|кофе|чай|лимонад|коктейль|кола|сок|beer|wine|coffee|cider|aperol/i.test(lower)) {
    return "drinks";
  }
  if (/салат|цезарь|греческ|salad/i.test(lower)) {
    return "salad";
  }
  if (/чизкейк|десерт|торт|мороженое|тирамису|dessert|cake|malabi|малаби/i.test(lower)) {
    return "dessert";
  }
  return "other";
}

/**
 * Builds a native CPA-monetized contextual comparison and sponsored recommendation snippet
 * via `cpaEngine.ts` (with optional PostGIS 1000m nearby benchmarks).
 */
export function buildContextualRecommendation(params: {
  title?: string;
  grand_total: number;
  currency: string;
  items: BillMatrixItem[];
  people_count: number;
  publicBaseUrl?: string;
  geo_location?: { lat: number; lng: number } | null;
  nearbyBenchmarks?: NearbyRestaurantBenchmark[];
}): ContextualRecommendation | undefined {
  return generateCpaRecommendation(params) ?? undefined;
}

/**
 * Extracts a GDPR-anonymized snippet for the Data Moat database (PII stripped via `anonymizer.ts`).
 */
export function extractAnonymousSnippet(params: {
  bill_id: string;
  title: string;
  currency: string;
  grand_total: number;
  items: BillMatrixItem[];
  people?: string[];
}): ReceiptSnippetRecord {
  const safeTitle =
    sanitizeRestaurantName(params.title, params.people) || "Anonymous Venue";

  return {
    snippet_id: `snip_${params.bill_id.replace(/^bill_/, "")}`,
    restaurant_name: safeTitle,
    currency: params.currency,
    total_amount: params.grand_total,
    items: params.items.map((i) => {
      const cleaned = cleanDishName(i.item_name, params.people);
      return {
        name: cleaned,
        price: i.price,
        category: classifyItem(cleaned),
      };
    }),
    timestamp: new Date().toISOString(),
  };
}
