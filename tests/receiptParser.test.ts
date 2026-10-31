import vm from "node:vm";
import sharp from "sharp";
import { afterAll, describe, expect, it } from "vitest";
import {
  GEMINI_RECEIPT_VISION_PROMPT,
  detectCurrency,
  detectCurrencyDetails,
  parseReceiptText,
  recognizeReceiptImage,
  recognizeReceiptWithGeminiVision,
  shouldTriggerGeminiVisionFallback,
  shutdownOcrWorkers,
} from "../src/domain/receiptParser.js";
import {
  anonymizeReceiptForIndex,
  classifyReceiptItemCategory,
} from "../src/domain/anonymizer.js";
import { renderBillBoardHtml } from "../src/ui/billBoardTemplate.js";

afterAll(async () => {
  await shutdownOcrWorkers();
});

describe("Multi-Tier Currency Cascade & Receipt Parser (receiptParser.ts)", () => {
  it("resolves Tier 1 explicit symbols & currency markers including ILS / ₪", () => {
    // ILS variants: ₪, ils, shekel, шекель, ש״ח, nis
    expect(detectCurrency("Total: 145 ₪")).toBe("ILS");
    expect(detectCurrency("Amount due: 92 ILS")).toBe("ILS");
    expect(detectCurrency("Total 68 shekels")).toBe("ILS");
    expect(detectCurrency("К оплате: 120 шекель")).toBe("ILS");
    expect(detectCurrency("Сумма: 210 шекелей")).toBe("ILS");
    expect(detectCurrency("סה״כ לתשלום: 115 ש״ח")).toBe("ILS");
    expect(detectCurrency("Subtotal: 75 NIS")).toBe("ILS");

    // Global currencies
    expect(detectCurrency("Итого: 3 450 ₽")).toBe("RUB");
    expect(detectCurrency("Сумма 1200 руб.")).toBe("RUB");
    expect(detectCurrency("Total $48.90")).toBe("USD");
    expect(detectCurrency("Amount 60 USD")).toBe("USD");
    expect(detectCurrency("Summe 42,00 €")).toBe("EUR");
    expect(detectCurrency("Total 55 EUR")).toBe("EUR");
    expect(detectCurrency("Total 380 ฿")).toBe("THB");
    expect(detectCurrency("Order 420 baht")).toBe("THB");
    expect(detectCurrency("Toplam 650 ₺")).toBe("TRY");
    expect(detectCurrency("Hesap 500 TL")).toBe("TRY");
    expect(detectCurrency("Total 195 AED")).toBe("AED");
    expect(detectCurrency("К оплате 240 дирхам")).toBe("AED");
    expect(detectCurrency("Барлығы 12500 ₸")).toBe("KZT");
    expect(detectCurrency("Итого 8900 тенге")).toBe("KZT");
  });

  it("prevents false positives on substrings inside ordinary dish words (word-boundary safety)", () => {
    // 'lentils' contains 'ils', 'bottle' contains 'tl', 'pastry' contains 'try', 'батон' contains 'бат'
    const fallback = detectCurrencyDetails(
      "1. Lentils Soup 14\n2. Water Bottle 5\n3. Puff Pastry 9\n4. Батон нарезной 60",
      "USD"
    );
    expect(fallback.currency).toBe("USD");
    expect(fallback.tier).toBe(4);
  });

  it("infers Tier 2 currency from Hebrew script and localized dishes when currency symbol is absent", () => {
    const hebScript = detectCurrencyDetails("שקשוקה חריפה 58\nחומוס גרגירים 38");
    expect(hebScript.currency).toBe("ILS");
    expect(hebScript.tier).toBe(2);
    expect(hebScript.confidence).toBe(0.95);

    const ils = detectCurrencyDetails("1. Shakshuka 52\n2. Falafel Plate 36");
    expect(ils.currency).toBe("ILS");
    expect(ils.tier).toBe(2);
    expect(ils.confidence).toBe(0.85);

    const thb = detectCurrencyDetails("1. Tom Yum Kung 220\n2. Pad Thai 160");
    expect(thb.currency).toBe("THB");
    expect(thb.tier).toBe(2);

    const tryCur = detectCurrencyDetails("1. Iskender Kebab 420\n2. Kunefe 180");
    expect(tryCur.currency).toBe("TRY");
    expect(tryCur.tier).toBe(2);
  });

  it("parses Israeli receipt lines with ₪ / ש״ח suffixes accurately", () => {
    const raw = [
      "Florentin Bistro",
      "1. Classic Shakshuka 54 ₪",
      "2. 2 x Mint Lemonade 18 ש״ח",
      "VAT 17%: 15.30",
      "Tip 12%",
      "Total: 90 ₪",
    ].join("\n");

    const parsed = parseReceiptText(raw);
    expect(parsed.title).toBe("Florentin Bistro");
    expect(parsed.detectedCurrency).toBe("ILS");
    expect(parsed.items).toEqual([
      { item_name: "Classic Shakshuka", price: 54, quantity: 1 },
      { item_name: "Mint Lemonade", price: 18, quantity: 2 },
    ]);
    expect(parsed.taxAmount).toBe(15.3);
    expect(parsed.tipPercentage).toBe(12);
  });

  it("parses real RTL Hebrew POS receipts (Tabit/Beecomm visual order, inclusive מע״מ, and fiscal exclusions)", () => {
    const rtlHebrewReceipt = [
      "חשבונית מס קבלה",
      'קפה רוטשילד בע"מ',
      "ע.מ 514223344",
      "תאריך: 31/10/2026 19:15",
      "שולחן 14   סועדים 3   מלצר: נועה",
      "--------------------------------",
      "מחיר        פריט            כמות",
      "58.00   שקשוקה חריפה          1",
      "38.00   חומוס גרגירים         1",
      "64.00   בירה גולדסטאר         2",
      "15.00-  הנחת מועדון",
      "--------------------------------",
      'סה"כ לפני מע"מ          135.59',
      'מע"מ 18%                  24.41',
      '240.00 סה"כ ביניים',
      'סה"כ לתשלום             160.00 ₪',
      "אשראי ויזה *4512        160.00",
      "תודה ולהתראות!",
    ].join("\n");

    const parsed = parseReceiptText(rtlHebrewReceipt);
    expect(parsed.title).toBe('קפה רוטשילד בע"מ');
    expect(parsed.detectedCurrency).toBe("ILS");
    expect(parsed.taxAmount).toBe(0); // Israeli VAT already included in dish prices!
    expect(parsed.items).toEqual([
      { item_name: "שקשוקה חריפה", price: 58, quantity: 1 },
      { item_name: "חומוס גרגירים", price: 38, quantity: 1 },
      { item_name: "בירה גולדסטאר", price: 32, quantity: 2 },
    ]);

    // Verify Hebrew PII anonymization & dish categorization
    expect(classifyReceiptItemCategory("שקשוקה חריפה")).toBe("mains");
    expect(classifyReceiptItemCategory("בירה גולדסטאר")).toBe("drinks");
    expect(classifyReceiptItemCategory("מלבי שמנת")).toBe("desserts");
    expect(classifyReceiptItemCategory("סלט קצוץ")).toBe("starters");

    const sanitized = anonymizeReceiptForIndex({
      restaurant_name: "חשבונית מס קבלה",
      currency: "ILS",
      items: parsed.items,
      participant_names: ["נועה", "דניאל"],
    });
    expect(sanitized[0]?.restaurant_name).toBeNull();
    expect(sanitized).toHaveLength(3);
  });

  it("parses 4-column Israeli POS lines (total, unit price, Hebrew item, qty) in both RTL and LTR orders", () => {
    const multiCol = [
      "ארומה תל אביב",
      "36.00 18.00 הפוך גדול 2",
      "2 קרואסון שקדים 19.00 38.00",
      "₪42.00 סלט יווני",
      'סה"כ כולל מע"מ 116.00 ₪',
    ].join("\n");

    const parsed = parseReceiptText(multiCol);
    expect(parsed.title).toBe("ארומה תל אביב");
    expect(parsed.detectedCurrency).toBe("ILS");
    expect(parsed.taxAmount).toBe(0);
    expect(parsed.items).toEqual([
      { item_name: "הפוך גדול", price: 18, quantity: 2 },
      { item_name: "קרואסון שקדים", price: 19, quantity: 2 },
      { item_name: "סלט יווני", price: 42, quantity: 1 },
    ]);
  });

  it("recognizes a real rendered Hebrew thermal receipt image via Tesseract LSTM (heb+eng auto-selection)", async () => {
    const svg = `<svg width="760" height="520" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f4f1ea"/>
      <g font-family="Arial Hebrew, Arial, Helvetica, sans-serif" fill="#1c1c1c" font-size="32" font-weight="bold">
        <text x="380" y="70" text-anchor="middle">קפה רוטשילד</text>
        <text x="680" y="155" text-anchor="end">שקשוקה קלאסית</text>
        <text x="80" y="155" text-anchor="start">58.00</text>
        <text x="680" y="225" text-anchor="end">חומוס טחינה</text>
        <text x="80" y="225" text-anchor="start">38.00</text>
        <text x="680" y="295" text-anchor="end">הפוך גדול</text>
        <text x="80" y="295" text-anchor="start">18.00</text>
        <line x1="70" y1="345" x2="690" y2="345" stroke="#555" stroke-width="2"/>
        <text x="680" y="405" text-anchor="end">סה"כ לתשלום</text>
        <text x="80" y="405" text-anchor="start">114.00 ₪</text>
      </g>
    </svg>`;

    const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();

    // Intentionally omit `languages` and `currencyHint` to prove automatic heb+eng vs rus+eng selection!
    const ocrResult = await recognizeReceiptImage(pngBuffer);

    expect(ocrResult.ocrFailed).toBeUndefined();
    expect(ocrResult.ocrLanguage).toBe("heb+eng");
    expect(ocrResult.detectedCurrency).toBe("ILS");
    expect(ocrResult.taxAmount).toBe(0);
    expect(ocrResult.items.length).toBe(3);

    const prices = ocrResult.items.map((i) => i.price).sort((a, b) => a - b);
    expect(prices).toEqual([18, 38, 58]);
    expect(
      ocrResult.items.every((i) => /[\u0590-\u05FF]/u.test(i.item_name))
    ).toBe(true);
  }, 30_000);

  it("recognizes a 3-column EXIF-rotated (Orientation=6) smartphone JPEG of an Israeli receipt accurately", async () => {
    const svg = `<svg width="820" height="620" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ebe5d8"/>
      <g font-family="Arial Hebrew, Arial, Helvetica, sans-serif" fill="#3a3a3a" font-size="28" font-weight="bold">
        <text x="410" y="60" text-anchor="middle">חשבונית מס קבלה</text>
        <text x="410" y="105" text-anchor="middle">בנדיקט תל אביב</text>
        <text x="740" y="165" text-anchor="end">שולחן 12  סועדים 3</text>
        <line x1="60" y1="190" x2="760" y2="190" stroke="#666" stroke-width="2"/>
        <text x="740" y="245" text-anchor="end">1</text>
        <text x="680" y="245" text-anchor="end">שקשוקה חריפה</text>
        <text x="70" y="245" text-anchor="start">62.00</text>
        <text x="740" y="305" text-anchor="end">2</text>
        <text x="680" y="305" text-anchor="end">בירה גולדסטאר</text>
        <text x="70" y="305" text-anchor="start">68.00</text>
        <text x="740" y="365" text-anchor="end">1</text>
        <text x="680" y="365" text-anchor="end">פנקייק קלאסי</text>
        <text x="70" y="365" text-anchor="start">54.00</text>
        <line x1="60" y1="405" x2="760" y2="405" stroke="#666" stroke-width="2"/>
        <text x="740" y="455" text-anchor="end">מע"מ 18%</text>
        <text x="70" y="455" text-anchor="start">28.07</text>
        <text x="740" y="515" text-anchor="end">סה"כ לתשלום</text>
        <text x="70" y="515" text-anchor="start">184.00 ₪</text>
      </g>
    </svg>`;

    // Simulate mobile rear camera portrait capture: pixels rotated 270° with EXIF Orientation=6
    const cameraJpeg = await sharp(Buffer.from(svg))
      .rotate(270)
      .withMetadata({ orientation: 6 })
      .jpeg({ quality: 82 })
      .toBuffer();

    const ocrResult = await recognizeReceiptImage(cameraJpeg);

    expect(ocrResult.ocrFailed).toBeUndefined();
    expect(ocrResult.ocrLanguage).toBe("heb+eng");
    expect(ocrResult.detectedCurrency).toBe("ILS");
    expect(ocrResult.title).toBe("בנדיקט תל אביב");
    expect(ocrResult.taxAmount).toBe(0);
    expect(ocrResult.items).toEqual([
      { item_name: "שקשוקה חריפה", price: 62, quantity: 1 },
      { item_name: "בירה גולדסטאר", price: 34, quantity: 2 },
      { item_name: "פנקייק קלאסי", price: 54, quantity: 1 },
    ]);
  }, 30_000);

  it("returns explicit empty state with no mock title or items when OCR text is empty or unparseable", () => {
    const empty = parseReceiptText("   ");
    expect(empty.items).toEqual([]);
    expect(empty.title).toBeUndefined();
    expect(empty.taxAmount).toBe(0);

    const noPrices = parseReceiptText("1234567890\n---\n***");
    expect(noPrices.items).toEqual([]);
    expect(noPrices.title).toBeUndefined();
  });

  it("triggers Gemini 2.0 Flash Vision fallback when confidence < 70% or Hebrew price extraction fails", async () => {
    expect(
      shouldTriggerGeminiVisionFallback({
        ocrConfidence: 64,
        rawText: "שקשוקה 58",
        itemsCount: 1,
      })
    ).toBe(true);

    expect(
      shouldTriggerGeminiVisionFallback({
        ocrConfidence: 88,
        rawText: "מסעדת הצפון\nשקשוקה חריפה\nחומוס ביתי",
        itemsCount: 0,
      })
    ).toBe(true);

    expect(
      shouldTriggerGeminiVisionFallback({
        ocrConfidence: 85,
        clientOcrConfidence: 52,
        rawText: "שקשוקה 58",
        itemsCount: 1,
      })
    ).toBe(true);

    expect(
      shouldTriggerGeminiVisionFallback({
        ocrConfidence: 89,
        rawText: "שקשוקה 58",
        itemsCount: 1,
      })
    ).toBe(false);

    // Verify Cloudflare R2 HTTPS imageUrl -> Gemini 2.0 Flash Multimodal Vision extraction
    const calledUrls: string[] = [];
    let capturedPrompt = "";
    const fakeJpeg = Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10]);

    const mockFetch: typeof fetch = (async (input, init) => {
      const url = typeof input === "string" ? input : input.toString();
      calledUrls.push(url);

      if (url.startsWith("https://cdn.splittel.app/receipts/")) {
        return new Response(fakeJpeg, {
          status: 200,
          headers: { "Content-Type": "image/jpeg" },
        });
      }

      if (url.includes(":generateContent")) {
        const parsedReq = JSON.parse(String(init?.body ?? "{}"));
        capturedPrompt = parsedReq.contents?.[0]?.parts?.[0]?.text ?? "";
        return new Response(
          JSON.stringify({
            candidates: [
              {
                content: {
                  parts: [
                    {
                      text: JSON.stringify({
                        title: "קפה רוטשילד",
                        currency: "₪",
                        tax: 15.98,
                        total: 110,
                        items: [
                          { name: "שקשוקה ירוקה", price: 62, quantity: 1 },
                          { name: "לימונענע גרוס", price: 24, quantity: 2 },
                        ],
                      }),
                    },
                  ],
                },
              },
            ],
          }),
          { status: 200, headers: { "Content-Type": "application/json" } }
        );
      }

      return new Response("Not Found", { status: 404 });
    }) as typeof fetch;

    const visionParsed = await recognizeReceiptWithGeminiVision({
      imageUrl: "https://cdn.splittel.app/receipts/2026/10/31/hebrew-blurry.jpg",
      currencyHint: "RUB",
      apiKey: "test-gemini-vision-key",
      fetchImpl: mockFetch,
    });

    expect(calledUrls).toHaveLength(2);
    expect(calledUrls[0]).toBe(
      "https://cdn.splittel.app/receipts/2026/10/31/hebrew-blurry.jpg"
    );
    expect(calledUrls[1]).toContain(":generateContent");
    expect(capturedPrompt).toBe(GEMINI_RECEIPT_VISION_PROMPT);
    expect(visionParsed).not.toBeNull();
    expect(visionParsed?.ocrEngine).toMatch(/gemini/);
    expect(visionParsed?.detectedCurrency).toBe("ILS");
    expect(visionParsed?.title).toBe("קפה רוטשילד");
    // 62 + 24*2 = 110 === total -> Israeli VAT already included, so taxAmount === 0
    expect(visionParsed?.taxAmount).toBe(0);
    expect(visionParsed?.items).toEqual([
      { item_name: "שקשוקה ירוקה", price: 62, quantity: 1 },
      { item_name: "לימונענע גרוס", price: 24, quantity: 2 },
    ]);

    // Verify Russian receipt via Gemini 2.0 Flash Vision returns pure Russian items and RUB currency
    const mockRussianFetch: typeof fetch = (async () => {
      return new Response(
        JSON.stringify({
          candidates: [
            {
              content: {
                parts: [
                  {
                    text: JSON.stringify({
                      title: "Ресторан Север",
                      currency: "RUB",
                      tax: 150,
                      total: 2850,
                      items: [
                        { name: "Стейк Рибай", price: 2400, quantity: 1 },
                        { name: "Морс клюквенный", price: 225, quantity: 2 },
                      ],
                    }),
                  },
                ],
              },
            },
          ],
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }) as typeof fetch;

    const russianParsed = await recognizeReceiptImage(fakeJpeg, {
      currencyHint: "ILS", // Even with ILS currency hint, Gemini Vision detects true Russian currency & dishes!
      geminiApiKey: "test-gemini-key",
      fetchImpl: mockRussianFetch,
    });

    expect(russianParsed.detectedCurrency).toBe("RUB");
    expect(russianParsed.title).toBe("Ресторан Север");
    expect(russianParsed.ocrEngine).toMatch(/gemini/);
    expect(russianParsed.items).toEqual([
      { item_name: "Стейк Рибай", price: 2400, quantity: 1 },
      { item_name: "Морс клюквенный", price: 225, quantity: 2 },
    ]);
    // Absolutely no Hebrew characters in Russian receipt items!
    expect(
      russianParsed.items.some((i) => /[\u0590-\u05FF]/.test(i.item_name))
    ).toBe(false);
  });

  it("returns graceful manual-entry fallback without throwing when both Tesseract and Gemini Vision fail on a blank/blurry image", async () => {
    const blankPng = await sharp({
      create: {
        width: 160,
        height: 160,
        channels: 3,
        background: { r: 245, g: 245, b: 245 },
      },
    })
      .png()
      .toBuffer();

    const failingFetch: typeof fetch = (async () =>
      new Response(JSON.stringify({ error: { message: "Vision unavailable" } }), {
        status: 503,
      })) as typeof fetch;

    const fallback = await recognizeReceiptImage(blankPng, {
      currencyHint: "ILS",
      geminiApiKey: "test-key",
      fetchImpl: failingFetch,
    });

    expect(fallback.ocrFailed).toBe(true);
    expect(fallback.fallbackManualEntry).toBe(true);
    expect(fallback.ocrEngine).toBe("fallback-manual");
    expect(fallback.items).toEqual([]);
    expect(fallback.detectedCurrency).toBe("ILS");
  }, 30_000);

  it("parses RTL Hebrew lines and Israeli Shekel markers client-side in billBoardTemplate.ts with valid inline JS", () => {
    const html = renderBillBoardHtml({
      bill: null,
      uiActionToken: "",
      apiBaseUrl: "https://localhost:3443",
    });

    // Confirm multi-language Tesseract worker ['heb', 'eng', 'rus'] and /api/receipts/scan wiring exist in client script
    expect(html).toContain('createWorker(["heb", "eng", "rus"])');
    expect(html).toContain('"/api/receipts/scan"');

    const scripts = Array.from(html.matchAll(/<script>([\s\S]*?)<\/script>/g));
    expect(scripts.length).toBeGreaterThanOrEqual(1);
    const inlineJs = scripts[scripts.length - 1]![1]!;

    // Verify syntactic validity via V8 vm.Script
    expect(() => new vm.Script(inlineJs)).not.toThrow();

    // Execute client script in minimal DOM sandbox to test window.__splittelParseReceiptClient directly
    const fakeWin: Record<string, unknown> = {
      location: { search: "", href: "https://localhost:3443/ui/bill-board" },
      history: { replaceState: () => undefined },
      addEventListener: () => undefined,
    };
    fakeWin.parent = fakeWin;

    const sandbox = {
      window: fakeWin,
      document: {
        documentElement: { setAttribute: () => undefined },
        getElementById: () => null,
        querySelectorAll: () => [],
        addEventListener: () => undefined,
      },
      HTMLDialogElement: { prototype: { closedBy: true } },
      URLSearchParams,
      URL,
      Intl,
      Map,
      Set,
      Promise,
      JSON,
      Math,
      Number,
      String,
      RegExp,
      Array,
      Object,
      parseFloat,
      parseInt,
      isNaN,
      setTimeout,
      clearTimeout,
      navigator: { language: "he-IL" },
    };

    vm.runInNewContext(inlineJs, sandbox);

    const parseFn = fakeWin.__splittelParseReceiptClient as (
      rawText: string,
      defaultCurrency?: string
    ) => {
      items: Array<{ item_name: string; price: number; quantity: number }>;
      detectedCurrency: string;
    };
    expect(typeof parseFn).toBe("function");

    const rtlClientResult = parseFn(
      [
        "חשבונית מס קבלה",
        "58.00 שקשוקה חריפה 1",
        "64.00 בירה גולדסטאר 2",
        "36.00 18.00 הפוך גדול 2",
        'סה"כ לתשלום 158.00 ש״ח',
      ].join("\n"),
      "RUB"
    );

    expect(rtlClientResult.detectedCurrency).toBe("ILS");
    expect(rtlClientResult.items).toEqual([
      { item_name: "שקשוקה חריפה", price: 58, quantity: 1 },
      { item_name: "בירה גולדסטאר", price: 32, quantity: 2 },
      { item_name: "הפוך גדול", price: 18, quantity: 2 },
    ]);
  });
});
