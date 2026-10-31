import { existsSync, mkdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import type { RawReceiptItem } from "./types.js";

export interface CurrencyDetectionResult {
  currency: string;
  tier: 1 | 2 | 3 | 4;
  confidence: number;
  reason: string;
}

export type ReceiptOcrEngine =
  | "tesseract"
  | "client-tesseract"
  | "gemini-3.8-flash"
  | "fallback-manual";

export interface ParsedReceiptData {
  title?: string;
  rawText: string;
  items: RawReceiptItem[];
  taxAmount: number;
  tipPercentage?: number;
  detectedCurrency?: string;
  currencyDetails?: CurrencyDetectionResult;
  ocrConfidence?: number;
  ocrLanguage?: string;
  ocrEngine?: ReceiptOcrEngine;
  ocrFailed?: boolean;
  fallbackManualEntry?: boolean;
  fallbackReason?: string;
}

/**
 * Normalizes Unicode bidirectional control marks, Hebrew punctuation (geresh/gershayim),
 * and visual dot/dash leaders commonly emitted by OCR on thermal receipts.
 */
function normalizeQuotesAndBidi(input: string): string {
  return (input || "")
    .replace(/[\u200E\u200F\u202A-\u202E\u2066-\u2069\uFEFF]/g, "")
    .replace(/[״“”„«»]|''/g, '"')
    .replace(/[׳‘’`]/g, "'");
}

function normalizeReceiptLine(rawLine: string): string {
  const cleaned = normalizeQuotesAndBidi(rawLine)
    // Separate Hebrew letters glued directly to digits by Tesseract RTL/LTR bidi reordering (e.g. "קלאסית58.00" -> "קלאסית 58.00")
    .replace(/(?<=[\u0590-\u05FF])(?=\d)/gu, " ")
    .replace(/(?<=\d)(?=[\u0590-\u05FF])/gu, " ")
    // Separate any letter glued directly to a decimal price (e.g. "Espresso18.00" -> "Espresso 18.00")
    .replace(/(?<=\p{L})(?=\d{1,6}[.,]\d{2}(?:\D|$))/gu, " ")
    .replace(/(?<=(?:^|\D)\d{1,6}[.,]\d{2})(?=\p{L})/gu, " ")
    // Normalize common Tesseract OCR gershayim artifacts on סה"כ and מע"מ (e.g. סה'"יכ -> סה"כ)
    .replace(/(?<=^|[^\u0590-\u05FF])סה['"י]{1,3}כ(?=$|[^\u0590-\u05FF])/gu, 'סה"כ')
    .replace(/(?<=^|[^\u0590-\u05FF])מע['"י]{1,3}מ(?=$|[^\u0590-\u05FF])/gu, 'מע"מ')
    // Replace visual dot/dash/underscore leaders between item and price with spaces
    .replace(/(?<=\S)\s*[.·•\-_]{3,}\s*(?=\S)/g, "  ")
    .replace(/\s+/g, " ")
    .trim();

  // Pure separator lines ("---", "***", "===", "...")
  if (!cleaned || /^[.·•\-_=*~#|\s]+$/.test(cleaned)) {
    return "";
  }
  return cleaned;
}

/**
 * Multi-Tier Currency Resolver (Cascade):
 * [Tier 1: Regex & OCR Symbol Match] -> [Tier 2: Script & Contextual Dish Detection] -> [Tier 3: Geo/Locale] -> [Tier 4: Manual UI Fallback]
 */
export function detectCurrencyDetails(
  ocrText: string,
  defaultCurrency = "RUB"
): CurrencyDetectionResult {
  const normalized = normalizeQuotesAndBidi(ocrText || "");
  const text = normalized.toLowerCase();

  // Tier 1: Regex-parsing of symbols and explicit currency markers (Immediate Detection)
  // ILS: ₪, ils, shekel, sheqel, шекель, ש״ח / ש"ח / ש'ח / שח / שקל / שקלים, nis
  if (
    /₪|\b(?:ils|nis|shekels?|sheqels?)\b|(?<=^|[^\p{L}])(?:шекел[а-яё]*|ש"ח|ש'ח|שח|שקל(?:ים)?)(?=$|[^\p{L}])/iu.test(
      text
    )
  ) {
    return {
      currency: "ILS",
      tier: 1,
      confidence: 1.0,
      reason: "OCR symbol/keyword match (ILS / ₪)",
    };
  }
  if (
    /₽|\brub\b|(?<=^|[^\p{L}])руб[а-яё.]*(?=$|[^\p{L}])/iu.test(text)
  ) {
    return {
      currency: "RUB",
      tier: 1,
      confidence: 1.0,
      reason: "OCR symbol/keyword match (RUB / ₽)",
    };
  }
  if (
    /฿|\b(?:baht|thb)\b|(?<=^|[^\p{L}])бат(?:а|ов|ам|ами)?(?=$|[^\p{L}])/iu.test(
      text
    )
  ) {
    return {
      currency: "THB",
      tier: 1,
      confidence: 1.0,
      reason: "OCR symbol/keyword match (THB / ฿)",
    };
  }
  if (
    /₺|\b(?:tl|try)\b|(?<=^|[^\p{L}])лир[а-яё]*(?=$|[^\p{L}])/iu.test(text)
  ) {
    return {
      currency: "TRY",
      tier: 1,
      confidence: 1.0,
      reason: "OCR symbol/keyword match (TRY / ₺)",
    };
  }
  if (/€|\beur\b|(?<=^|[^\p{L}])евро(?=$|[^\p{L}])/iu.test(text)) {
    return {
      currency: "EUR",
      tier: 1,
      confidence: 1.0,
      reason: "OCR symbol/keyword match (EUR / €)",
    };
  }
  if (/\$|\busd\b|(?<=^|[^\p{L}])долл[а-яё.]*(?=$|[^\p{L}])/iu.test(text)) {
    return {
      currency: "USD",
      tier: 1,
      confidence: 1.0,
      reason: "OCR symbol/keyword match (USD / $)",
    };
  }
  if (
    /\b(?:aed|dirhams?)\b|(?<=^|[^\p{L}])дирхам[а-яё]*(?=$|[^\p{L}])/iu.test(
      text
    )
  ) {
    return {
      currency: "AED",
      tier: 1,
      confidence: 1.0,
      reason: "OCR keyword match (AED / дирхам)",
    };
  }
  if (/₸|\bkzt\b|(?<=^|[^\p{L}])тенге(?=$|[^\p{L}])/iu.test(text)) {
    return {
      currency: "KZT",
      tier: 1,
      confidence: 1.0,
      reason: "OCR symbol/keyword match (KZT / ₸)",
    };
  }
  if (/£|\bgbp\b|(?<=^|[^\p{L}])фунт[а-яё]*(?=$|[^\p{L}])/iu.test(text)) {
    return {
      currency: "GBP",
      tier: 1,
      confidence: 1.0,
      reason: "OCR symbol/keyword match (GBP / £)",
    };
  }
  if (/₾|\bgel\b|(?<=^|[^\p{L}])лари(?=$|[^\p{L}])/iu.test(text)) {
    return {
      currency: "GEL",
      tier: 1,
      confidence: 1.0,
      reason: "OCR symbol/keyword match (GEL / ₾)",
    };
  }

  // Tier 2A: Native Hebrew script detection (when ₪ / ש"ח symbol was omitted or faded on thermal paper)
  if (/(?:[\u0590-\u05FF].*){2,}/u.test(normalized)) {
    return {
      currency: "ILS",
      tier: 2,
      confidence: 0.95,
      reason: "Hebrew script detected on receipt (ILS)",
    };
  }

  // Tier 2B: Contextual Dish and Cuisine Detection (when currency symbol is omitted)
  if (
    /shakshuka|shakshouka|hummus|falafel|shawarma|sabich|tahini|malabi|шакшука|хумус|фалафель|шаварма|шаурма|сабих|тхина|малаби/i.test(
      text
    )
  ) {
    return {
      currency: "ILS",
      tier: 2,
      confidence: 0.85,
      reason: "Contextual Israeli dish detection (Shakshuka, Hummus, Falafel)",
    };
  }

  if (
    /tom\s*yum|pad\s*thai|som\s*tum|tom\s*kha|green\s*curry|mango\s*sticky|singha|chang/i.test(
      text
    )
  ) {
    return {
      currency: "THB",
      tier: 2,
      confidence: 0.9,
      reason: "Contextual Thai dish detection (Tom Yum, Pad Thai)",
    };
  }

  if (
    /doner|kebab|baklava|ayran|pide|lahmacun|iskender|kunefe/i.test(text) &&
    !/[а-яё]/i.test(text)
  ) {
    return {
      currency: "TRY",
      tier: 2,
      confidence: 0.85,
      reason: "Contextual Turkish dish detection (Doner, Baklava)",
    };
  }

  if (
    /croissant|baguette|bouillabaisse|quiche|foie\s*gras|ratatouille/i.test(
      text
    ) &&
    !/[а-яё]/i.test(text)
  ) {
    return {
      currency: "EUR",
      tier: 2,
      confidence: 0.85,
      reason: "Contextual European dish detection (Croissant, Baguette)",
    };
  }

  if (
    /khinkali|khachapuri|satsivi|badrijani/i.test(text) &&
    !/руб|rub|₽/i.test(text)
  ) {
    return {
      currency: "GEL",
      tier: 2,
      confidence: 0.85,
      reason: "Contextual Georgian dish detection (Khinkali, Khachapuri)",
    };
  }

  // Tier 3/4: Default fallback
  return {
    currency: defaultCurrency,
    tier: 4,
    confidence: 0.5,
    reason: `Fallback to default currency (${defaultCurrency})`,
  };
}

export function detectCurrency(ocrText: string, defaultCurrency = "RUB"): string {
  return detectCurrencyDetails(ocrText, defaultCurrency).currency;
}

const EXCLUDED_START_PATTERNS: RegExp[] = [
  /^(?:чек|кассовый чек|добро пожаловать|спасибо за визит|спасибо|инн|кпп|огрн|р\/с|кассир|официант|смена|приход|итог|итого|всего|сумма|к оплате|оплата|безналичными|наличными|банковская карта|мир|visa|mastercard|terminal|auth|rrn|дата|время|фискальный|фн|фд|фп|qr|сайт|фнс|subtotal|total|amount due|tax|vat|tip|gratuity|service charge|cash|card|change|balance|thank you|welcome|table|server|cashier|order\s*#|invoice|receipt)(?=$|[^\p{L}])/iu,
];

// Hebrew non-item receipt metadata/summary/payment terms (matched anywhere as whole Hebrew words so RTL visual order "240.00 סה"כ" is also excluded)
const HEBREW_EXCLUDED_WORD_PATTERN =
  /(?<=^|[^\u0590-\u05FF])(?:חשבונית|קבלה|עוסק\s*מורשה|נאמן\s*למקור|מסמך\s*ממוחשב|לכבוד|העתק|ע\.?מ\.?|ח\.?פ\.?|סה"כ|סה'כ|סהכ|סך[\s-]*הכל|לתשלום|סכום\s*ביניים|לפני\s*מע"?מ|כולל(?:ים)?\s*מע"?מ|פטור\s*ממע"?מ|חייב\s*במע"?מ|מע"מ|מע'מ|שולחן|סועדים|אורחים|מלצר(?:ית)?|קופאי(?:ת)?|קופה|מסוף|אסמכתא|אישור|עסקה|חתימה|אשראי|מזומן|עודף|תשלומים|שולם|ויזה|ישראכרט|מאסטרקארד|דיינרס|ביט|פייבוקס|תן\s*ביס|סיבוס|הנחה|הנחת|זיכוי|ביטול|עיגול|תודה|להתראות|נשמח\s*לראותכם|טלפון|פקס|כתובת|תאריך|שעה|לא\s*כולל\s*שירות)(?=$|[^\u0590-\u05FF])/u;

const HEBREW_COLUMN_HEADER_TOKENS = [
  "כמות",
  "פריט",
  "פריטים",
  "תיאור",
  "תאור",
  "מחיר",
  "סכום",
  'סה"כ',
  "יח'",
];

function isColumnHeaderRow(line: string): boolean {
  let hits = 0;
  for (const tok of HEBREW_COLUMN_HEADER_TOKENS) {
    if (line.includes(tok)) hits++;
  }
  if (hits >= 2 && !/\d+[.,]\d{2}/.test(line)) {
    return true;
  }
  if (
    /\b(?:qty|quantity|item|description)\b/i.test(line) &&
    /\b(?:price|amount|total)\b/i.test(line) &&
    !/\d+[.,]\d{2}/.test(line)
  ) {
    return true;
  }
  return false;
}

function isExcludedMetadataLine(line: string): boolean {
  if (EXCLUDED_START_PATTERNS.some((p) => p.test(line))) {
    return true;
  }
  if (HEBREW_EXCLUDED_WORD_PATTERN.test(line)) {
    return true;
  }
  if (isColumnHeaderRow(line)) {
    return true;
  }
  // Standalone date / time / phone / order-id lines
  if (
    /^\d{1,2}[./-]\d{1,2}[./-]\d{2,4}(?:\s+\d{1,2}:\d{2}(?::\d{2})?)?$/.test(
      line
    )
  ) {
    return true;
  }
  if (
    /(?<=^|[^\u0590-\u05FF])(?:טל|רח|רחוב|סניף|הזמנה|מספר|מס')(?=[.:\s']|$)/u.test(
      line
    ) &&
    (/\d{2,3}[\s-]\d{6,7}/.test(line) || /\d{1,2}:\d{2}/.test(line) || /\d{5,}/.test(line))
  ) {
    return true;
  }
  // Negative discount / void line (including Israeli RTL trailing minus like "15.00-")
  if (/(?:^|\s)-\s*\d+(?:[.,]\d{1,2})?(?:\s|$)|\d+(?:[.,]\d{1,2})?-\s*$/.test(line)) {
    return true;
  }
  return false;
}

function extractMonetaryAmount(lineWithoutPercentages: string): number | null {
  const matches = Array.from(
    lineWithoutPercentages.matchAll(/(\d{1,6}(?:[.,]\d{1,2})?)/g)
  );
  if (matches.length === 0) return null;
  // Choose the most currency-like number (prefer decimal or last amount on summary row)
  const withDecimals = matches.find((m) => /[.,]\d{1,2}$/.test(m[1] ?? ""));
  const chosen = (withDecimals ?? matches[matches.length - 1])?.[1];
  if (!chosen) return null;
  const val = parseFloat(chosen.replace(",", "."));
  return Number.isFinite(val) && val > 0 ? val : null;
}

function isGrandTotalSummaryLine(line: string): boolean {
  // Exclude pre-VAT or subtotal lines
  if (/לפני\s*מע"?מ|ביניים|subtotal|פריטים|הנחה|מע"?מ\s*\d/iu.test(line)) {
    return false;
  }
  return /(?:סה"כ|סה'כ|סהכ|סך[\s-]*הכל|לתשלום|(?<=^|\s)(?:total|amount\s*due|итого?|всего|к\s*оплате)(?=\s|:|$))/iu.test(
    line
  );
}

function cleanExtractedItemName(rawName: string): string {
  return rawName
    .replace(/^(?:₪|₽|€|\$|฿|₺|₸|£|₾|ש"ח|ש'ח|שח)\s*/iu, "")
    .replace(/\s*(?:₪|₽|€|\$|฿|₺|₸|£|₾|ש"ח|ש'ח|שח)$/iu, "")
    .replace(/^[=\-–—•*#:.,\s]+|[=\-–—•*#:.,\s]+$/g, "")
    .trim();
}

function isPlausibleDishName(name: string): boolean {
  if (!name || name.length < 2) return false;
  // Dish name should not start with a decimal price (indicates RTL price-first row)
  if (/^\d{1,6}[.,]\d{1,2}(?:\s|$)/.test(name)) return false;
  // Must contain at least 2 Unicode letters (or 2 Hebrew letters)
  const letters = name.match(/\p{L}/gu) ?? [];
  if (letters.length < 2) return false;
  // Reject strings that are mostly digits or masked card numbers
  const digits = name.match(/\d/g) ?? [];
  if (digits.length > letters.length * 2 || /\*{2,}|\d{5,}/.test(name)) {
    return false;
  }
  return true;
}

/**
 * Parses raw text from a receipt (via OCR or user text paste) into structured
 * line items, price, quantity, and detected tax/tip amounts.
 * Full support for RTL Hebrew Israeli POS receipts (Tabit, Beecomm, Verifone, Aroma, etc.),
 * Russian fiscal checks, and English/international receipts.
 */
export function parseReceiptText(
  text: string,
  defaultCurrency = "RUB"
): ParsedReceiptData {
  if (!text || !text.trim()) {
    return {
      title: undefined,
      rawText: "",
      items: [],
      taxAmount: 0,
      tipPercentage: undefined,
      detectedCurrency: undefined,
      currencyDetails: undefined,
    };
  }

  const normalizedFull = normalizeQuotesAndBidi(text);
  const lines = normalizedFull
    .split(/\r?\n/)
    .map(normalizeReceiptLine)
    .filter(Boolean);

  const items: RawReceiptItem[] = [];
  let detectedTitle: string | undefined;
  let additiveTaxAmount = 0;
  let hebrewVatCandidate = 0;
  let hebrewVatExplicitlyAdditive = false;
  let receiptGrandTotal = 0;
  let tipPercentage: number | undefined;

  const receiptExplicitlyIncludesVat =
    /כולל(?:ים)?\s*מע"?מ|מע"?מ\s*כלול|vat\s*included|incl\.?\s*vat|в\s*т\.?\s*ч\.?\s*ндс/iu.test(
      normalizedFull
    );

  const PREFIX_CURRENCY_RE =
    "(?:₪|₽|€|\\$|฿|₺|₸|£|₾|ils|nis|usd|eur|ש\"ח|ש'ח|שח)";
  const SUFFIX_CURRENCY_RE =
    "(?:₪|₽|€|\\$|฿|₺|₸|£|₾|руб\\.?|р\\.?|rub|eur|usd|ils|nis|thb|try|aed|kzt|gel|gbp|ש\"ח|ש'ח|שח)";

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]!;

    // Skip lines that have no letters at all (pure barcodes, timestamps, separator digits)
    if (!/\p{L}/u.test(line)) {
      continue;
    }

    // Capture Grand Total if present (used to prevent double-charging Israeli inclusive מע"מ)
    if (isGrandTotalSummaryLine(line)) {
      const strippedPct = line.replace(/\d{1,2}(?:[.,]\d{1,2})?\s*%/g, " ");
      const totalVal = extractMonetaryAmount(strippedPct);
      if (totalVal !== null && totalVal > 0) {
        receiptGrandTotal = totalVal;
      }
      continue;
    }

    // Detect Tip / Service line (LTR & RTL Hebrew: "Чаевые 10%", "Tip 12%", "טיפ 12%", "12% טיפ")
    if (!/לא\s*כולל\s*שירות/u.test(line)) {
      const tipMatch = line.match(
        /(?:(?:чаевые|tip|gratuity|сервисный\s*сбор|טיפ|דמי\s*שירות)[^\d%]*(\d{1,2}(?:[.,]\d{1,2})?)\s*%|(\d{1,2}(?:[.,]\d{1,2})?)\s*%\s*(?:чаевые|tip|gratuity|טיפ|דמי\s*שירות))/iu
      );
      const rawPct = tipMatch?.[1] ?? tipMatch?.[2];
      if (rawPct) {
        const pct = parseFloat(rawPct.replace(",", "."));
        if (!isNaN(pct) && pct >= 0 && pct <= 100) {
          tipPercentage = pct;
        }
        continue;
      }
    }

    // Detect Russian / English Tax or VAT line: e.g. "НДС 20% = 320" or "VAT 17%: 15.30"
    if (/(?<=^|[^\p{L}])(?:ндс|tax|vat)(?=$|[^\p{L}])/iu.test(line)) {
      if (!/vat\s*included|incl\.?\s*vat|в\s*т\.?\s*ч\.?\s*ндс/iu.test(line)) {
        const withoutPct = line.replace(/\d{1,2}(?:[.,]\d{1,2})?\s*%/g, " ");
        const val = extractMonetaryAmount(withoutPct);
        if (val !== null && val > 0 && val < 50000) {
          additiveTaxAmount = val;
        }
      }
      continue;
    }

    // Detect Hebrew VAT line ("מע"מ 18% 24.41" or RTL "24.41 מע"מ 18%")
    if (/(?<=^|[^\u0590-\u05FF])(?:מע"מ|מע'מ|מעמ)(?=$|[^\u0590-\u05FF])/u.test(line)) {
      if (!/לפני\s*מע"?מ|פטור\s*ממע"?מ|חייב\s*במע"?מ|כולל(?:ים)?\s*מע"?מ/u.test(line)) {
        const withoutPct = line.replace(/\d{1,2}(?:[.,]\d{1,2})?\s*%/g, " ");
        const val = extractMonetaryAmount(withoutPct);
        if (val !== null && val > 0 && val < 50000) {
          hebrewVatCandidate = val;
          if (/\+\s*מע"?מ|תוספת\s*מע"?מ/u.test(line)) {
            hebrewVatExplicitlyAdditive = true;
          }
        }
      }
      continue;
    }

    // Detect potential restaurant title near top of receipt (before any items are parsed)
    if (
      i < 5 &&
      items.length === 0 &&
      !detectedTitle &&
      line.length >= 3 &&
      line.length <= 48 &&
      !isExcludedMetadataLine(line)
    ) {
      const hasTwoLetters = /\p{L}.*\p{L}/u.test(line);
      const looksLikePricedItem =
        new RegExp(
          `(?:\\s\\d{1,6}(?:[.,]\\d{1,2})?\\s*${SUFFIX_CURRENCY_RE}?$|^${PREFIX_CURRENCY_RE}?\\s*\\d{1,6}(?:[.,]\\d{1,2})?\\s+\\p{L})`,
          "iu"
        ).test(line);

      if (
        hasTwoLetters &&
        !looksLikePricedItem &&
        !/\d{3,}/.test(line) &&
        !/^\d+[./-]\d+/.test(line) &&
        !/(?<=^|[^\u0590-\u05FF])(?:טל|רחוב|רח'|כתובת|עיר)(?=$|[^\u0590-\u05FF])/u.test(
          line
        )
      ) {
        // Strip outer quotes only, preserving internal Hebrew abbreviations like בע"מ
        detectedTitle = line.replace(/^["']+|["']+$/g, "").trim();
        continue;
      }
    }

    // Skip non-item headers, footers, table/waiter metadata, and payment lines
    if (isExcludedMetadataLine(line)) {
      continue;
    }

    // Strip leading list numbering like "1. ", "2) ", "• " (without stripping bare POS quantity "2 הפוך")
    const itemLine =
      line
        .replace(/^(?:\d{1,2}[.)]\s+|[•*#\-–—]+\s+)/, "")
        .trim() || line;

    // -------------------------------------------------------------------------
    // Matcher 1A: Multi-column LTR ("2 הפוך גדול 16.00 32.00" or "הפוך גדול 2 16.00 32.00")
    // -------------------------------------------------------------------------
    const multiColLtr = itemLine.match(
      new RegExp(
        `^(?:(\\d{1,2})\\s+(?:(?:x|×|\\*)\\s*)?)?(.+?)\\s+(?:(\\d{1,2})\\s+)?${PREFIX_CURRENCY_RE}?\\s*(\\d{1,5}(?:[.,]\\d{1,2})?)\\s+${PREFIX_CURRENCY_RE}?\\s*(\\d{1,6}(?:[.,]\\d{1,2})?)\\s*${SUFFIX_CURRENCY_RE}?$`,
        "iu"
      )
    );
    if (multiColLtr) {
      const qRaw = multiColLtr[1] || multiColLtr[3];
      const candidateName = cleanExtractedItemName(multiColLtr[2] ?? "");
      const p1 = parseFloat((multiColLtr[4] ?? "").replace(",", "."));
      const p2 = parseFloat((multiColLtr[5] ?? "").replace(",", "."));
      if (isPlausibleDishName(candidateName) && p1 > 0 && p2 > 0) {
        const unitP = Math.min(p1, p2);
        const totalP = Math.max(p1, p2);
        const inferredQty = qRaw
          ? parseInt(qRaw, 10)
          : unitP > 0
            ? Math.round(totalP / unitP)
            : 0;
        if (
          inferredQty >= 1 &&
          inferredQty <= 50 &&
          Math.abs(unitP * inferredQty - totalP) <= 0.06
        ) {
          items.push({
            item_name: candidateName,
            price: unitP,
            quantity: inferredQty,
          });
          continue;
        }
      }
    }

    // -------------------------------------------------------------------------
    // Matcher 1B: Multi-column RTL visual ("32.00 16.00 הפוך גדול 2" or "₪32.00 ₪16.00 הפוך גדול 2")
    // -------------------------------------------------------------------------
    const multiColRtl = itemLine.match(
      new RegExp(
        `^${PREFIX_CURRENCY_RE}?\\s*(\\d{1,6}(?:[.,]\\d{1,2})?)\\s*${PREFIX_CURRENCY_RE}?\\s+(\\d{1,5}(?:[.,]\\d{1,2})?)\\s*${PREFIX_CURRENCY_RE}?\\s+(.+?)(?:\\s+(\\d{1,2}))?$`,
        "iu"
      )
    );
    if (multiColRtl) {
      const p1 = parseFloat((multiColRtl[1] ?? "").replace(",", "."));
      const p2 = parseFloat((multiColRtl[2] ?? "").replace(",", "."));
      const candidateName = cleanExtractedItemName(multiColRtl[3] ?? "");
      const qRaw = multiColRtl[4];
      if (isPlausibleDishName(candidateName) && p1 > 0 && p2 > 0) {
        const unitP = Math.min(p1, p2);
        const totalP = Math.max(p1, p2);
        const inferredQty = qRaw
          ? parseInt(qRaw, 10)
          : unitP > 0
            ? Math.round(totalP / unitP)
            : 0;
        if (
          inferredQty >= 1 &&
          inferredQty <= 50 &&
          Math.abs(unitP * inferredQty - totalP) <= 0.06
        ) {
          items.push({
            item_name: candidateName,
            price: unitP,
            quantity: inferredQty,
          });
          continue;
        }
      }
    }

    // -------------------------------------------------------------------------
    // Matcher 2: Price at End ("[qty x] <item_name> [qty x] [₪] <price> [₪/ש"ח/руб]")
    // -------------------------------------------------------------------------
    const priceLastMatch = itemLine.match(
      new RegExp(
        `^(?:(\\d{1,2})\\s*(?:x|×|\\*|шт\\.?|порц\\.?|יח'?)\\s+)?(.+?)\\s+(?:(\\d{1,2})\\s*(?:x|×|\\*|шт\\.?|порц\\.?|יח'?)\\s+)?(?:[=-]\\s*)?(?:${PREFIX_CURRENCY_RE}\\s*)?(\\d{1,6}(?:[.,]\\d{1,2})?)\\s*${SUFFIX_CURRENCY_RE}?$`,
        "iu"
      )
    );

    if (priceLastMatch) {
      const qExplicit = priceLastMatch[1] || priceLastMatch[3];
      let rawName = cleanExtractedItemName(priceLastMatch[2] ?? "");
      const rawPriceStr = priceLastMatch[4];

      if (rawName && rawPriceStr) {
        let price = parseFloat(rawPriceStr.replace(",", "."));
        let qty = qExplicit ? parseInt(qExplicit, 10) : 1;

        // Check bare POS leading quantity ("2 הפוך גדול 32.00" or "1 =שקשוקה חריפה 62.00") when no explicit "x" was present
        if (!qExplicit) {
          const bareLead = rawName.match(/^(\d{1,2})\s*=?\s*(\p{L}.+)$/u);
          if (bareLead && bareLead[1] && bareLead[2]) {
            const leadQ = parseInt(bareLead[1], 10);
            const restName = cleanExtractedItemName(bareLead[2]);
            if (
              leadQ >= 1 &&
              leadQ <= 19 &&
              isPlausibleDishName(restName) &&
              !/^(?:מ"ל|מל|גרם|גר'|ק"ג|ליטר|ml|gr|g|kg|l|oz)\b/iu.test(restName)
            ) {
              rawName = restName;
              if (leadQ > 1 && /[\u0590-\u05FF]/u.test(restName)) {
                // On Israeli single-price POS receipts, bare "2 בירה 64.00" prints line total 64.00
                if (Math.round(price * 100) % leadQ === 0) {
                  price = Number((price / leadQ).toFixed(2));
                  qty = leadQ;
                } else {
                  rawName = `${restName} ×${leadQ}`;
                  qty = 1;
                }
              } else {
                qty = leadQ;
              }
            }
          }
        }

        if (isPlausibleDishName(rawName) && !isNaN(price) && price > 0 && qty > 0) {
          items.push({
            item_name: rawName,
            price,
            quantity: qty,
          });
          continue;
        }
      }
    }

    // -------------------------------------------------------------------------
    // Matcher 3: RTL Visual Price-First ("[₪] <price> [₪] <item_name> [qty]")
    // Common on Israeli thermal POS receipts (Tabit, Beecomm, Verifone)
    // -------------------------------------------------------------------------
    const priceFirstMatch = itemLine.match(
      new RegExp(
        `^(?:${PREFIX_CURRENCY_RE}\\s*)?(\\d{1,6}(?:[.,]\\d{1,2})?)\\s*(?:${PREFIX_CURRENCY_RE}\\s+)?(?:(?:x|×|\\*)\\s*(\\d{1,2})\\s+)?(.+)$`,
        "iu"
      )
    );
    if (priceFirstMatch) {
      const rawPriceStr = priceFirstMatch[1];
      const explicitMultStr = priceFirstMatch[2];
      let rawName = cleanExtractedItemName(priceFirstMatch[3] ?? "");

      if (rawPriceStr && rawName) {
        let price = parseFloat(rawPriceStr.replace(",", "."));
        let qty = explicitMultStr ? parseInt(explicitMultStr, 10) : 1;

        // Check trailing RTL quantity column: e.g. "58.00 שקשוקה חריפה 1" or "64.00 בירה גולדסטאר 2"
        if (!explicitMultStr) {
          const rtlTrail = rawName.match(
            /^(.+?\p{L}[^\d/]*?)\s+(?:(x|×|\*)\s*)?(\d{1,2})$/u
          );
          if (rtlTrail && rtlTrail[1] && rtlTrail[3]) {
            const baseName = cleanExtractedItemName(rtlTrail[1]);
            const hasMultSign = Boolean(rtlTrail[2]);
            const trailQ = parseInt(rtlTrail[3], 10);
            if (trailQ >= 1 && trailQ <= 19 && isPlausibleDishName(baseName)) {
              rawName = baseName;
              if (trailQ === 1) {
                qty = 1;
              } else if (hasMultSign) {
                qty = trailQ;
              } else if (Math.round(price * 100) % trailQ === 0) {
                // Israeli POS single-price column prints line total on left, quantity on right
                price = Number((price / trailQ).toFixed(2));
                qty = trailQ;
              } else {
                rawName = `${baseName} ×${trailQ}`;
                qty = 1;
              }
            }
          }
        }

        if (isPlausibleDishName(rawName) && !isNaN(price) && price > 0 && qty > 0) {
          items.push({
            item_name: rawName,
            price,
            quantity: qty,
          });
          continue;
        }
      }
    }
  }

  // Reconcile taxAmount: prevent double-charging VAT on Israeli tax-inclusive receipts ("כולל מע"מ")
  let taxAmount = additiveTaxAmount;
  if (taxAmount === 0 && hebrewVatCandidate > 0 && !receiptExplicitlyIncludesVat) {
    const itemsSubtotal = items.reduce(
      (acc, it) => acc + it.price * (it.quantity ?? 1),
      0
    );
    if (hebrewVatExplicitlyAdditive) {
      taxAmount = hebrewVatCandidate;
    } else if (receiptGrandTotal > 0 && itemsSubtotal > 0) {
      const diffInclusive = Math.abs(itemsSubtotal - receiptGrandTotal);
      const diffAdditive = Math.abs(
        itemsSubtotal + hebrewVatCandidate - receiptGrandTotal
      );
      if (diffAdditive + 0.5 < diffInclusive) {
        taxAmount = hebrewVatCandidate;
      }
    }
  }

  const currencyDetails = detectCurrencyDetails(normalizedFull, defaultCurrency);

  return {
    title: detectedTitle,
    rawText: text,
    items,
    taxAmount,
    tipPercentage,
    detectedCurrency: currencyDetails.currency,
    currencyDetails,
  };
}

// =============================================================================
// IMAGE PREPROCESSING & MULTILINGUAL WARM TESSERACT OCR ENGINE
// =============================================================================

/**
 * Enhances smartphone camera photos of thermal paper receipts prior to Tesseract LSTM OCR:
 * 1. Auto-rotates pixels using EXIF Orientation metadata (`capture="environment"` portrait JPEGs).
 * 2. Scales resolution into optimal ~300 DPI LSTM band (upscaling tiny captures, downscaling 12-48MP photos).
 * 3. Converts to grayscale, stretches histogram (`.normalize()`), boosts ink contrast, sharpens glyphs,
 *    and embeds explicit 300 DPI metadata so Tesseract scales stroke widths accurately.
 */
export async function preprocessReceiptImageForOcr(
  imageBuffer: Buffer,
  mode: "standard" | "high_contrast" = "standard"
): Promise<Buffer> {
  if (!imageBuffer || imageBuffer.length < 32) {
    return imageBuffer;
  }

  try {
    const sharpMod = await import("sharp");
    const sharp = sharpMod.default;

    const meta = await sharp(imageBuffer, { failOn: "none" }).metadata();

    let pipeline = sharp(imageBuffer, { failOn: "none" }).rotate();

    // EXIF orientations 5..8 rotate 90°/270°, swapping width and height
    const isRotated90 = (meta.orientation ?? 1) >= 5;
    const w = isRotated90 ? (meta.height ?? 0) : (meta.width ?? 0);
    const h = isRotated90 ? (meta.width ?? 0) : (meta.height ?? 0);
    const maxDim = Math.max(w, h);

    if (maxDim > 2200) {
      pipeline = pipeline.resize({
        width: 2200,
        height: 2200,
        fit: "inside",
        withoutEnlargement: true,
        kernel: "lanczos3",
      });
    } else if (maxDim > 0 && maxDim < 720) {
      const scale = Math.min(2.0, 1400 / maxDim);
      if (scale > 1.15) {
        pipeline = pipeline.resize({
          width: Math.round(w * scale),
          height: Math.round(h * scale),
          fit: "inside",
          kernel: "lanczos3",
        });
      }
    }

    if (mode === "high_contrast") {
      pipeline = pipeline
        .grayscale()
        .normalize()
        .gamma(1.45)
        .linear(1.32, -32)
        .sharpen({ sigma: 1.1 });
    } else {
      pipeline = pipeline.grayscale().normalize();
      if (maxDim > 2200) {
        pipeline = pipeline.sharpen({ sigma: 0.75 });
      }
    }

    return await pipeline
      .extend({
        top: 24,
        bottom: 24,
        left: 24,
        right: 24,
        background: "#ffffff",
      })
      .withMetadata({ density: 300 })
      .png({ compressionLevel: 4 })
      .toBuffer();
  } catch {
    return imageBuffer;
  }
}

function resolveTessdataCacheConfig(langs: string): {
  cachePath: string;
  cacheMethod?: string;
} {
  const langCodes = langs
    .split("+")
    .map((s) => s.trim())
    .filter(Boolean);

  const bundledDirs = [
    process.env.TESSDATA_DIR,
    resolve(process.cwd(), "tessdata"),
  ].filter((d): d is string => Boolean(d));

  for (const dir of bundledDirs) {
    if (
      existsSync(dir) &&
      langCodes.every((code) => existsSync(join(dir, `${code}.traineddata`)))
    ) {
      return { cachePath: dir, cacheMethod: "readOnly" };
    }
  }

  const writableTmp = join(tmpdir(), "splittel-tessdata");
  try {
    mkdirSync(writableTmp, { recursive: true });
  } catch {
    // Directory already exists
  }
  return { cachePath: writableTmp };
}

interface PooledWorkerEntry {
  workerPromise: Promise<import("tesseract.js").Worker>;
  queue: Promise<unknown>;
  idleTimer?: ReturnType<typeof setTimeout>;
}

const WORKER_IDLE_TTL_MS = 180_000;
const ocrWorkerPool = new Map<string, PooledWorkerEntry>();

function touchWorkerIdleTimer(langs: string, entry: PooledWorkerEntry): void {
  if (entry.idleTimer) {
    clearTimeout(entry.idleTimer);
  }
  entry.idleTimer = setTimeout(() => {
    const current = ocrWorkerPool.get(langs);
    if (current === entry) {
      ocrWorkerPool.delete(langs);
      entry.workerPromise
        .then((w) => w.terminate())
        .catch(() => undefined);
    }
  }, WORKER_IDLE_TTL_MS);
  entry.idleTimer.unref?.();
}

async function evictOcrWorker(langs: string): Promise<void> {
  const entry = ocrWorkerPool.get(langs);
  if (!entry) return;
  ocrWorkerPool.delete(langs);
  if (entry.idleTimer) clearTimeout(entry.idleTimer);
  try {
    const worker = await entry.workerPromise;
    await worker.terminate();
  } catch {
    // ignore termination errors
  }
}

export async function shutdownOcrWorkers(): Promise<void> {
  const keys = Array.from(ocrWorkerPool.keys());
  await Promise.all(keys.map((k) => evictOcrWorker(k)));
}

function getOrCreatePooledWorker(langs: string): PooledWorkerEntry {
  const existing = ocrWorkerPool.get(langs);
  if (existing) {
    touchWorkerIdleTimer(langs, existing);
    return existing;
  }

  const cacheCfg = resolveTessdataCacheConfig(langs);
  const workerPromise = (async () => {
    const { createWorker, OEM } = await import("tesseract.js");
    const worker = await createWorker(langs, OEM.LSTM_ONLY, {
      cachePath: cacheCfg.cachePath,
      ...(cacheCfg.cacheMethod ? { cacheMethod: cacheCfg.cacheMethod } : {}),
    });
    return worker;
  })();

  const entry: PooledWorkerEntry = {
    workerPromise,
    queue: Promise.resolve(),
  };
  ocrWorkerPool.set(langs, entry);
  touchWorkerIdleTimer(langs, entry);

  workerPromise.catch(() => {
    if (ocrWorkerPool.get(langs) === entry) {
      ocrWorkerPool.delete(langs);
    }
  });

  return entry;
}

async function runPooledRecognition(
  imageBuffer: Buffer,
  langs: string,
  pageSegMode: "4" | "6" | "3" = "4"
): Promise<{ text: string; confidence: number }> {
  const entry = getOrCreatePooledWorker(langs);

  const task = entry.queue.then(async () => {
    const { PSM } = await import("tesseract.js");
    const worker = await entry.workerPromise;
    await worker.setParameters({
      tessedit_pageseg_mode:
        pageSegMode === "4"
          ? PSM.SINGLE_COLUMN
          : pageSegMode === "6"
            ? PSM.SINGLE_BLOCK
            : PSM.AUTO,
      preserve_interword_spaces: "0",
      user_defined_dpi: "300",
    });
    const ret = await worker.recognize(imageBuffer, { rotateAuto: true });
    touchWorkerIdleTimer(langs, entry);
    return {
      text: ret.data.text || "",
      confidence: typeof ret.data.confidence === "number" ? ret.data.confidence : 0,
    };
  });

  // Keep mutex chain alive regardless of individual job errors
  entry.queue = task.catch(() => undefined);
  return task;
}

/**
 * Scores OCR candidates across `heb+eng` and `rus+eng` using Tesseract confidence,
 * parsed item count, script-specific receipt vocabulary, and Hebrew/Russian orthographic validity
 * (e.g. Hebrew final letters ךםןףץ at word endings vs mid-word hallucinations, Russian vowel presence).
 */
function scoreOcrCandidate(
  langs: string,
  rawText: string,
  confidence: number,
  parsed: ParsedReceiptData,
  currencyHint?: string
): number {
  const normalized = normalizeQuotesAndBidi(rawText);
  if (!normalized.trim()) return -100;

  let score = confidence;

  // 1. Structured receipt items extracted
  if (parsed.items.length === 0) {
    score -= 35;
  } else {
    score += Math.min(parsed.items.length, 7) * 18;
  }

  if (parsed.title) {
    score += 8;
  }

  // 2. Hebrew receipt & culinary markers + final-letter orthography
  if (
    /₪|ש"ח|ש'ח|סה"כ|סהכ|לתשלום|חשבונית|קבלה|מע"מ|עוסק\s*מורשה|שולחן|מלצר|אשראי|מזומן|תודה/u.test(
      normalized
    )
  ) {
    score += 48;
  }
  if (
    /שקשוקה|חומוס|פלאפל|טחינה|סלט|קפה|הפוך|אספרסו|קפוצ'?ינו|בירה|יין|מים|לימונדה|שניצל|המבורגר|פיצה|פסטה|לחם|פיתה|צ'?יפס|עוגה|קינוח|מלבי|מרק|דג|סלמון|סטייק|פרגית|שווארמה|סביח|כריך/u.test(
      normalized
    )
  ) {
    score += 32;
  }

  const validHebrewFinalWords =
    normalized.match(/[\u05D0-\u05EA]{2,}[ךםןףץ](?=$|[^\u0590-\u05FF])/gu) ?? [];
  score += Math.min(validHebrewFinalWords.length, 6) * 6;

  // Mid-word Hebrew final letters (ךםןףץ followed immediately by another Hebrew letter) indicate script hallucination
  const invalidMidWordFinals =
    normalized.match(/[ךםןףץ][\u05D0-\u05EA]/gu) ?? [];
  score -= invalidMidWordFinals.length * 14;

  // 3. Russian receipt markers & vowel orthography
  if (
    /₽|(?<=^|[^\p{L}])(?:руб|итого?|всего|к\s*оплате|кассовый|чек|инн|фн|фд|фп|ндс|спасибо|кассир|безналичн|наличн)/iu.test(
      normalized
    )
  ) {
    score += 48;
  }

  const validRussianWords =
    normalized.match(/(?=[а-яё]{3,})[а-яё]*[аеёиоуыэюя][а-яё]*/giu) ?? [];
  score += Math.min(validRussianWords.length, 7) * 4;

  const vowellessCyrillicClusters =
    normalized.match(/(?<=^|[^а-яё])[бвгджзйклмнпрстфхцчшщъь]{4,}(?=$|[^а-яё])/giu) ?? [];
  score -= vowellessCyrillicClusters.length * 12;

  // 4. Symbol gibberish penalty
  const symbolNoise = normalized.match(/[~^|\\<>{}[\]§±©®™]/g) ?? [];
  score -= Math.min(symbolNoise.length * 4, 28);

  // 5. Currency / Locale hint tie-breaker
  const hint = currencyHint?.trim().toUpperCase();
  if (hint === "ILS" && langs.includes("heb") && /[\u0590-\u05FF]/u.test(normalized)) {
    score += 14;
  } else if (hint === "RUB" && langs.includes("rus") && /[а-яё]/iu.test(normalized)) {
    score += 14;
  }

  return score;
}

/**
 * When `heb+eng` wins on an Israeli receipt (giving rock-solid decimal prices),
 * bilingual script switching next to leading digits (e.g. `1 פנקייק`) can occasionally
 * turn one Hebrew word into short Latin noise (`"id 1 קלאסי"`).
 * Running a fast pure-`heb` pass recovers the clean Hebrew phrase (`"פנקייק קלאסי"`)
 * while preserving `heb+eng`'s exact prices and quantities.
 */
async function refineHebrewDishNamesIfNoisy(
  standardBuf: Buffer,
  parsed: ParsedReceiptData
): Promise<ParsedReceiptData> {
  const hasMixedNoiseItem = parsed.items.some(
    (it) =>
      /[\u0590-\u05FF]/u.test(it.item_name) &&
      /[A-Za-z]/u.test(it.item_name)
  );
  if (!hasMixedNoiseItem) {
    return parsed;
  }

  try {
    const pureHeb = await runPooledRecognition(standardBuf, "heb", "4");
    const purePhrases = normalizeQuotesAndBidi(pureHeb.text)
      .split(/\r?\n/)
      .map((line) => {
        const words = line.match(/[\u0590-\u05FF]{2,}(?:["'][\u0590-\u05FF]+)*/gu) ?? [];
        return words.join(" ").trim();
      })
      .filter((phrase) => phrase.length >= 2 && !isExcludedMetadataLine(phrase));

    if (purePhrases.length === 0) return parsed;

    const refinedItems = parsed.items.map((item) => {
      if (
        !(/[\u0590-\u05FF]/u.test(item.item_name) && /[A-Za-z]/u.test(item.item_name))
      ) {
        return item;
      }
      const hebAnchors =
        item.item_name.match(/[\u0590-\u05FF]{2,}/gu) ?? [];
      if (hebAnchors.length === 0) return item;

      const matchedPhrase = purePhrases.find((phrase) =>
        hebAnchors.every((anchor) => phrase.includes(anchor))
      );
      if (matchedPhrase && matchedPhrase.length >= hebAnchors.join(" ").length) {
        return {
          ...item,
          item_name: matchedPhrase,
        };
      }
      return item;
    });

    return {
      ...parsed,
      items: refinedItems,
    };
  } catch {
    return parsed;
  }
}

export const GEMINI_RECEIPT_VISION_PROMPT =
  'Analyze this receipt image and extract all purchased items with 100% precision. Accurately identify the language and script: Russian (Cyrillic, rubles ₽/руб), Hebrew (RTL, shekels ₪/ש״ח/שח), or English/Latin (USD/EUR/etc.). NEVER confuse Cyrillic with Hebrew characters. Automatically determine the correct 3-letter ISO currency ("RUB", "ILS", "USD", "EUR", etc.). For every purchased product or service, extract: 1) name (clean title in original language), 2) individual unit price (number), 3) quantity (integer, default 1). Also extract tax/VAT amount if listed, grand total, and restaurant or store name. Return valid JSON matching schema: { "title": "string", "currency": "string", "tax": number, "total": number, "items": [{ "name": "string", "price": number, "quantity": number }] }.';

export interface GeminiVisionFallbackOptions {
  imageBuffer?: Buffer;
  mimeType?: string;
  imageUrl?: string | null;
  currencyHint?: string;
  apiKey?: string;
  timeoutMs?: number;
  fetchImpl?: typeof fetch;
}

function detectImageMimeType(buf: Buffer, fallback = "image/jpeg"): string {
  if (buf.length >= 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) {
    return "image/jpeg";
  }
  if (
    buf.length >= 8 &&
    buf[0] === 0x89 &&
    buf[1] === 0x50 &&
    buf[2] === 0x4e &&
    buf[3] === 0x47
  ) {
    return "image/png";
  }
  if (
    buf.length >= 12 &&
    buf.subarray(0, 4).toString("ascii") === "RIFF" &&
    buf.subarray(8, 12).toString("ascii") === "WEBP"
  ) {
    return "image/webp";
  }
  if (buf.length >= 4 && buf.subarray(0, 3).toString("ascii") === "GIF") {
    return "image/gif";
  }
  return fallback;
}

/**
 * Evaluates whether to escalate receipt extraction to Gemini 2.0 Flash Multimodal Vision:
 * - Client-side or server-side OCR confidence < 70%, OR
 * - Hebrew characters (`[\u0590-\u05FF]`) are present while item/price extraction failed, OR
 * - Local OCR extracted zero items or failed altogether.
 */
export function shouldTriggerGeminiVisionFallback(params: {
  ocrConfidence?: number;
  rawText?: string;
  itemsCount: number;
  ocrFailed?: boolean;
  clientOcrConfidence?: number;
  clientOcrText?: string;
}): boolean {
  if (params.ocrFailed) return true;

  const combinedText = `${params.rawText || ""}\n${params.clientOcrText || ""}`;
  if (/[\u0590-\u05FF]/u.test(combinedText) && params.itemsCount === 0) {
    return true;
  }

  if (params.itemsCount === 0) {
    return true;
  }

  if (typeof params.ocrConfidence === "number" && params.ocrConfidence < 70) {
    return true;
  }

  if (
    typeof params.clientOcrConfidence === "number" &&
    params.clientOcrConfidence < 70
  ) {
    return true;
  }

  return false;
}

function createManualFallbackReceipt(
  fallbackCurrency: string,
  partial?: Partial<ParsedReceiptData>
): ParsedReceiptData {
  return {
    title: partial?.title,
    rawText: partial?.rawText ?? "",
    items: [],
    taxAmount: 0,
    detectedCurrency: partial?.detectedCurrency ?? fallbackCurrency,
    currencyDetails: partial?.currencyDetails,
    ocrConfidence: partial?.ocrConfidence ?? 0,
    ocrLanguage: partial?.ocrLanguage,
    ocrEngine: "fallback-manual",
    ocrFailed: true,
    fallbackManualEntry: true,
    fallbackReason:
      "Automatic receipt OCR could not reliably read items from this image. Manual item entry is enabled.",
  };
}

/**
 * Multimodal Vision Fallback via Google Gemini 2.0 Flash (`gemini-2.0-flash`):
 * Accepts either a Cloudflare R2 HTTPS `imageUrl` (fetched on demand) or an in-memory `imageBuffer`.
 * Returns `null` cleanly if `GEMINI_API_KEY` is unconfigured or if the Vision request fails.
 */
export async function recognizeReceiptWithGeminiVision(
  options: GeminiVisionFallbackOptions
): Promise<ParsedReceiptData | null> {
  const apiKey = (options.apiKey ?? process.env.GEMINI_API_KEY ?? "").trim();
  if (!apiKey) {
    return null;
  }

  const fetchFn = options.fetchImpl ?? globalThis.fetch;
  if (typeof fetchFn !== "function") {
    return null;
  }

  const fallbackCurrency =
    options.currencyHint && options.currencyHint.trim().length === 3
      ? options.currencyHint.trim().toUpperCase()
      : "RUB";

  const controller = new AbortController();
  const timeout = setTimeout(
    () => controller.abort(),
    options.timeoutMs ?? 15_000
  );
  timeout.unref?.();

  try {
    let resolvedBuffer = options.imageBuffer;
    let resolvedMimeType = options.mimeType;

    // Fetch receipt image from Cloudflare R2 HTTPS URL when provided without an in-memory buffer
    if (
      (!resolvedBuffer || resolvedBuffer.length === 0) &&
      options.imageUrl &&
      /^https?:\/\//i.test(options.imageUrl)
    ) {
      const r2Res = await fetchFn(options.imageUrl, {
        method: "GET",
        signal: controller.signal,
      });
      if (!r2Res.ok) {
        return null;
      }
      const arr = await r2Res.arrayBuffer();
      resolvedBuffer = Buffer.from(arr);
      const headerCt = r2Res.headers.get("content-type")?.split(";")[0]?.trim();
      if (headerCt && headerCt.startsWith("image/")) {
        resolvedMimeType = headerCt;
      }
    }

    if (!resolvedBuffer || resolvedBuffer.length === 0) {
      return null;
    }

    const mimeType =
      resolvedMimeType || detectImageMimeType(resolvedBuffer, "image/jpeg");

    const promptParts: Array<Record<string, unknown>> = [
      { text: GEMINI_RECEIPT_VISION_PROMPT },
      {
        inlineData: {
          mimeType,
          data: resolvedBuffer.toString("base64"),
        },
      },
    ];

    const modelCandidates = [
      "gemini-3.8-flash",
      "gemini-2.5-flash",
      "gemini-1.5-flash",
      "gemini-2.0-flash",
    ];

    interface GeminiGenerateResponse {
      candidates?: Array<{
        content?: {
          parts?: Array<{ text?: string }>;
        };
      }>;
    }

    let payload: GeminiGenerateResponse | null = null;
    let successfulModel = "gemini-3.8-flash";

    for (const model of modelCandidates) {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;
      try {
        const geminiRes = await fetchFn(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: promptParts,
              },
            ],
            generationConfig: {
              temperature: 0.1,
              responseMimeType: "application/json",
            },
          }),
          signal: controller.signal,
        });

        if (geminiRes.ok) {
          payload = (await geminiRes.json()) as GeminiGenerateResponse;
          successfulModel = model;
          break;
        } else if (geminiRes.status !== 404) {
          const errText = await geminiRes.text();
          console.warn(`[@Splittel] Gemini Vision API HTTP ${geminiRes.status} on ${model}:`, errText.slice(0, 160));
          break;
        }
      } catch (callErr) {
        if ((callErr as Error)?.name === "AbortError") throw callErr;
        // try next model candidate on transient error
      }
    }

    if (!payload) {
      return null;
    }

    const rawJsonText = (
      payload.candidates?.[0]?.content?.parts
        ?.map((p) => p.text ?? "")
        .join("") ?? ""
    )
      .trim()
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    if (!rawJsonText) {
      return null;
    }

    const parsedJson = JSON.parse(rawJsonText) as {
      title?: string;
      restaurant_name?: string;
      currency?: string;
      tax?: number;
      tax_amount?: number;
      total?: number;
      grand_total?: number;
      items?: Array<{
        name?: string;
        item_name?: string;
        price?: number | string;
        quantity?: number | string;
      }>;
    };

    const rawItems = Array.isArray(parsedJson.items) ? parsedJson.items : [];
    const items: RawReceiptItem[] = [];

    for (const entry of rawItems) {
      const cleanName = normalizeQuotesAndBidi(
        String(entry.name ?? entry.item_name ?? "")
      )
        .replace(/\s+/g, " ")
        .trim();
      const rawPrice = Number(
        typeof entry.price === "string"
          ? entry.price.replace(",", ".")
          : entry.price
      );
      const rawQty = Math.max(
        1,
        Math.round(Number(entry.quantity ?? 1) || 1)
      );

      if (!cleanName || !Number.isFinite(rawPrice) || rawPrice <= 0) {
        continue;
      }

      items.push({
        item_name: cleanName,
        price: Number(rawPrice.toFixed(2)),
        quantity: rawQty,
      });
    }

    if (items.length === 0) {
      return null;
    }

    // Resolve ISO 4217 currency accurately (handling "ILS", "NIS", "₪", "ש״ח", etc.)
    const rawCurrencyToken = String(parsedJson.currency ?? "").trim();
    let currencyDetails: CurrencyDetectionResult;
    if (/^[A-Za-z]{3}$/.test(rawCurrencyToken)) {
      const upper = rawCurrencyToken.toUpperCase();
      const normalizedIso = upper === "NIS" ? "ILS" : upper;
      currencyDetails = {
        currency: normalizedIso,
        tier: 2,
        confidence: 0.96,
        reason: `Gemini 2.0 Flash Vision currency extraction (${normalizedIso})`,
      };
    } else {
      const syntheticContext = [
        rawCurrencyToken,
        parsedJson.title ?? parsedJson.restaurant_name ?? "",
        ...items.map((i) => i.item_name),
      ].join(" ");
      currencyDetails = detectCurrencyDetails(syntheticContext, fallbackCurrency);
    }

    const detectedCurrency = currencyDetails.currency;
    const rawTax = Number(parsedJson.tax ?? parsedJson.tax_amount ?? 0);
    const rawTotal = Number(parsedJson.total ?? parsedJson.grand_total ?? 0);
    const itemsSubtotal = items.reduce(
      (sum, it) => sum + it.price * (it.quantity ?? 1),
      0
    );

    let taxAmount = 0;
    if (Number.isFinite(rawTax) && rawTax > 0) {
      // Israeli menu prices already include 17%/18% VAT (מע"מ)
      const vatAlreadyIncluded =
        detectedCurrency === "ILS" &&
        rawTotal > 0 &&
        Math.abs(itemsSubtotal - rawTotal) <= Math.max(1.5, rawTotal * 0.02);
      if (!vatAlreadyIncluded) {
        taxAmount = Number(rawTax.toFixed(2));
      }
    }

    const titleCandidate = normalizeQuotesAndBidi(
      String(parsedJson.title ?? parsedJson.restaurant_name ?? "")
    ).trim();

    const synthesizedRawText = items
      .map(
        (it) =>
          `${(it.quantity ?? 1) > 1 ? `${it.quantity} x ` : ""}${it.item_name} ${it.price.toFixed(2)}`
      )
      .join("\n");

    return {
      title: titleCandidate || undefined,
      rawText: synthesizedRawText,
      items,
      taxAmount,
      detectedCurrency,
      currencyDetails,
      ocrConfidence: 98,
      ocrLanguage: successfulModel,
      ocrEngine: "gemini-3.8-flash",
      fallbackManualEntry: false,
    };
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Runs high-accuracy multilingual OCR (`heb+eng` and `rus+eng`) on a receipt image buffer
 * with automatic fallback to Gemini 2.0 Flash Multimodal Vision (`gemini-2.0-flash`) when
 * confidence < 70% or Hebrew/complex receipt price extraction fails, and graceful manual-entry
 * fallback if both engines cannot read a blurry image.
 */
export async function recognizeReceiptImage(
  imageBuffer: Buffer,
  options: {
    timeoutMs?: number;
    languages?: string;
    currencyHint?: string;
    imageUrl?: string | null;
    clientOcrConfidence?: number;
    clientOcrText?: string;
    geminiApiKey?: string;
    fetchImpl?: typeof fetch;
  } = {}
): Promise<ParsedReceiptData> {
  const timeoutMs = options.timeoutMs ?? 25_000;
  const fallbackCurrency =
    options.currencyHint && options.currencyHint.trim().length === 3
      ? options.currencyHint.trim().toUpperCase()
      : "RUB";

  const hasBuffer = Boolean(imageBuffer && imageBuffer.length > 0);
  const hasImageUrl = Boolean(
    options.imageUrl && /^https?:\/\//i.test(options.imageUrl)
  );

  if (!hasBuffer && !hasImageUrl) {
    return createManualFallbackReceipt(fallbackCurrency);
  }

  // 1. PRIMARY ENGINE: Google Gemini 2.0 Flash Multimodal Vision
  // When GEMINI_API_KEY is configured, invoke Gemini 2.0 Flash Vision FIRST.
  // Gemini 2.0 Flash is a 2026 state-of-the-art vision model that accurately distinguishes Russian (Cyrillic),
  // Hebrew (RTL), and English receipts without script confusion or hallucinated characters.
  const effectiveGeminiKey = (
    options.geminiApiKey ??
    process.env.GEMINI_API_KEY ??
    ""
  ).trim();

  if (effectiveGeminiKey) {
    const visionParsed = await recognizeReceiptWithGeminiVision({
      imageBuffer: hasBuffer ? imageBuffer : undefined,
      imageUrl: options.imageUrl,
      currencyHint: fallbackCurrency,
      apiKey: effectiveGeminiKey,
      fetchImpl: options.fetchImpl,
      timeoutMs: Math.min(timeoutMs, 15_000),
    });
    if (visionParsed && visionParsed.items.length > 0) {
      return visionParsed;
    }
  }

  // If only a Cloudflare R2 URL was supplied without an in-memory buffer, and Gemini returned no items
  if (!hasBuffer && hasImageUrl) {
    return createManualFallbackReceipt(fallbackCurrency);
  }

  // 2. OFFLINE / FALLBACK ENGINE: Local Tesseract v7 LSTM Workers
  const candidateLangs = options.languages
    ? [options.languages]
    : ["rus+eng", "heb+eng"];

  let timer: ReturnType<typeof setTimeout> | undefined;
  let tesseractResult: ParsedReceiptData | null = null;

  try {
    const recognitionFlow = (async (): Promise<ParsedReceiptData> => {
      const standardBuf = await preprocessReceiptImageForOcr(
        imageBuffer,
        "standard"
      );

      const pass1Results = await Promise.all(
        candidateLangs.map(async (langs) => {
          const res = await runPooledRecognition(standardBuf, langs, "4");
          const parsed = parseReceiptText(res.text, fallbackCurrency);
          const score = scoreOcrCandidate(
            langs,
            res.text,
            res.confidence,
            parsed,
            fallbackCurrency
          );
          return { langs, res, parsed, score };
        })
      );

      pass1Results.sort((a, b) => b.score - a.score);
      let best = pass1Results[0]!;

      // Pass 2 Fallback: if zero items were parsed on Pass 1, retry with high-contrast enhancement & PSM.SINGLE_BLOCK
      if (best.parsed.items.length === 0) {
        const highContrastBuf = await preprocessReceiptImageForOcr(
          imageBuffer,
          "high_contrast"
        );
        const pass2Results = await Promise.all(
          candidateLangs.map(async (langs) => {
            const res = await runPooledRecognition(highContrastBuf, langs, "6");
            const parsed = parseReceiptText(res.text, fallbackCurrency);
            const score = scoreOcrCandidate(
              langs,
              res.text,
              res.confidence,
              parsed,
              fallbackCurrency
            );
            return { langs, res, parsed, score };
          })
        );
        pass2Results.sort((a, b) => b.score - a.score);
        if (pass2Results[0] && pass2Results[0].score > best.score) {
          best = pass2Results[0];
        }
      }

      const finalParsed =
        best.langs === "heb+eng"
          ? await refineHebrewDishNamesIfNoisy(standardBuf, best.parsed)
          : best.parsed;

      return {
        ...finalParsed,
        ocrConfidence: best.res.confidence,
        ocrLanguage: best.langs,
        ocrEngine: "tesseract",
        ...(finalParsed.items.length === 0 ? { ocrFailed: true } : {}),
        fallbackManualEntry: finalParsed.items.length === 0,
      };
    })();

    const timeoutPromise = new Promise<ParsedReceiptData>((_, reject) => {
      timer = setTimeout(
        () => reject(new Error("OCR timeout exceeded")),
        timeoutMs
      );
    });

    tesseractResult = await Promise.race([recognitionFlow, timeoutPromise]);
  } catch {
    await Promise.all(candidateLangs.map((l) => evictOcrWorker(l)));
    tesseractResult = null;
  } finally {
    if (timer) clearTimeout(timer);
  }

  // If Tesseract extracted usable items, return them
  if (tesseractResult && tesseractResult.items.length > 0) {
    const { ocrFailed: _ignored, ...cleanTesseract } = tesseractResult;
    return {
      ...cleanTesseract,
      fallbackManualEntry: false,
    };
  }

  // Both Gemini Vision and Tesseract failed to read items -> return structured manual-entry fallback
  return createManualFallbackReceipt(
    fallbackCurrency,
    tesseractResult ?? undefined
  );
}
