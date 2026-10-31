import { randomUUID } from "node:crypto";
import QRCode from "qrcode";
import { fromCents, toCents } from "./billSplitter.js";
import { normalizeCurrency, resolveExchangeRate } from "./fxConverter.js";
import type { PaymentCard, SettlementTransfer } from "./types.js";

function handleSlug(name: string): string {
  return (
    name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9а-яё]+/gi, "")
      .slice(0, 20) || "user"
  );
}

export interface GeneratePaymentCardsOptions {
  settlements: SettlementTransfer[];
  baseUrl: string;
  currency?: string;
  settlement_currency?: string;
  exchange_rate?: number;
}

/**
 * Generates final debt breakdown cards, SBP (Система Быстрых Платежей) & Stripe
 * payment links, custom payment_link overrides, multi-currency FX conversion
 * (e.g. EUR -> RUB), and ISO SVG QR codes.
 */
export async function generatePaymentCards(
  options: GeneratePaymentCardsOptions
): Promise<PaymentCard[]> {
  const sourceDefaultCurrency = normalizeCurrency(options.currency, "RUB");
  const cleanBaseUrl = options.baseUrl.replace(/\/+$/, "");
  const cards: PaymentCard[] = [];

  for (const row of options.settlements) {
    const origCurrency = normalizeCurrency(row.currency, sourceDefaultCurrency);
    const fx = resolveExchangeRate({
      fromCurrency: origCurrency,
      toCurrency: options.settlement_currency ?? origCurrency,
      explicitRate: options.exchange_rate,
    });

    const origCents = toCents(row.amount);
    if (origCents <= 0) continue;

    const settledCents = Math.round(origCents * fx.rate);
    const originalAmount = fromCents(origCents);
    const normalizedAmount = fromCents(settledCents);
    const targetCurrency = fx.to_currency;
    const amountFixed = normalizedAmount.toFixed(2);

    const shortId = randomUUID().replace(/-/g, "").slice(0, 10);
    const creditorHandle = handleSlug(row.creditor);
    const debtorHandle = handleSlug(row.debtor);
    const transactionId = `txn_card_${shortId}_${debtorHandle}_to_${creditorHandle}`;

    const fxNote =
      origCurrency !== targetCurrency
        ? ` (${origCurrency} ${originalAmount.toFixed(2)} @ ${fx.rate})`
        : "";
    const memo = `Splittel: ${row.debtor} -> ${row.creditor} (${targetCurrency} ${amountFixed}${fxNote})`;

    const splittelPayUrl = `${cleanBaseUrl}/pay/${encodeURIComponent(transactionId)}`;
    const sbpUrl = `https://qr.nspk.ru/${shortId.toUpperCase()}?type=02&sum=${settledCents}&cur=${targetCurrency}&crc=AB12`;
    const stripePaymentUrl = `https://checkout.stripe.com/c/pay/${encodeURIComponent(transactionId)}?amount=${settledCents}&currency=${targetCurrency.toLowerCase()}`;
    const primaryPaymentUrl =
      row.payment_link && row.payment_link.trim().length > 0
        ? row.payment_link.trim()
        : sbpUrl;

    const qrCodeSvg = await QRCode.toString(primaryPaymentUrl, {
      type: "svg",
      margin: 1,
      width: 192,
      color: {
        dark: "#0f172a",
        light: "#ffffff",
      },
    });

    const qrCodeDataUri = `data:image/svg+xml;base64,${Buffer.from(qrCodeSvg, "utf-8").toString("base64")}`;

    cards.push({
      transaction_id: transactionId,
      debtor: row.debtor,
      creditor: row.creditor,
      original_amount: originalAmount,
      original_currency: origCurrency,
      amount: normalizedAmount,
      currency: targetCurrency,
      exchange_rate: fx.rate,
      status: "PENDING",
      memo,
      links: {
        primary_payment_url: primaryPaymentUrl,
        splittel_pay_url: splittelPayUrl,
        sbp_url: sbpUrl,
        stripe_payment_url: stripePaymentUrl,
      },
      qr_code_data_uri: qrCodeDataUri,
      qr_code_svg: qrCodeSvg,
      created_at: new Date().toISOString(),
    });
  }

  return cards;
}
