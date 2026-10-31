/**
 * Multi-Currency FX Engine for @Splittel.
 *
 * Reference rates expressed in RUB per 1 unit of currency (used offline / deterministic fallback),
 * allowing seamless cross-pair conversion between any two ISO 4217 currencies
 * (e.g. EUR -> RUB, USD -> RUB, THB -> RUB, TRY -> EUR) with explicit `exchange_rate` override.
 */
const RUB_PER_UNIT_FALLBACK: Record<string, number> = {
  RUB: 1,
  EUR: 105.0,
  USD: 96.5,
  GBP: 124.0,
  CHF: 111.0,
  ILS: 26.5,
  AED: 26.28,
  TRY: 2.82,
  THB: 2.85,
  GEL: 35.4,
  CNY: 13.45,
  JPY: 0.64,
  KZT: 0.2,
  AMD: 0.25,
  BYN: 29.5,
  RSD: 0.9,
};

export interface ResolvedFxRate {
  from_currency: string;
  to_currency: string;
  rate: number;
  source: "Identity" | "UserOverride" | "ReferenceTable";
}

export function normalizeCurrency(code?: string, fallback = "RUB"): string {
  const clean = (code ?? fallback).trim().toUpperCase();
  return clean.length === 3 ? clean : fallback;
}

/**
 * Resolves the conversion multiplier `rate` such that:
 *   amount_in_to_currency = amount_in_from_currency * rate
 */
export function resolveExchangeRate(options: {
  fromCurrency?: string;
  toCurrency?: string;
  explicitRate?: number;
}): ResolvedFxRate {
  const from = normalizeCurrency(options.fromCurrency, "RUB");
  const to = normalizeCurrency(options.toCurrency, from);

  if (from === to) {
    return {
      from_currency: from,
      to_currency: to,
      rate: 1,
      source: "Identity",
    };
  }

  if (options.explicitRate !== undefined && options.explicitRate > 0) {
    return {
      from_currency: from,
      to_currency: to,
      rate: Number(options.explicitRate.toFixed(6)),
      source: "UserOverride",
    };
  }

  const fromInRub = RUB_PER_UNIT_FALLBACK[from];
  const toInRub = RUB_PER_UNIT_FALLBACK[to];

  if (fromInRub !== undefined && toInRub !== undefined && toInRub > 0) {
    return {
      from_currency: from,
      to_currency: to,
      rate: Number((fromInRub / toInRub).toFixed(6)),
      source: "ReferenceTable",
    };
  }

  throw new Error(
    `Unsupported currency pair ${from} -> ${to} without explicit exchange_rate parameter.`
  );
}

