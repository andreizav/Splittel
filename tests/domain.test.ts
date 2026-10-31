import { describe, expect, it } from "vitest";
import {
  allocateProportionalCents,
  parseAndSplitBill,
} from "../src/domain/billSplitter.js";
import {
  parseReceiptText,
  detectCurrency,
  detectCurrencyDetails,
} from "../src/domain/receiptParser.js";
import { calculateGroupBalance } from "../src/domain/debtOptimizer.js";
import { generatePaymentCards } from "../src/domain/paymentCardGenerator.js";
import { resolveExchangeRate } from "../src/domain/fxConverter.js";
import { foodPriceTracker } from "../src/domain/foodPriceTracker.js";
import {
  buildContextualRecommendation,
  extractAnonymousSnippet,
} from "../src/domain/recommendationEngine.js";

describe("Splittel Domain Engine", () => {
  it("distributes indivisible cents with zero penny drift (Largest Remainder Method)", () => {
    const shares = allocateProportionalCents(1000, [1, 1, 1]);
    expect(shares).toEqual([334, 333, 333]);
    expect(shares.reduce((a, b) => a + b, 0)).toBe(1000);
  });

  it("handles Scenario A (Russian receipt + shared bottle of wine + proportional tax_amount & 10% tip)", async () => {
    const result = await parseAndSplitBill({
      raw_items: [
        { item_name: "Стейк", price: 1800, quantity: 1 },
        { item_name: "Пиво", price: 400, quantity: 1 },
        { item_name: "Паста", price: 900, quantity: 1 },
        { item_name: "Кола", price: 200, quantity: 1 },
        { item_name: "Салат", price: 700, quantity: 1 },
        { item_name: "Бутылка вина", price: 2400, quantity: 1 },
      ],
      people: ["Я", "Саша", "Маша"],
      assignments: {
        Я: ["Стейк", "Пиво", "Бутылка вина"],
        Саша: ["Паста", "Кола", "Бутылка вина"],
        Маша: ["Салат", "Бутылка вина"],
      },
      tip_percentage: 10,
      tax_amount: 320,
    });

    // Subtotal: 1800 + 400 + 900 + 200 + 700 + 2400 = 6400
    expect(result.subtotal).toBe(6400);
    expect(result.tax_amount).toBe(320);
    expect(result.tip_amount).toBe(640);
    expect(result.grand_total).toBe(7360);

    const me = result.people_shares.find((p) => p.person === "Я")!;
    const sasha = result.people_shares.find((p) => p.person === "Саша")!;
    const masha = result.people_shares.find((p) => p.person === "Маша")!;

    // Individual subtotals: Я = 2200 + 800 = 3000; Саша = 1100 + 800 = 1900; Маша = 700 + 800 = 1500
    expect(me.items_subtotal).toBe(3000);
    expect(sasha.items_subtotal).toBe(1900);
    expect(masha.items_subtotal).toBe(1500);
    expect(
      Number((me.total_owed + sasha.total_owed + masha.total_owed).toFixed(2))
    ).toBe(result.grand_total);
  });

  it("supports omitting optional assignments (Scenario B interactive dish tapping)", async () => {
    const result = await parseAndSplitBill({
      raw_items: [{ item_name: "Пицца Маргарита", price: 900 }],
      people: ["Саша", "Маша", "Дима"],
    });

    expect(result.tip_percentage).toBe(10);
    expect(result.tax_amount).toBe(0);
    expect(result.grand_total).toBe(990);
    expect(result.people_shares.map((s) => s.total_owed)).toEqual([
      330, 330, 330,
    ]);
  });

  it("computes provably minimal transfer count in calculateGroupBalance using split_among", () => {
    const balance = calculateGroupBalance([
      {
        description: "Coffee",
        paid_by: "Alice",
        amount: 20,
        split_among: ["Alice", "Bob"],
      },
      {
        description: "Taxi",
        paid_by: "Chloe",
        amount: 50,
        split_among: ["Chloe", "Dan"],
      },
    ]);

    expect(balance.total_group_spend).toBe(70);
    expect(balance.settlement_currency).toBe("RUB");
    expect(balance.settlement_matrix).toHaveLength(2);
    expect(balance.settlement_matrix).toEqual([
      { debtor: "Dan", creditor: "Chloe", amount: 25, currency: "RUB" },
      { debtor: "Bob", creditor: "Alice", amount: 10, currency: "RUB" },
    ]);
  });

  it("converts multi-currency restaurant check (EUR -> RUB) with zero kopek drift and RUB SBP links", async () => {
    const result = await parseAndSplitBill({
      title: "Trattoria Roma",
      currency: "EUR",
      settlement_currency: "RUB",
      exchange_rate: 105,
      tip_percentage: 10,
      tax_amount: 5,
      people: ["Я", "Саша", "Маша"],
      raw_items: [
        { item_name: "Bistecca", price: 30, quantity: 1 },
        { item_name: "Pasta", price: 18, quantity: 1 },
        { item_name: "Insalata", price: 12, quantity: 1 },
        { item_name: "Vino Rosso", price: 30, quantity: 1 },
      ],
      assignments: {
        Я: ["Bistecca", "Vino Rosso"],
        Саша: ["Pasta", "Vino Rosso"],
        Маша: ["Insalata", "Vino Rosso"],
      },
    });

    // Subtotal: 90 EUR + Tax 5 EUR + Tip 9 EUR = 104 EUR
    expect(result.currency).toBe("EUR");
    expect(result.settlement_currency).toBe("RUB");
    expect(result.exchange_rate).toBe(105);
    expect(result.grand_total).toBe(104);
    expect(result.settlement_grand_total).toBe(10920);

    const sumRub = result.people_shares.reduce(
      (acc, s) => acc + s.settlement_total_owed,
      0
    );
    expect(Number(sumRub.toFixed(2))).toBe(10920);
    expect(result.people_shares[0]!.payment.sbp_link).toContain("cur=RUB");
  });

  it("normalizes multi-currency group trip expenses (EUR + USD + RUB -> RUB) into minimal RUB transfers", () => {
    const balance = calculateGroupBalance(
      [
        {
          description: "Airbnb in Milan",
          paid_by: "Я",
          amount: 200,
          currency: "EUR",
          exchange_rate: 105, // 21,000 RUB
          split_among: ["Я", "Саша", "Маша"],
        },
        {
          description: "Airport Transfer",
          paid_by: "Саша",
          amount: 3000,
          currency: "RUB",
          split_among: ["Я", "Саша", "Маша"],
        },
      ],
      { settlement_currency: "RUB" }
    );

    expect(balance.settlement_currency).toBe("RUB");
    expect(balance.total_group_spend).toBe(24000);
    // Each person's fair share is 8,000 RUB. Я paid 21,000 (+13,000), Саша paid 3,000 (-5,000), Маша paid 0 (-8,000).
    expect(balance.settlement_matrix).toEqual([
      { debtor: "Маша", creditor: "Я", amount: 8000, currency: "RUB" },
      { debtor: "Саша", creditor: "Я", amount: 5000, currency: "RUB" },
    ]);
  });

  it("generates SBP & Stripe payment cards, custom payment_link overrides, and QR codes", async () => {
    const cards = await generatePaymentCards({
      settlements: [
        { debtor: "Саша", creditor: "Маша", amount: 1250.5 },
        {
          debtor: "Дима",
          creditor: "Маша",
          amount: 500,
          payment_link: "https://buy.stripe.com/test_custom_link",
        },
      ],
      baseUrl: "https://splittel.app",
      currency: "RUB",
    });

    expect(cards).toHaveLength(2);
    expect(cards[0]!.links.sbp_url).toContain("https://qr.nspk.ru/");
    expect(cards[0]!.links.stripe_payment_url).toContain("checkout.stripe.com");
    expect(cards[0]!.qr_code_data_uri.startsWith("data:image/svg+xml;base64,")).toBe(
      true
    );
    expect(cards[1]!.links.primary_payment_url).toBe(
      "https://buy.stripe.com/test_custom_link"
    );
  });

  it("parses lines, prices, quantities, and tax from receipt text accurately", () => {
    const rawText = `
Ресторан Белла Италия
Чек № 105
1. Пицца Маргарита 750.00
2. 2 x Пиво крафтовое 350
3. Салат Цезарь 680
4. Бутылка вина 1900
НДС 20% 240
ИТОГ: 4670
`;
    const parsed = parseReceiptText(rawText);
    expect(parsed.title).toBe("Ресторан Белла Италия");
    expect(parsed.items).toHaveLength(4);
    expect(parsed.items[0]).toEqual({ item_name: "Пицца Маргарита", price: 750, quantity: 1 });
    expect(parsed.items[1]).toEqual({ item_name: "Пиво крафтовое", price: 350, quantity: 2 });
    expect(parsed.taxAmount).toBe(240);
    expect(parsed.detectedCurrency).toBe("RUB");
  });

  it("resolves currencies via 4-tier cascade (symbols, keywords, contextual dishes)", () => {
    // Tier 1: Symbols & Codes including ILS
    expect(detectCurrency("Total 1250 ₽")).toBe("RUB");
    expect(detectCurrency("Amount: $45.50")).toBe("USD");
    expect(detectCurrency("Summe: 38.00 €")).toBe("EUR");
    expect(detectCurrency("Order total 450 ฿")).toBe("THB");
    expect(detectCurrency("Hesap: 750 ₺")).toBe("TRY");
    expect(detectCurrency("Grand Total: 220 AED")).toBe("AED");
    expect(detectCurrency("Итого: 15400 ₸")).toBe("KZT");

    // Tier 1: ILS (₪, ils, shekel, шекель, ש״ח, nis)
    expect(detectCurrency("סך הכל: 120 ₪")).toBe("ILS");
    expect(detectCurrency("Total: 85 NIS")).toBe("ILS");
    expect(detectCurrency("Сумма: 140 шекелей")).toBe("ILS");
    expect(detectCurrency("לתשלום: 95 ש״ח")).toBe("ILS");

    const ilsDetails = detectCurrencyDetails("Total 180 ₪");
    expect(ilsDetails.currency).toBe("ILS");
    expect(ilsDetails.tier).toBe(1);
    expect(ilsDetails.confidence).toBe(1.0);

    // Tier 2: Contextual Dish/Cuisine Detection without currency symbols
    expect(detectCurrency("1. Tom Yum Soup 250\n2. Pad Thai 180")).toBe("THB");
    expect(detectCurrency("1. Doner Kebab 120\n2. Ayran 30\n3. Baklava 80")).toBe("TRY");
    expect(detectCurrency("1. Croissant 4.50\n2. Baguette 3.00")).toBe("EUR");

    // Tier 2: Israeli dishes (Shakshuka, Hummus, Falafel)
    const israeliDishDetails = detectCurrencyDetails("1. Shakshuka 54\n2. Hummus with Tahini 38\n3. Falafel 24");
    expect(israeliDishDetails.currency).toBe("ILS");
    expect(israeliDishDetails.tier).toBe(2);
    expect(israeliDishDetails.confidence).toBe(0.85);

    expect(detectCurrency("1. Шакшука 55\n2. Хумус 35")).toBe("ILS");
  });

  it("converts ILS <-> RUB via FX reference table", () => {
    const ilsToRub = resolveExchangeRate({
      fromCurrency: "ILS",
      toCurrency: "RUB",
    });
    expect(ilsToRub.rate).toBe(26.5);
    expect(ilsToRub.source).toBe("ReferenceTable");

    const rubToIls = resolveExchangeRate({
      fromCurrency: "RUB",
      toCurrency: "ILS",
    });
    expect(rubToIls.rate).toBeCloseTo(1 / 26.5, 4);
  });

  it("tracks crowdsourced food prices from empty state, aggregates index, and compares item benchmarks", () => {
    foodPriceTracker.reset();

    // 1. Verify clean zero-seed empty state
    const emptyIndex = foodPriceTracker.getFoodPriceIndex("ILS");
    expect(emptyIndex.currency).toBe("ILS");
    expect(emptyIndex.total_receipts_tracked).toBe(0);
    expect(emptyIndex.total_items_indexed).toBe(0);

    const emptyComp = foodPriceTracker.compareItemPrice("Classic Shakshuka", 50, "ILS");
    expect(emptyComp.benchmark_sample_count).toBe(0);
    expect(emptyComp.average_benchmark).toBe(0);

    // 2. Record live crowdsourced receipts
    foodPriceTracker.recordReceipt({
      id: "test_rcpt_1",
      restaurant_name: "Jaffa Market Kitchen",
      currency: "ILS",
      timestamp: new Date().toISOString(),
      items: [
        { item_name: "Classic Shakshuka", price: 44, category: "mains" },
        { item_name: "Hummus with Tahini", price: 32, category: "mains" },
        { item_name: "Fresh Orange Juice", price: 16, category: "drinks" },
      ],
    });
    foodPriceTracker.recordReceipt({
      id: "test_rcpt_2",
      restaurant_name: "Carmel Grill",
      currency: "ILS",
      timestamp: new Date().toISOString(),
      items: [
        { item_name: "Classic Shakshuka", price: 60, category: "mains" },
        { item_name: "Goldstar Beer", price: 24, category: "drinks" },
      ],
    });

    const index = foodPriceTracker.getFoodPriceIndex("ILS");
    expect(index.total_receipts_tracked).toBe(2);
    expect(index.total_items_indexed).toBe(5);
    expect(index.category_averages["mains"]?.average_price).toBeGreaterThan(0);

    // 3. Compare item price against live benchmark (avg = (44 + 60) / 2 = 52)
    const compCheaper = foodPriceTracker.compareItemPrice("Classic Shakshuka", 40, "ILS");
    expect(compCheaper.is_cheaper).toBe(true);
    expect(compCheaper.savings_percent).toBeGreaterThan(0);
    expect(compCheaper.average_benchmark).toBe(52);

    const compExpensive = foodPriceTracker.compareItemPrice("Classic Shakshuka", 80, "ILS");
    expect(compExpensive.is_cheaper).toBe(false);
  });

  it("returns null CPA recommendation when no live benchmarks exist, and generates live recommendation from crowdsourced data", async () => {
    foodPriceTracker.reset();

    // 1. With empty index and no nearby PostGIS benchmarks -> explicit undefined/null state
    const firstBill = await parseAndSplitBill({
      title: "Jaffa Affordable Bistro",
      raw_items: [
        { item_name: "Classic Shakshuka", price: 42, quantity: 1 },
        { item_name: "Hummus with Tahini", price: 30, quantity: 1 },
        { item_name: "Mint Lemonade", price: 16, quantity: 2 },
      ],
      people: ["Dan", "Noa"],
      currency: "ILS",
    });
    expect(firstBill.recommendation).toBeUndefined();

    // 2. Second bill at a pricier venue compares against live recorded benchmark from Jaffa Affordable Bistro
    const secondBill = await parseAndSplitBill({
      title: "Florentin Upscale Lounge",
      raw_items: [
        { item_name: "Classic Shakshuka", price: 68, quantity: 1 },
        { item_name: "Hummus with Tahini", price: 52, quantity: 1 },
        { item_name: "Mint Lemonade", price: 28, quantity: 2 },
      ],
      people: ["Dan", "Noa"],
      currency: "ILS",
    });

    expect(secondBill.currency).toBe("ILS");
    expect(secondBill.recommendation).toBeDefined();
    expect(secondBill.recommendation?.promo_code).toBe("SPLITTEL");
    expect(secondBill.recommendation?.partner_name).toBe("Jaffa Affordable Bistro");
    expect(secondBill.recommendation?.message).toContain("SPLITTEL");
    expect(secondBill.recommendation?.message).toContain("₪");
  });

  it("generates live PostGIS nearby CPA contextual recommendations and anonymous data snippets", async () => {
    foodPriceTracker.reset();

    const result = await parseAndSplitBill({
      title: "Steak House Downtown",
      raw_items: [
        { item_name: "Стейк Рибай", price: 2800, quantity: 1 },
        { item_name: "Бутылка вина", price: 2400, quantity: 1 },
      ],
      people: ["Андрей", "Саша"],
      currency: "RUB",
      nearbyBenchmarks: [
        {
          restaurant_name: "Smoke Grill Partners",
          category: "mains",
          sample_count: 8,
          avg_price_cents: 210000,
          min_price_cents: 195000,
          distance_meters: 250,
        },
      ],
    });

    expect(result.recommendation).toBeDefined();
    expect(result.recommendation?.promo_code).toBe("SPLITTEL");
    expect(result.recommendation?.partner_name).toBe("Smoke Grill Partners");
    expect(result.recommendation?.message).toContain("SPLITTEL");

    const snippet = extractAnonymousSnippet({
      bill_id: result.bill_id,
      title: result.title,
      currency: result.currency,
      grand_total: result.grand_total,
      items: result.raw_items,
    });
    expect(snippet.snippet_id.startsWith("snip_")).toBe(true);
    expect(snippet.items[0]?.category).toBe("meat");
    expect(snippet.total_amount).toBe(result.grand_total);
  });
});
