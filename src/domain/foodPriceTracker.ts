/**
 * Crowdsourced Food Price Index & Analytics Engine for @Splittel.
 *
 * Stores anonymized parsed receipt items across currencies (ILS, RUB, USD, EUR, etc.)
 * to build real-time local price benchmarks, category averages, and CPA comparison cards.
 */

export interface ReceiptPriceItem {
  item_name: string;
  price: number; // raw price in receipt currency
  category?: "mains" | "drinks" | "dessert" | "sides" | "other" | string;
}

export interface ReceiptPriceRecord {
  id: string;
  restaurant_name?: string;
  geo_location?: string;
  currency: string; // e.g. 'ILS', 'RUB', 'USD'
  items: ReceiptPriceItem[];
  timestamp: string;
}

export interface ItemPriceComparison {
  item_name: string;
  current_price: number;
  currency: string;
  category: string;
  average_benchmark: number;
  min_benchmark: number;
  max_benchmark: number;
  diff_percent: number;
  is_cheaper: boolean;
  savings_percent: number;
  benchmark_sample_count: number;
}

export interface FoodPriceIndexSummary {
  currency: string;
  total_receipts_tracked: number;
  total_items_indexed: number;
  average_receipt_total: number;
  category_averages: Record<
    string,
    { average_price: number; item_count: number }
  >;
  popular_dishes: Array<{
    dish_name: string;
    category: string;
    count: number;
    avg_price: number;
    min_price: number;
    max_price: number;
  }>;
  last_updated: string;
}

export function classifyItemCategory(
  name: string
): "mains" | "drinks" | "dessert" | "sides" | "other" {
  const lower = name.toLowerCase();

  // Drinks
  if (
    /пиво|вино|кофе|чай|лимонад|коктейль|кола|сок|вода|beer|wine|coffee|cider|aperol|juice|soda|water|goldstar|maccabee/i.test(
      lower
    )
  ) {
    return "drinks";
  }

  // Dessert
  if (
    /чизкейк|десерт|торт|мороженое|тирамису|малаби|пахлава|dessert|cake|ice\s*cream|tiramisu|malabi|baklava|knafeh/i.test(
      lower
    )
  ) {
    return "dessert";
  }

  // Sides & Salads
  if (
    /салат|цезарь|греческ|тхин|картофел|фри|пита|хлеб|salad|caesar|fries|bread|pita|tahini|edamame/i.test(
      lower
    )
  ) {
    return "sides";
  }

  // Mains
  if (
    /стейк|рибай|мясо|шашлык|бургер|говядин|телятин|куриц|рыба|паст|пицц|карбонар|том\s*ям|пад\s*тай|суши|ролл|вок|рамен|хумус|шакшук|фалафел|шаварм|шаурм|сабих|steak|beef|burger|pizza|pasta|sushi|ramen|shakshuka|hummus|falafel|shawarma|sabich|chicken|fish/i.test(
      lower
    )
  ) {
    return "mains";
  }

  return "other";
}

export class FoodPriceTracker {
  private records: ReceiptPriceRecord[] = [];
  private readonly maxRecords = 5000;

  constructor() {}

  /**
   * Clears in-memory tracked receipt records (used for isolated test suites).
   */
  public reset(): void {
    this.records = [];
  }

  /**
   * Records an anonymized receipt for price indexing.
   */
  public recordReceipt(record: ReceiptPriceRecord): void {
    if (!record || !record.id || !record.items || !Array.isArray(record.items)) {
      return;
    }

    const cleanRecord: ReceiptPriceRecord = {
      id: record.id,
      restaurant_name: record.restaurant_name || "Anonymous Restaurant",
      geo_location: record.geo_location || "Unknown",
      currency: (record.currency || "RUB").toUpperCase(),
      items: record.items
        .filter((i) => i && typeof i.price === "number" && i.price > 0)
        .map((i) => ({
          item_name: (i.item_name || "Item").trim(),
          price: Number(i.price.toFixed(2)),
          category: i.category || classifyItemCategory(i.item_name || ""),
        })),
      timestamp: record.timestamp || new Date().toISOString(),
    };

    this.records.unshift(cleanRecord);

    if (this.records.length > this.maxRecords) {
      this.records = this.records.slice(0, this.maxRecords);
    }
  }

  /**
   * Retrieves logged receipt records, optionally filtered by currency.
   */
  public getRecords(options?: {
    currency?: string;
    limit?: number;
  }): ReceiptPriceRecord[] {
    let list = this.records;
    if (options?.currency) {
      const cur = options.currency.toUpperCase();
      list = list.filter((r) => r.currency === cur);
    }
    if (options?.limit && options.limit > 0) {
      list = list.slice(0, options.limit);
    }
    return list;
  }

  /**
   * Aggregates and returns the Food Price Index summary for a target currency.
   */
  public getFoodPriceIndex(currency = "ILS"): FoodPriceIndexSummary {
    const targetCur = currency.toUpperCase();
    const currencyRecords = this.records.filter((r) => r.currency === targetCur);

    let totalItems = 0;
    let totalChecksSum = 0;

    const categoryStats: Record<string, { sum: number; count: number }> = {};
    const dishStats: Map<
      string,
      { category: string; prices: number[]; count: number }
    > = new Map();

    for (const rec of currencyRecords) {
      let receiptTotal = 0;
      for (const item of rec.items) {
        receiptTotal += item.price;
        totalItems++;

        const cat = item.category || classifyItemCategory(item.item_name);
        if (!categoryStats[cat]) {
          categoryStats[cat] = { sum: 0, count: 0 };
        }
        categoryStats[cat].sum += item.price;
        categoryStats[cat].count++;

        const key = item.item_name.toLowerCase().trim();
        const existing = dishStats.get(key);
        if (existing) {
          existing.prices.push(item.price);
          existing.count++;
        } else {
          dishStats.set(key, {
            category: cat,
            prices: [item.price],
            count: 1,
          });
        }
      }
      totalChecksSum += receiptTotal;
    }

    const totalReceipts = currencyRecords.length;
    const avgCheck =
      totalReceipts > 0 ? Math.round((totalChecksSum / totalReceipts) * 10) / 10 : 0;

    const categoryAverages: Record<
      string,
      { average_price: number; item_count: number }
    > = {};
    for (const [cat, data] of Object.entries(categoryStats)) {
      categoryAverages[cat] = {
        average_price:
          data.count > 0 ? Math.round((data.sum / data.count) * 10) / 10 : 0,
        item_count: data.count,
      };
    }

    const popularDishes: FoodPriceIndexSummary["popular_dishes"] = [];
    for (const [name, data] of dishStats.entries()) {
      const min = Math.min(...data.prices);
      const max = Math.max(...data.prices);
      const avg =
        data.prices.reduce((a, b) => a + b, 0) / (data.prices.length || 1);

      // Title case format
      const formattedName = name.charAt(0).toUpperCase() + name.slice(1);

      popularDishes.push({
        dish_name: formattedName,
        category: data.category,
        count: data.count,
        avg_price: Math.round(avg * 10) / 10,
        min_price: min,
        max_price: max,
      });
    }

    // Sort popular dishes by frequency descending
    popularDishes.sort((a, b) => b.count - a.count);

    return {
      currency: targetCur,
      total_receipts_tracked: totalReceipts,
      total_items_indexed: totalItems,
      average_receipt_total: avgCheck,
      category_averages: categoryAverages,
      popular_dishes: popularDishes.slice(0, 15),
      last_updated: new Date().toISOString(),
    };
  }

  /**
   * Compares a specific item's price against historical crowdsourced averages.
   */
  public compareItemPrice(
    itemName: string,
    price: number,
    currency = "ILS"
  ): ItemPriceComparison {
    const cur = currency.toUpperCase();
    const cat = classifyItemCategory(itemName);
    const lowerName = itemName.toLowerCase().trim();

    const matchingPrices: number[] = [];

    for (const rec of this.records) {
      if (rec.currency !== cur) continue;
      for (const item of rec.items) {
        const itemLower = item.item_name.toLowerCase();
        if (
          itemLower === lowerName ||
          (itemLower.includes(lowerName) && lowerName.length >= 4) ||
          (lowerName.includes(itemLower) && itemLower.length >= 4)
        ) {
          matchingPrices.push(item.price);
        }
      }
    }

    // If no direct dish match, compare against category average
    if (matchingPrices.length === 0) {
      for (const rec of this.records) {
        if (rec.currency !== cur) continue;
        for (const item of rec.items) {
          if (
            (item.category || classifyItemCategory(item.item_name)) === cat
          ) {
            matchingPrices.push(item.price);
          }
        }
      }
    }

    // Explicit empty benchmark state when no crowdsourced samples exist yet
    if (matchingPrices.length === 0) {
      return {
        item_name: itemName,
        current_price: price,
        currency: cur,
        category: cat,
        average_benchmark: 0,
        min_benchmark: 0,
        max_benchmark: 0,
        diff_percent: 0,
        is_cheaper: false,
        savings_percent: 0,
        benchmark_sample_count: 0,
      };
    }

    const min = Math.min(...matchingPrices);
    const max = Math.max(...matchingPrices);
    const sum = matchingPrices.reduce((a, b) => a + b, 0);
    const avg = Math.round((sum / matchingPrices.length) * 10) / 10;

    const diffPercent =
      avg > 0 ? Math.round(((price - avg) / avg) * 1000) / 10 : 0;
    const isCheaper = price < avg;
    const savingsPercent = isCheaper ? Math.abs(diffPercent) : 0;

    return {
      item_name: itemName,
      current_price: price,
      currency: cur,
      category: cat,
      average_benchmark: avg,
      min_benchmark: min,
      max_benchmark: max,
      diff_percent: diffPercent,
      is_cheaper: isCheaper,
      savings_percent: savingsPercent,
      benchmark_sample_count: matchingPrices.length,
    };
  }
}

export const foodPriceTracker = new FoodPriceTracker();

