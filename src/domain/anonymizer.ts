import type { NextFunction, Request, Response } from "express";

/**
 * GDPR & Privacy-Compliant PII Anonymization Pipeline for @Splittel.
 *
 * Strips all personally identifiable information (personal names, assignment tags,
 * credit card PANs, bank accounts, phone numbers, emails, and fiscal markers
 * such as ФН/ФД/ФП/ИНН/КПП/Tax IDs) before persisting crowdsourced dish records
 * into `receipt_items`.
 */

export type DbItemCategory =
  | "mains"
  | "drinks"
  | "desserts"
  | "starters"
  | "other";

export interface GeoPoint {
  lat: number;
  lng: number;
}

export interface SanitizedDishRecord {
  restaurant_name: string | null;
  geo_location: GeoPoint | null;
  item_name_clean: string;
  category: DbItemCategory;
  price_cents: bigint;
  currency: string;
}

// Common culinary names that must NOT be stripped when part of a dish title
const CULINARY_PROTECTED_PHRASES: Array<{ pattern: RegExp; placeholder: string; restore: string }> = [
  { pattern: /пицц[аыуеой]*\s+маргарит[аыуеой]*/gi, placeholder: "__DISH_PIZZA_MARGARITA__", restore: "Пицца Маргарита" },
  { pattern: /коктейл[ьяюем]*\s+маргарит[аыуеой]*/gi, placeholder: "__DISH_COCKTAIL_MARGARITA__", restore: "Коктейль Маргарита" },
  { pattern: /pizza\s+margherita/gi, placeholder: "__DISH_MARGHERITA_EN__", restore: "Pizza Margherita" },
  { pattern: /салат\s+цезар[ьяюем]*/gi, placeholder: "__DISH_CAESAR_SALAD__", restore: "Салат Цезарь" },
  { pattern: /цезар[ья]\s+с\s+/gi, placeholder: "__DISH_CAESAR_WITH__", restore: "Цезарь с " },
  { pattern: /caesar\s+salad/gi, placeholder: "__DISH_CAESAR_EN__", restore: "Caesar Salad" },
  { pattern: /анн[аы]\s+павлов[аыой]*/gi, placeholder: "__DISH_ANNA_PAVLOVA__", restore: "Анна Павлова" },
];

// Personal first names (Russian, English, Hebrew transliterated) commonly used in check splits
const COMMON_PERSONAL_NAMES = [
  // Russian names & diminutives (nominative + common oblique forms)
  "саша", "саши", "саше", "сашу", "александр", "александра",
  "маша", "маши", "маше", "машу", "мария", "марии",
  "дима", "димы", "диме", "диму", "дмитрий", "дмитрия",
  "андрей", "андрея", "андрею",
  "алексей", "алексея", "леша", "лёша",
  "иван", "ивана", "ваня", "вани",
  "ольга", "ольги", "оля", "оли",
  "анна", "анны", "аня", "ани",
  "елена", "елены", "лена", "лены",
  "катя", "кати", "екатерина",
  "наташа", "наташи", "наталья",
  "сергей", "сергея", "сережа", "серёжа",
  "максим", "максима", "макс",
  "даня", "дани", "даниил", "данила",
  "илья", "ильи",
  "юля", "юли", "юлия",
  "паша", "паши", "павел",
  "миша", "миши", "михаил",
  "вова", "вовы", "владимир",
  "женя", "жени", "евгений", "евгения",
  "костя", "константин",
  "кирилл", "кирилла",
  "артем", "артём", "артема",
  "никита", "никиты",
  "денис", "дениса",
  "антон", "антона",
  "игорь", "игоря",
  "роман", "романа", "рома",
  "света", "светлана",
  "таня", "татьяна",
  "ира", "ирина",
  "ксюша", "ксения",
  "вика", "виктория",
  "полина", "полины",
  "алина", "алины",
  "даша", "дарья",
  // International / English / Israeli names
  "alex", "alexander", "alexandra",
  "john", "johnny",
  "maria", "mary",
  "sarah", "sara",
  "david", "dave",
  "michael", "mike",
  "daniel", "dan", "danny",
  "noa", "yael", "omer", "itay", "alon", "tamar", "maya", "yonatan", "avi", "eli",
  "alice", "bob", "chloe", "charlie", "emma", "olivia", "liam", "noah", "james", "lucas",
  // Hebrew script personal first names
  "דוד", "משה", "יוסי", "דניאל", "נועה", "יעל", "עומר", "איתי", "אלון", "תמר",
  "מאיה", "יונתן", "אבי", "אלי", "שרה", "רחל", "מיכל", "גיא", "רועי", "שירה", "ליאור",
];

function escapeRegex(literal: string): string {
  return literal.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Fiscal, banking, card PAN, and contact PII patterns
const FISCAL_AND_PAYMENT_PATTERNS: RegExp[] = [
  // Russian & English fiscal markers FIRST (before 16-digit PAN matcher consumes 16-digit ФН):
  // ФН, ФД, ФП, ФПД, ИНН, КПП, ОГРН, РН ККТ, ЗН ККТ, RRN, Auth
  /(?<=^|[^\p{L}\p{N}])(?:фн|фд|фпд?|инн|кпп|огрн|рн\s*ккт|зн\s*ккт|ккт|сно|rrn|auth(?:\s*code)?|код\s*авт\.?|терминал|terminal)\s*[:#№=-]*\s*[a-z0-9/-]+/giu,
  // International Tax / VAT / Israeli company IDs (ע.מ. / ח.פ. / עוסק מורשה / אסמכתא / VAT ID / Tax ID / TIN)
  /(?:vat\s*(?:id|no|reg)?|tax\s*id|tin|ein|עוסק\s*מורשה|ע\.?מ\.?|ח\.?פ\.?|אסמכתא|מס['׳]?\s*אישור)\s*[:#№=-]*\s*\d[\d\s-]{4,}/giu,
  // Credit / Debit card PANs (13-19 digits with optional spaces or hyphens)
  /(?:(?<=^|[^\p{L}\p{N}])(?:карта|card|pan|כרטיס)\s*[:#№=-]*\s*)?(?<!\d)(?:\d[ -]*?){13,19}(?!\d)/giu,
  // Masked card numbers: **** **** **** 1234, ****1234, *1234, Карта *4589
  /(?:карта|card|pan|visa|mastercard|maestro|мир|mir|amex|unionpay|ויזה|ישראכרט|מאסטרקארד)?\s*(?:\*{2,}|•{2,}|x{2,}|х{2,})[\s*-]*\d{2,6}/giu,
  /\*\d{4}\b/g,
  // IBAN & Russian 20-digit bank accounts (р/с, к/с, бик)
  /\b[A-Z]{2}\d{2}[A-Z0-9]{11,30}\b/g,
  /(?<=^|[^\p{L}\p{N}])(?:р\/с|к\/с|расч\.?\s*счет|корр\.?\s*счет|бик|iban|swift)\s*[:#№=-]*\s*[a-z0-9]{6,34}/giu,
  // Cashier / Waiter / Customer lines or inline tags (Russian, English, Hebrew)
  /(?<=^|[^\p{L}\p{N}])(?:кассир|официант|администратор|покупатель|клиент|гость|cashier|waiter|server|host|customer|guest|מלצר(?:ית)?|קופאי(?:ת)?|לקוח(?:ה)?|אורח(?:ת)?)\s*[:#№-]+\s*[^\n,;|]+/giu,
  // Email addresses
  /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi,
  // Phone numbers (+7..., +972..., 8 (999) ..., Israeli local 03-..., 052-...)
  /(?:\+\d{1,3}|(?<!\d)8)[\s(-]*\d{2,4}[\s)-]*\d{2,3}[\s-]*\d{2}[\s-]*\d{2}\b/g,
  /(?<!\d)0(?:[23489]|5\d|7\d)[\s-]*\d{3}[\s-]*\d{4}(?!\d)/g,
];

/**
 * Strips fiscal markers, card numbers, bank details, phones, emails, and personal names
 * from arbitrary receipt text.
 */
export function sanitizePiiText(
  input: string,
  extraPersonalNames: string[] = []
): string {
  if (!input) return "";

  let text = input;

  // 1. Protect culinary phrases containing proper nouns
  for (const item of CULINARY_PROTECTED_PHRASES) {
    text = text.replace(item.pattern, item.placeholder);
  }

  // 2. Strip fiscal, card PAN, bank account, cashier, email, and phone patterns
  for (const pattern of FISCAL_AND_PAYMENT_PATTERNS) {
    text = text.replace(pattern, " ");
  }

  // 3. Strip @handles and explicit assignment tags like "(для Саши)", "[for Alex]", "(Саша, Маша)"
  text = text.replace(/@[a-zа-яё0-9_]{2,32}/gi, " ");
  text = text.replace(
    /[\(\[\{]\s*(?:для|for|shared\s*by|заказ)?\s*[a-zа-яё,\s&+]{2,40}[\)\]\}]/gi,
    (segment) => {
      // Only strip parenthetical if it contains a personal name or "для / for", keep "(6 pcs)" or "(300 мл)"
      if (/\d/.test(segment)) return segment;
      if (/(?:для|for)\s+/i.test(segment)) return " ";
      const lowerSeg = segment.toLowerCase();
      const allNames = [...COMMON_PERSONAL_NAMES, ...extraPersonalNames.map((n) => n.toLowerCase().trim())];
      if (allNames.some((n) => n.length >= 2 && lowerSeg.includes(n))) {
        return " ";
      }
      return segment;
    }
  );

  // 4. Strip "для <Name>" / "for <Name>" phrases
  const combinedNames = Array.from(
    new Set(
      [...COMMON_PERSONAL_NAMES, ...extraPersonalNames.map((n) => n.trim().toLowerCase())]
        .filter((n) => n.length >= 2)
        .sort((a, b) => b.length - a.length)
    )
  );

  if (combinedNames.length > 0) {
    const alternation = combinedNames.map(escapeRegex).join("|");
    // Explicit prepositions: "для Саши", "for Alex", "от Андрея"
    const prepRegex = new RegExp(
      `(?<=^|[^\\p{L}\\p{N}])(?:для|for|от|by)\\s+(?:${alternation})(?=$|[^\\p{L}\\p{N}])`,
      "giu"
    );
    text = text.replace(prepRegex, " ");

    // Standalone personal names surrounded by non-letter boundaries (Unicode-aware)
    const nameRegex = new RegExp(
      `(?<=^|[^\\p{L}\\p{N}])(?:${alternation})(?=$|[^\\p{L}\\p{N}])`,
      "giu"
    );
    text = text.replace(nameRegex, " ");
  }

  // 5. Restore protected culinary phrases
  for (const item of CULINARY_PROTECTED_PHRASES) {
    text = text.replaceAll(item.placeholder, item.restore);
  }

  // 6. Clean leftover punctuation artifacts (leading/trailing colons, dashes, extra spaces)
  text = text
    .replace(/\(\s*\)|\[\s*\]|\{\s*\}/g, " ")
    .replace(/(?:^|\s)[—–\-:]+\s*(?=$|\s)/g, " ")
    .replace(/^[—–\-:,.;•*#\s]+|[—–\-:,.;\s]+$/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();

  return text;
}

/**
 * Normalizes a raw OCR dish line into a clean, PII-free canonical dish name.
 */
export function cleanDishName(
  rawItemName: string,
  participantNames: string[] = []
): string {
  if (!rawItemName) return "Dish";

  // Remove leading line numbers or quantity prefixes ("1. ", "2 x ", "3 шт ")
  let cleaned = rawItemName
    .replace(/^\s*\d+[.)]\s*/, "")
    .replace(/^\s*\d+\s*(?:x|\*|шт\.?|порц\.?)\s+/i, "")
    .trim();

  // Remove trailing price/currency fragments if accidentally left in raw OCR string
  cleaned = cleaned.replace(
    /\s+\d{1,6}(?:[.,]\d{1,2})?\s*(?:₪|₽|€|\$|฿|₺|₸|£|₾|ils|nis|rub|usd|eur|thb|try|aed|kzt|руб\.?|ש״ח|שח)\s*$/i,
    ""
  );

  cleaned = sanitizePiiText(cleaned, participantNames);

  return cleaned || "Menu Item";
}

/**
 * Classifies a cleaned dish name into the PostgreSQL `item_category` enum:
 * ('mains', 'drinks', 'desserts', 'starters', 'other').
 */
export function classifyReceiptItemCategory(
  dishName: string
): DbItemCategory {
  const lower = dishName.toLowerCase();

  // Drinks
  if (
    /пиво|вино|кофе|капучино|латте|эспрессо|американо|раф|чай|лимонад|коктейль|кола|сок|вода|морс|сидр|апероль|beer|wine|coffee|cappuccino|latte|espresso|tea|lemonade|cocktail|cola|soda|juice|water|cider|aperol|goldstar|maccabee|smoothie|קפה|הפוך|קפוצ['׳]?ינו|אספרסו|אמריקנו|לאטה|נס\s*קפה|תה|לימונדה|לימונענע|מיץ|תפוזים|מים|סודה|קולה|זירו|ספרייט|בירה|גולדסטאר|מכבי|טובורג|קרלסברג|יין|קוקטייל|שייק|סמוזי/iu.test(
      lower
    )
  ) {
    return "drinks";
  }

  // Desserts
  if (
    /чизкейк|десерт|торт|мороженое|тирамису|малаби|пахлава|эклер|брауни|медовик|наполеон|павлова|круассан|dessert|cheesecake|cake|ice\s*cream|tiramisu|malabi|baklava|knafeh|kunefe|brownie|pastry|gelato|עוגה|עוגת|קינוח|גלידה|מלבי|בקלאווה|כנאפה|טירמיסו|בראוניז|סופלה|וופל|פנקייק|קרפ|קוראסון|קרואסון|רוגלך|מאפה/iu.test(
      lower
    )
  ) {
    return "desserts";
  }

  // Starters / Salads / Appetizers
  if (
    /салат|цезарь|греческ|брускетт|тартар|карпаччо|тхин|тахин|закуск|мезе|фалафел.*6|фри|картофел.*фри|пита|хлеб|эдамаме|суп\s*дня|salad|caesar|bruschetta|tartare|carpaccio|tahini|mezze|starter|appetizer|fries|pita|edamame|סלט|טחינה|לאבנה|חציל|כרובית|ברוסקטה|קרפצ['׳]?יו|טרטר|צ['׳]?יפס|פיתה|פוקאצ['׳]?ה|לחם|מזטים|אדממה|מרק/iu.test(
      lower
    )
  ) {
    return "starters";
  }

  // Mains
  if (
    /стейк|рибай|мясо|шашлык|бургер|говядин|телятин|куриц|цыплен|утк|рыба|лосос|семг|паст|карбонар|болоньез|лазань|пицц|ризотт|том\s*ям|пад\s*тай|суши|ролл|вок|рамен|фо\s*бо|хачапури|хинкали|хумус|шакшук|фалафел|шаварм|шаурм|сабих|кебаб|донер|плов|котлет|бефстроганов|steak|ribeye|beef|burger|chicken|salmon|fish|pizza|pasta|risotto|tom\s*yum|pad\s*thai|sushi|ramen|shakshuka|shakshouka|hummus|falafel|shawarma|sabich|kebab|doner|schnitzel|שקשוקה|חומוס|פלאפל|שווארמה|סביח|שניצל|המבורגר|בורגר|סטייק|אנטריקוט|סינטה|פילה|פרגית|עוף|קבב|שיפוד|דג|סלמון|דניס|לברק|פיצה|פסטה|רביולי|ניוקי|ריזוטו|מוקפץ|נודלס|סושי|ראמן|כריך|סנדוויץ|טוסט|חביתה/iu.test(
      lower
    )
  ) {
    return "mains";
  }

  return "other";
}

/**
 * Sanitizes restaurant name to ensure no cashier/fiscal/card PII leaks into `restaurant_name`.
 */
export function sanitizeRestaurantName(
  rawRestaurantName?: string | null,
  participantNames: string[] = []
): string | null {
  if (!rawRestaurantName) return null;
  const cleaned = sanitizePiiText(rawRestaurantName, participantNames);
  if (
    !cleaned ||
    /^(?:чек|кассовый\s*чек|receipt|bill|invoice|חשבונית(?:\s*מס)?(?:\s*קבלה)?|קבלה|העתק(?:\s*נאמן\s*למקור)?)$/iu.test(
      cleaned
    )
  ) {
    return null;
  }
  return cleaned.slice(0, 120);
}

/**
 * Converts float currency price to exact integer cents/kopecks/agorot as `bigint`.
 */
export function toPriceCentsBigInt(price: number): bigint {
  if (!Number.isFinite(price) || price < 0) {
    return 0n;
  }
  return BigInt(Math.round(price * 100));
}

/**
 * Validates geographic coordinates (WGS84 SRID 4326) and strips invalid points.
 */
export function normalizeGeoPoint(
  geo?: { lat?: number; lng?: number } | null
): GeoPoint | null {
  if (!geo || typeof geo.lat !== "number" || typeof geo.lng !== "number") {
    return null;
  }
  if (
    !Number.isFinite(geo.lat) ||
    !Number.isFinite(geo.lng) ||
    geo.lat < -90 ||
    geo.lat > 90 ||
    geo.lng < -180 ||
    geo.lng > 180
  ) {
    return null;
  }
  // Round to ~11m street-block precision (~4 decimal places) to prevent home-exact fingerprinting
  return {
    lat: Number(geo.lat.toFixed(4)),
    lng: Number(geo.lng.toFixed(4)),
  };
}

/**
 * Main GDPR Anonymization Pipeline:
 * Transforms parsed receipt items into strictly anonymized records suitable for
 * storage in `receipt_items` (`{ restaurant_name, geo_location, item_name_clean, category, price_cents, currency }`).
 */
export function anonymizeReceiptForIndex(params: {
  restaurant_name?: string | null;
  geo_location?: { lat?: number; lng?: number } | null;
  currency: string;
  items: Array<{ item_name: string; price: number }>;
  participant_names?: string[];
}): SanitizedDishRecord[] {
  const participants = params.participant_names ?? [];
  const safeRestaurant = sanitizeRestaurantName(
    params.restaurant_name,
    participants
  );
  const safeGeo = normalizeGeoPoint(params.geo_location);
  const safeCurrency = (params.currency || "RUB").trim().toUpperCase().slice(0, 8);

  const output: SanitizedDishRecord[] = [];

  for (const rawItem of params.items) {
    if (!rawItem || typeof rawItem.price !== "number" || rawItem.price <= 0) {
      continue;
    }

    const itemClean = cleanDishName(rawItem.item_name, participants);
    // Skip lines that turned out to be purely fiscal metadata
    if (!itemClean || itemClean === "Menu Item") {
      if (!/[a-zа-яёא-ת]/i.test(itemClean)) continue;
    }

    const category = classifyReceiptItemCategory(itemClean);
    const priceCents = toPriceCentsBigInt(rawItem.price);

    output.push({
      restaurant_name: safeRestaurant,
      geo_location: safeGeo,
      item_name_clean: itemClean,
      category,
      price_cents: priceCents,
      currency: safeCurrency,
    });
  }

  return output;
}

declare global {
  namespace Express {
    interface Request {
      anonymizedReceiptRecords?: SanitizedDishRecord[];
    }
  }
}

/**
 * Express Middleware: Automatically runs PII sanitization on incoming receipt/bill payloads
 * (`req.body.raw_items`) and attaches `req.anonymizedReceiptRecords` for safe downstream logging,
 * while also scrubbing fiscal/card numbers from `req.body.title`.
 */
export function piiAnonymizationMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  if (req.body && typeof req.body === "object") {
    const body = req.body as {
      title?: string;
      currency?: string;
      people?: string[];
      geo_location?: { lat?: number; lng?: number };
      lat?: number;
      lng?: number;
      raw_items?: Array<{ item_name: string; price: number }>;
    };

    const participantNames = Array.isArray(body.people)
      ? body.people.filter((p): p is string => typeof p === "string")
      : [];

    if (typeof body.title === "string") {
      // Strip accidental card digits or fiscal numbers from title while keeping normal title
      const scrubbedTitle = sanitizePiiText(body.title, []);
      if (scrubbedTitle) {
        body.title = scrubbedTitle;
      }
    }

    if (Array.isArray(body.raw_items) && body.raw_items.length > 0) {
      const geo =
        body.geo_location ??
        (typeof body.lat === "number" && typeof body.lng === "number"
          ? { lat: body.lat, lng: body.lng }
          : null);

      req.anonymizedReceiptRecords = anonymizeReceiptForIndex({
        restaurant_name: body.title,
        geo_location: geo,
        currency: body.currency ?? "RUB",
        items: body.raw_items,
        participant_names: participantNames,
      });
    }
  }
  next();
}
