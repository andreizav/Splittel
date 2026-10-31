import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { ParsedBillBoard } from "../domain/types.js";

const currentDir = dirname(fileURLToPath(import.meta.url));

function loadCompiledCss(): string {
  const candidates = [
    resolve(currentDir, "compiled.css"),
    resolve(process.cwd(), "src/ui/compiled.css"),
  ];
  for (const filePath of candidates) {
    if (existsSync(filePath)) {
      return readFileSync(filePath, "utf-8");
    }
  }
  return "";
}

function escapeJsonForScriptTag(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

export interface RenderBillBoardOptions {
  bill: ParsedBillBoard | null;
  uiActionToken: string;
  apiBaseUrl: string;
  initialTheme?: "light" | "dark";
}

/**
 * Renders the mobile-first camera-native interactive HTML/JS MCP App (`ui://splittel/bill-board` & `GET /ui/bill-board`):
 * 1. Fixed/Sticky Summary Header: Total Bill amount, Subtotal, Tax, Share Link button, Currency override, and Tip selector pills (0%, 10%, 15%, Custom).
 * 2. Scrollable Itemized Interactive Matrix & Summary Cards (`100dvh` flex container with `overscroll-behavior: contain` for sandboxed iframes).
 * 3. Direct Smartphone Rear Camera Trigger (`capture="environment"`) + Prominent Sticky Bottom FAB («Сканировать чек 📷») with ripple & OCR spinner.
 */
export function renderBillBoardHtml(options: RenderBillBoardOptions): string {
  const compiledCss = loadCompiledCss();
  const themeAttr = options.initialTheme
    ? ` data-theme="${options.initialTheme === "dark" ? "dark" : "light"}"`
    : "";

  const bootstrapPayload = escapeJsonForScriptTag({
    bill: options.bill,
    uiActionToken: options.uiActionToken,
    apiBaseUrl: options.apiBaseUrl.replace(/\/+$/, ""),
  });

  const hasInitialBill = options.bill !== null;
  const initialTitle = options.bill?.title || "Splittel — Разделение чека";

  return `<!DOCTYPE html>
<html lang="ru"${themeAttr}>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <meta name="color-scheme" content="light dark">
  <title>Splittel (@Splittel) — Interactive Bill Board</title>
  <style>${compiledCss}</style>
</head>
<body class="antialiased selection:bg-emerald-500/20">
  <div class="bill-board-shell">
    <!-- 1. STICKY SUMMARY TOTALS HEADER -->
    <header aria-labelledby="bill-title" class="bill-header-dock px-3.5 py-3 sm:px-6 sm:py-3.5">
      <div class="mx-auto max-w-5xl">
        <div class="flex flex-wrap items-start justify-between gap-2.5">
          <div class="min-w-0 flex-1 space-y-1">
            <div class="flex flex-wrap items-center gap-2">
              <span class="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                <span class="inline-block h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true"></span>
                <span>@Splittel</span>
              </span>
              <button
                type="button"
                id="open-new-bill-btn"
                class="cursor-pointer rounded-full border px-2.5 py-0.5 text-xs font-semibold transition hover:opacity-80"
                style="border-color: var(--border-subtle);"
              >
                + Ввести вручную
              </button>
              <button
                type="button"
                id="copy-share-link-btn"
                class="${hasInitialBill ? "" : "hidden "}cursor-pointer rounded-full border px-2.5 py-0.5 text-xs font-medium transition hover:opacity-80"
                style="border-color: var(--border-subtle);"
              >
                Share Link
              </button>
            </div>
            <h1 id="bill-title" dir="auto" class="bidi-plaintext fluid-bill-title truncate font-bold tracking-tight">${initialTitle
              .replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")}</h1>
            <p id="bill-meta" class="secondary-copy text-xs">${
              hasInitialBill ? "" : "Наведите камеру на чек или создайте расчёт вручную"
            }</p>
          </div>

          <div id="header-metrics-wrap" class="${hasInitialBill ? "flex" : "hidden"} flex-wrap items-center gap-2 sm:gap-2.5">
            <div class="muted-panel rounded-xl border px-2.5 py-1.5 text-left" style="border-color: var(--border-subtle);">
              <label for="currency-select" class="secondary-copy block text-[10px] font-semibold uppercase tracking-wider">Валюта</label>
              <select
                id="currency-select"
                name="currency"
                class="cursor-pointer bg-transparent text-xs font-bold focus:outline-none"
              >
                <option value="RUB">RUB (₽)</option>
                <option value="ILS">ILS (₪)</option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="THB">THB (฿)</option>
                <option value="TRY">TRY (₺)</option>
                <option value="AED">AED (дирхам)</option>
                <option value="KZT">KZT (₸)</option>
                <option value="GEL">GEL (₾)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>
            <div class="muted-panel rounded-xl px-3 py-1.5 text-right">
              <div class="secondary-copy text-[10px] font-semibold uppercase tracking-wider">Total Bill</div>
              <div id="bill-grand-total" class="text-base font-extrabold tabular-nums sm:text-xl">—</div>
              <div id="bill-settlement-total" class="hidden text-[11px] font-bold tabular-nums text-emerald-600 dark:text-emerald-400"></div>
            </div>
            <div class="muted-panel rounded-xl px-2.5 py-1.5 text-right">
              <div class="secondary-copy text-[10px] font-semibold uppercase tracking-wider">Settled</div>
              <div id="bill-progress" class="text-xs font-bold tabular-nums text-emerald-600 dark:text-emerald-400 sm:text-sm">0 / 0</div>
            </div>
          </div>
        </div>

        <!-- Subtotal, Tax & Tip Selector Pills (shown when a bill is active) -->
        <div
          id="header-breakdown-bar"
          class="${hasInitialBill ? "flex" : "hidden"} mt-3 flex-wrap items-center justify-between gap-2.5 border-t pt-2.5"
          style="border-color: var(--border-subtle);"
        >
          <dl class="flex flex-wrap items-center gap-3.5 text-xs sm:text-sm">
            <div>
              <dt class="secondary-copy inline">Subtotal: </dt>
              <dd id="bill-subtotal" class="inline font-semibold tabular-nums">—</dd>
            </div>
            <div>
              <dt class="secondary-copy inline">Tax: </dt>
              <dd id="bill-tax" class="inline font-semibold tabular-nums">—</dd>
            </div>
            <div>
              <dt class="secondary-copy inline">Tip: </dt>
              <dd id="bill-tip" class="inline font-semibold tabular-nums">—</dd>
            </div>
          </dl>

          <div class="flex flex-wrap items-center gap-1.5" role="group" aria-label="Tip percentage selector">
            <span class="secondary-copy mr-0.5 text-xs font-semibold">Tip:</span>
            <button type="button" data-tip-preset="0" class="tip-pill cursor-pointer rounded-full px-3 py-1 text-xs font-bold" aria-pressed="false">0%</button>
            <button type="button" data-tip-preset="10" class="tip-pill cursor-pointer rounded-full px-3 py-1 text-xs font-bold" aria-pressed="true">10%</button>
            <button type="button" data-tip-preset="15" class="tip-pill cursor-pointer rounded-full px-3 py-1 text-xs font-bold" aria-pressed="false">15%</button>
            <button type="button" id="tip-custom-btn" class="tip-pill cursor-pointer rounded-full px-3 py-1 text-xs font-bold" aria-pressed="false">Custom</button>
            <span id="tip-custom-wrap" class="hidden items-center gap-1 text-xs font-semibold">
              <label for="tip-custom-input" class="visually-hidden">Custom tip percentage</label>
              <input
                type="number"
                id="tip-custom-input"
                name="tip_custom"
                min="0"
                max="100"
                step="1"
                value="12"
                inputmode="numeric"
                class="muted-panel w-14 rounded-lg border px-2 py-1 text-center text-xs font-bold tabular-nums"
                style="border-color: var(--border-subtle);"
              >
              <span>%</span>
            </span>
          </div>
        </div>
      </div>
    </header>

    <!-- 2. SCROLLABLE CONTENT CONTAINER (Smooth nested scroll inside Gemini/Search sandboxed iframes) -->
    <main id="app-root" class="bill-scroll-area px-3.5 py-4 sm:px-6 sm:py-5">
      <div class="mx-auto max-w-5xl space-y-4">
        <!-- Live Status Banner -->
        <div
          id="status-banner"
          role="status"
          aria-live="polite"
          class="hidden rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-xs font-medium text-emerald-800 dark:text-emerald-200"
        ></div>

        <!-- Empty State when no check has been scanned yet -->
        <section
          id="empty-bill-state"
          aria-labelledby="empty-state-heading"
          class="${hasInitialBill ? "hidden " : ""}surface-card rounded-2xl border px-5 py-8 text-center shadow-xs sm:px-8 sm:py-12"
        >
          <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/15 text-2xl" aria-hidden="true">
            📷
          </div>
          <h2 id="empty-state-heading" class="mt-4 text-base font-bold sm:text-lg">
            Отсканируйте бумажный чек одним нажатием
          </h2>
          <p class="secondary-copy mx-auto mt-1.5 max-w-md text-xs leading-relaxed sm:text-sm">
            Нажмите кнопку <strong>«Сканировать чек 📷»</strong> внизу экрана — откроется основная камера смартфона, а позиции, валюта и НДС распознаются автоматически.
          </p>
          <div class="mt-5 flex flex-wrap items-center justify-center gap-2.5">
            <button
              type="button"
              id="empty-manual-bill-btn"
              class="muted-panel cursor-pointer rounded-xl border px-4 py-2.5 text-xs font-bold transition hover:opacity-85"
              style="border-color: var(--border-subtle);"
            >
              Заполнить позиции вручную
            </button>
          </div>
        </section>

        <!-- Active Bill Sections -->
        <div id="active-bill-sections" class="${hasInitialBill ? "" : "hidden "}space-y-4">
          <!-- Itemized Interactive Matrix (Left: Dishes & Prices | Right: Avatar Selection Chips) -->
          <section
            aria-labelledby="matrix-heading"
            class="surface-card rounded-2xl border px-4 py-4 shadow-xs sm:px-5"
          >
            <div class="mb-3 flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 id="matrix-heading" class="text-sm font-bold sm:text-base">Itemized Check Matrix</h2>
                <p class="secondary-copy text-xs">Tap avatar chips to toggle who shared each item.</p>
              </div>
            </div>
            <div id="dish-matrix-list" class="divide-y" style="border-color: var(--border-subtle);"></div>
          </section>

          <!-- Summary Cards per Person -->
          <section aria-labelledby="summary-cards-heading" class="space-y-3">
            <h2 id="summary-cards-heading" class="text-sm font-bold sm:text-base">Summary per Person</h2>
            <div id="cards-grid" class="check-matrix-grid"></div>
          </section>

          <!-- Native Contextual Recommendation & CPA Comparison Card (strictly live data; hidden if null) -->
          <section
            id="native-promo-card"
            aria-label="Контекстные рекомендации и сравнение цен"
            class="hidden surface-card rounded-2xl border p-4 shadow-xs transition sm:p-5"
            style="border-color: var(--border-subtle);"
          ></section>
        </div>
      </div>
    </main>

    <!-- 3. STICKY BOTTOM CAMERA FLOATING ACTION BUTTON (FAB) + DIRECT REAR CAMERA INPUT -->
    <div class="fab-dock" role="region" aria-label="Сканирование бумажного чека">
      <label for="receipt-file-input" class="visually-hidden">Сканировать чек камерой</label>
      <input
        type="file"
        id="receipt-file-input"
        name="receipt_photo"
        accept="image/*"
        capture="environment"
        class="visually-hidden"
      >
      <button
        type="button"
        id="scan-receipt-fab"
        class="scan-camera-fab"
        data-loading="false"
      >
        <span id="scan-fab-spinner" class="ocr-spinner hidden" aria-hidden="true"></span>
        <span id="scan-fab-text">Сканировать чек 📷</span>
      </button>
    </div>
  </div>

  <!-- Light-Dismiss Upload Receipt / New Bill Dialog -->
  <dialog
    id="new-bill-dialog"
    closedby="any"
    aria-labelledby="new-bill-title"
    class="splittel-modal m-auto w-[min(94vw,34rem)] rounded-2xl p-5 shadow-2xl"
  >
    <div class="flex items-start justify-between gap-2 border-b pb-3" style="border-color: var(--border-subtle);">
      <div>
        <div class="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Новый чек</div>
        <h2 id="new-bill-title" class="mt-0.5 text-base font-bold">Сканирование и расчёт чека</h2>
      </div>
      <form method="dialog">
        <button
          type="submit"
          aria-label="Закрыть окно"
          class="muted-panel cursor-pointer rounded-lg px-2.5 py-1.5 text-xs font-bold hover:opacity-80"
        >
          ✕
        </button>
      </form>
    </div>

    <form id="new-bill-form" action="/api/bills/new" method="POST" class="mt-4 space-y-4 text-xs" novalidate>
      <!-- Camera CTA + Optional Gallery Picker inside modal -->
      <div class="flex flex-wrap items-center gap-2.5">
        <button
          type="button"
          id="modal-camera-trigger-btn"
          class="cursor-pointer inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-emerald-500 active:scale-95"
        >
          <span aria-hidden="true">📷</span>
          <span>Сфотографировать чек</span>
        </button>

        <div>
          <label
            for="receipt-gallery-input"
            class="muted-panel cursor-pointer inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2.5 text-xs font-semibold transition hover:opacity-85"
            style="border-color: var(--border-subtle);"
          >
            <span>Выбрать из галереи / файла</span>
          </label>
          <input
            type="file"
            id="receipt-gallery-input"
            name="receipt_gallery_photo"
            accept="image/*"
            class="visually-hidden"
          >
        </div>
      </div>

      <!-- Image Preview Thumbnail + OCR Spinner (hidden until photo taken/selected) -->
      <div id="receipt-preview-wrap" class="hidden rounded-xl border p-2.5 text-center" style="border-color: var(--border-subtle);">
        <div class="receipt-preview-frame muted-panel rounded-lg">
          <img
            id="receipt-preview-img"
            src="data:image/gif;base64,R0lGODlhAQABAAAAACw="
            alt="Предпросмотр фото чека"
            class="block max-h-48 max-w-full rounded-lg object-contain"
          >
        </div>
        <div class="mt-2 inline-flex items-center justify-center gap-2 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
          <span id="receipt-ocr-spinner" class="ocr-spinner hidden" aria-hidden="true"></span>
          <span id="receipt-ocr-status" role="status" aria-live="polite"></span>
        </div>
      </div>

      <!-- Title & Currency -->
      <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label for="new-bill-title-input" class="mb-1 block font-semibold">Название заведения (необязательно):</label>
          <input
            type="text"
            id="new-bill-title-input"
            name="title"
            value=""
            dir="auto"
            placeholder="Определяется по чеку автоматически"
            enterkeyhint="next"
            class="bidi-plaintext splittel-input muted-panel w-full rounded-xl border px-3 py-2 font-medium"
            style="border-color: var(--border-subtle);"
          >
        </div>
        <div>
          <label for="new-bill-currency-input" class="mb-1 block font-semibold">Валюта чека:</label>
          <select
            id="new-bill-currency-input"
            name="currency"
            class="splittel-input muted-panel w-full rounded-xl border px-2.5 py-2 font-bold"
            style="border-color: var(--border-subtle);"
          >
            <option value="RUB" selected>RUB (₽ - Российский рубль)</option>
            <option value="ILS">ILS (₪ - Новый израильский шекель)</option>
            <option value="EUR">EUR (€ - Евро)</option>
            <option value="USD">USD ($ - Доллар США)</option>
            <option value="TRY">TRY (₺ - Турецкая лира)</option>
            <option value="THB">THB (฿ - Тайский бат)</option>
            <option value="AED">AED (Дирхам ОАЭ)</option>
            <option value="KZT">KZT (₸ - Казахстанский тенге)</option>
            <option value="GEL">GEL (₾ - Грузинский лари)</option>
            <option value="GBP">GBP (£ - Британский фунт)</option>
          </select>
        </div>
      </div>

      <div>
        <label for="new-bill-people-input" class="mb-1 block font-semibold">Участники (имена через запятую):</label>
        <input
          type="text"
          id="new-bill-people-input"
          name="people"
          value=""
          dir="auto"
          required
          placeholder="Укажите имена участников через запятую"
          enterkeyhint="next"
          aria-describedby="new-bill-people-hint"
          class="bidi-plaintext splittel-input muted-panel w-full rounded-xl border px-3 py-2 font-semibold"
          style="border-color: var(--border-subtle);"
        >
        <span id="new-bill-people-hint" class="secondary-copy mt-1 block text-[11px]">Минимум один участник для расчёта долей.</span>
      </div>

      <!-- Dish Lines / Items Textarea -->
      <div>
        <label for="new-bill-items-text" class="mb-1 block font-semibold">
          Позиции чека (название и цена):
        </label>
        <textarea
          id="new-bill-items-text"
          name="items_text"
          rows="4"
          dir="auto"
          required
          placeholder="Название позиции 450&#10;2 x Напиток 220"
          aria-describedby="new-bill-items-hint"
          class="bidi-plaintext splittel-input muted-panel w-full rounded-xl border p-2.5 font-mono text-sm leading-relaxed"
          style="border-color: var(--border-subtle);"
        ></textarea>
        <p id="new-bill-items-hint" class="secondary-copy mt-0.5 text-[11px]">Формат: «Название [кол-во] Цена». Заполняется автоматически после съёмки чека.</p>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <div>
          <label for="new-bill-tip-input" class="mb-1 block font-semibold">Чаевые (%):</label>
          <input
            type="number"
            id="new-bill-tip-input"
            name="tip_percentage"
            min="0"
            max="100"
            value="10"
            inputmode="numeric"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            class="splittel-input muted-panel w-full rounded-xl border px-3 py-1.5 font-bold"
            style="border-color: var(--border-subtle);"
          >
        </div>
        <div>
          <label for="new-bill-tax-input" class="mb-1 block font-semibold">Налог / НДС (сумма):</label>
          <input
            type="number"
            id="new-bill-tax-input"
            name="tax_amount"
            min="0"
            step="0.01"
            value="0"
            inputmode="decimal"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            class="splittel-input muted-panel w-full rounded-xl border px-3 py-1.5 font-bold"
            style="border-color: var(--border-subtle);"
          >
        </div>
      </div>

      <div
        id="new-bill-form-error"
        role="alert"
        aria-live="polite"
        class="hidden rounded-xl border border-rose-500/40 bg-rose-500/10 px-3.5 py-2.5 text-xs font-semibold text-rose-700 dark:text-rose-300"
      ></div>

      <div class="mt-5 flex justify-end gap-2.5 border-t pt-3.5" style="border-color: var(--border-subtle);">
        <button
          type="button"
          id="cancel-new-bill-btn"
          class="cursor-pointer rounded-xl border px-3.5 py-2.5 text-xs font-semibold transition hover:opacity-80"
          style="border-color: var(--border-subtle);"
        >
          Отмена
        </button>
        <button
          type="submit"
          id="submit-new-bill-btn"
          class="cursor-pointer flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-emerald-500 active:scale-95"
        >
          <span>Создать и разделить чек</span>
        </button>
      </div>
    </form>
  </dialog>

  <!-- Light-Dismiss Payment / SBP QR Dialog -->
  <dialog
    id="payment-qr-dialog"
    closedby="any"
    aria-labelledby="payment-qr-title"
    class="splittel-modal m-auto w-[min(92vw,23rem)] rounded-2xl p-5 shadow-xl"
  >
    <div class="flex items-start justify-between gap-2">
      <div>
        <div class="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Instant Transfer</div>
        <h2 id="payment-qr-title" class="mt-0.5 text-base font-bold">Pay via Link / SBP QR</h2>
      </div>
      <form method="dialog">
        <button
          type="submit"
          aria-label="Close payment dialog"
          class="muted-panel cursor-pointer rounded-lg px-2.5 py-1 text-xs font-bold hover:opacity-80"
        >
          ✕
        </button>
      </form>
    </div>

    <p id="payment-qr-subtitle" class="secondary-copy mt-1 text-xs"></p>

    <div class="mt-4 flex flex-col items-center rounded-xl bg-white p-3 shadow-inner">
      <img id="payment-qr-img" src="data:image/gif;base64,R0lGODlhAQABAAAAACw=" alt="SBP QR Code" width="168" height="168" class="aspect-square block rounded-md">
    </div>

    <div class="mt-4 grid gap-2">
      <a
        id="payment-sbp-link"
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        class="block rounded-xl bg-emerald-600 px-4 py-2.5 text-center text-xs font-bold text-white transition hover:bg-emerald-500"
      >
        Pay via SBP (Быстрый перевод)
      </a>
      <a
        id="payment-stripe-link"
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        class="muted-panel block rounded-xl border px-4 py-2.5 text-center text-xs font-bold transition hover:opacity-85"
        style="border-color: var(--border-subtle);"
      >
        Pay via Stripe Card Link
      </a>
    </div>
  </dialog>

  <!-- Light-Dismiss Explicit Settlement Confirmation Dialog -->
  <dialog
    id="confirm-dialog"
    closedby="any"
    aria-labelledby="confirm-dialog-title"
    class="splittel-modal m-auto w-[min(92vw,24rem)] rounded-2xl p-5 shadow-xl"
  >
    <h2 id="confirm-dialog-title" class="text-base font-bold">Confirm Payment Status</h2>
    <p id="confirm-dialog-copy" class="secondary-copy mt-2 text-sm"></p>
    <div class="mt-5 flex justify-end gap-2.5">
      <button
        type="button"
        id="confirm-cancel-btn"
        class="cursor-pointer rounded-lg border px-3.5 py-2 text-xs font-semibold transition hover:opacity-80"
        style="border-color: var(--border-subtle);"
      >
        Cancel
      </button>
      <button
        type="button"
        id="confirm-approve-btn"
        class="cursor-pointer rounded-lg bg-emerald-600 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-emerald-500"
      >
        Confirm
      </button>
    </div>
  </dialog>

  <script id="splittel-bootstrap" type="application/json">${bootstrapPayload}</script>
  <script>
    (function () {
      "use strict";

      // 1. Honor explicit ?theme=light|dark query parameter for Safari & custom iframe embedders
      var params = new URLSearchParams(window.location.search);
      var urlTheme = params.get("theme");
      if (urlTheme === "light" || urlTheme === "dark") {
        document.documentElement.setAttribute("data-theme", urlTheme);
      }

      // 2. Light-dismiss fallback for browsers without native HTMLDialogElement.prototype.closedBy
      function attachDialogLightDismissFallback(dlg) {
        if (!dlg || "closedBy" in HTMLDialogElement.prototype) return;
        dlg.addEventListener("click", function (event) {
          if (event.target !== dlg) return;
          var rect = dlg.getBoundingClientRect();
          var inside =
            rect.top <= event.clientY &&
            event.clientY <= rect.top + rect.height &&
            rect.left <= event.clientX &&
            event.clientX <= rect.left + rect.width;
          if (!inside) {
            dlg.close("cancel");
          }
        });
      }

      var confirmDialog = document.getElementById("confirm-dialog");
      var paymentQrDialog = document.getElementById("payment-qr-dialog");
      var newBillDialog = document.getElementById("new-bill-dialog");
      attachDialogLightDismissFallback(confirmDialog);
      attachDialogLightDismissFallback(paymentQrDialog);
      attachDialogLightDismissFallback(newBillDialog);

      // 3. Hydrate initial state
      var bootstrapEl = document.getElementById("splittel-bootstrap");
      var bootstrap = bootstrapEl ? JSON.parse(bootstrapEl.textContent || "{}") : {};
      var currentBill = bootstrap.bill || null;
      var uiActionToken = bootstrap.uiActionToken || "";
      var apiBaseUrl = bootstrap.apiBaseUrl || "";

      // 4. MCP Apps JSON-RPC 2.0 postMessage bridge
      var isEmbedded = window.parent && window.parent !== window;
      var mcpHostConnected = false;
      var nextRpcId = 1;
      var pendingRpc = new Map();

      function sendRpcRequest(method, rpcParams, timeoutMs) {
        return new Promise(function (resolve, reject) {
          if (!isEmbedded) {
            reject(new Error("Not embedded in an MCP host"));
            return;
          }
          var id = nextRpcId++;
          var timer = setTimeout(function () {
            pendingRpc.delete(id);
            reject(new Error("MCP host RPC timeout for " + method));
          }, timeoutMs || 8000);

          pendingRpc.set(id, { resolve: resolve, reject: reject, timer: timer });
          window.parent.postMessage(
            { jsonrpc: "2.0", id: id, method: method, params: rpcParams || {} },
            "*"
          );
        });
      }

      function sendRpcNotification(method, rpcParams) {
        if (!isEmbedded) return;
        window.parent.postMessage(
          { jsonrpc: "2.0", method: method, params: rpcParams || {} },
          "*"
        );
      }

      function applyHostTheme(themeValue) {
        if (themeValue === "dark" || themeValue === "light") {
          document.documentElement.setAttribute("data-theme", themeValue);
        }
      }

      function formatMoney(amount, currency) {
        var code = (currency || "RUB").toUpperCase();
        try {
          return new Intl.NumberFormat(undefined, {
            style: "currency",
            currency: code,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          }).format(Number(amount || 0));
        } catch (_e) {
          return code + " " + Number(amount || 0).toFixed(2);
        }
      }

      function initialsFor(name) {
        var parts = String(name || "?").trim().split(/\\s+/).slice(0, 2);
        return parts.map(function (p) { return (p[0] || "").toUpperCase(); }).join("") || "?";
      }

      function showStatusBanner(message) {
        var banner = document.getElementById("status-banner");
        if (!banner) return;
        banner.textContent = message;
        banner.classList.remove("hidden");
        clearTimeout(banner._hideTimer);
        banner._hideTimer = setTimeout(function () {
          banner.classList.add("hidden");
        }, 4200);
      }

      function showFormError(message) {
        var errEl = document.getElementById("new-bill-form-error");
        if (!errEl) return;
        if (!message) {
          errEl.textContent = "";
          errEl.classList.add("hidden");
          return;
        }
        errEl.textContent = message;
        errEl.classList.remove("hidden");
      }

      // Cent-exact Largest Remainder calculation in browser for instant micro-interactions
      function toCents(n) {
        return Math.round((Number(n || 0) + Number.EPSILON) * 100);
      }
      function fromCents(c) {
        return Number((c / 100).toFixed(2));
      }
      function allocateCents(totalCents, weights) {
        if (!weights.length) return [];
        if (totalCents === 0) return weights.map(function () { return 0; });
        var sumW = weights.reduce(function (a, b) { return a + Math.max(0, b); }, 0);
        var eff = sumW > 0 ? weights.map(function (w) { return Math.max(0, w); }) : weights.map(function () { return 1; });
        var denom = eff.reduce(function (a, b) { return a + b; }, 0);
        var quotas = eff.map(function (w) { return (totalCents * w) / denom; });
        var floors = quotas.map(function (q) { return Math.floor(q); });
        var rem = totalCents - floors.reduce(function (a, b) { return a + b; }, 0);
        var ranked = quotas
          .map(function (q, i) { return { i: i, f: q - floors[i] }; })
          .sort(function (a, b) { return b.f !== a.f ? b.f - a.f : a.i - b.i; });
        for (var k = 0; k < rem; k++) {
          floors[ranked[k].i] += 1;
        }
        return floors;
      }

      function recomputeBillClientSide(bill) {
        var people = bill.people || [];
        var rawItems = bill.raw_items || [];
        var assignments = bill.assignments || {};

        var subCentsByPerson = people.map(function () { return 0; });
        var itemsByPerson = people.map(function () { return []; });
        var billSubCents = 0;

        rawItems.forEach(function (item) {
          var lineCents = toCents(item.price * (item.quantity || 1));
          billSubCents += lineCents;
          var iKey = String(item.item_name).trim().toLowerCase();

          var weights = people.map(function (person) {
            var list = assignments[person] || [];
            var count = 0;
            for (var j = 0; j < list.length; j++) {
              if (String(list[j]).trim().toLowerCase() === iKey) count++;
            }
            return count;
          });

          var sumAssigned = weights.reduce(function (a, b) { return a + b; }, 0);
          var isUnassigned = sumAssigned === 0;
          var effWeights = isUnassigned ? people.map(function () { return 1; }) : weights;
          var sharedCount = effWeights.filter(function (w) { return w > 0; }).length;
          var splits = allocateCents(lineCents, effWeights);

          people.forEach(function (_p, idx) {
            if (effWeights[idx] <= 0 && splits[idx] === 0) return;
            subCentsByPerson[idx] += splits[idx];
            itemsByPerson[idx].push({
              item_id: item.item_id,
              item_name: item.item_name,
              person_share: fromCents(splits[idx]),
              shared_with_count: sharedCount,
              unassigned_split: isUnassigned
            });
          });
        });

        var taxCents = toCents(bill.tax_amount || 0);
        var tipPct = Number(bill.tip_percentage || 0);
        var tipCents = Math.round((billSubCents * tipPct) / 100);
        var grandCents = billSubCents + taxCents + tipCents;

        var taxShares = allocateCents(taxCents, subCentsByPerson);
        var tipShares = allocateCents(tipCents, subCentsByPerson);
        var currency = String(bill.currency || "RUB").toUpperCase();
        var settlementCurrency = String(bill.settlement_currency || currency).toUpperCase();
        var exchangeRate = Number(bill.exchange_rate || 1);
        var perPersonReceiptCents = people.map(function (_p, idx) {
          return subCentsByPerson[idx] + taxShares[idx] + tipShares[idx];
        });
        var settlementGrandCents = Math.round(grandCents * exchangeRate);
        var settlementSharesCents =
          settlementCurrency === currency
            ? perPersonReceiptCents
            : allocateCents(settlementGrandCents, perPersonReceiptCents);

        bill.subtotal = fromCents(billSubCents);
        bill.tip_amount = fromCents(tipCents);
        bill.grand_total = fromCents(grandCents);
        bill.settlement_currency = settlementCurrency;
        bill.exchange_rate = exchangeRate;
        bill.settlement_grand_total = fromCents(settlementGrandCents);

        bill.people_shares = people.map(function (person, idx) {
          var prev = (bill.people_shares || []).find(function (s) { return s.person === person; }) || {};
          var totalOwed = fromCents(perPersonReceiptCents[idx]);
          var settlementTotalOwed = fromCents(settlementSharesCents[idx]);
          return {
            person: person,
            transaction_id: prev.transaction_id || ("txn_" + idx),
            status: prev.status || "PENDING",
            items: itemsByPerson[idx],
            items_subtotal: fromCents(subCentsByPerson[idx]),
            tax_share: fromCents(taxShares[idx]),
            tip_share: fromCents(tipShares[idx]),
            total_owed: totalOwed,
            settlement_currency: settlementCurrency,
            settlement_total_owed: settlementTotalOwed,
            payment: prev.payment || { pay_url: "#", sbp_link: "#", stripe_link: "#", qr_code_data_uri: "" }
          };
        });
      }

      var syncTimer = null;
      function scheduleServerStateSync() {
        if (!currentBill || !currentBill.bill_id) return;
        clearTimeout(syncTimer);
        syncTimer = setTimeout(function () {
          var url = (apiBaseUrl || "") + "/api/bills/" + encodeURIComponent(currentBill.bill_id) + "/state";
          fetch(url, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              assignments: currentBill.assignments,
              tip_percentage: currentBill.tip_percentage
            })
          })
            .then(function (r) { return r.ok ? r.json() : null; })
            .then(function (data) {
              if (data && data.bill) {
                currentBill = data.bill;
                renderAll(currentBill);
              }
            })
            .catch(function () {});
        }, 280);
      }

      function isPersonAssignedToItem(person, itemName) {
        var list = (currentBill.assignments && currentBill.assignments[person]) || [];
        var target = String(itemName).trim().toLowerCase();
        return list.some(function (x) { return String(x).trim().toLowerCase() === target; });
      }

      function toggleDishAssignment(person, itemName) {
        if (!currentBill) return;
        if (!currentBill.assignments) currentBill.assignments = {};
        var list = (currentBill.assignments[person] || []).slice();
        var target = String(itemName).trim().toLowerCase();
        var exists = list.some(function (x) { return String(x).trim().toLowerCase() === target; });

        if (exists) {
          currentBill.assignments[person] = list.filter(function (x) {
            return String(x).trim().toLowerCase() !== target;
          });
        } else {
          list.push(itemName);
          currentBill.assignments[person] = list;
        }

        recomputeBillClientSide(currentBill);
        renderAll(currentBill);
        scheduleServerStateSync();
      }

      function syncTipPillHighlight(tipPct) {
        var presetButtons = document.querySelectorAll("[data-tip-preset]");
        var matchedPreset = false;
        presetButtons.forEach(function (btn) {
          var val = Number(btn.getAttribute("data-tip-preset"));
          var isMatch = val === Number(tipPct);
          if (isMatch) matchedPreset = true;
          btn.setAttribute("aria-pressed", isMatch ? "true" : "false");
        });

        var customBtn = document.getElementById("tip-custom-btn");
        var customWrap = document.getElementById("tip-custom-wrap");
        var customInput = document.getElementById("tip-custom-input");
        if (customBtn && customWrap) {
          customBtn.setAttribute("aria-pressed", matchedPreset ? "false" : "true");
          if (!matchedPreset) {
            customWrap.classList.remove("hidden");
            customWrap.classList.add("inline-flex");
            if (customInput) customInput.value = String(tipPct);
          }
        }
      }

      function syncEmptyVsActiveVisibility(hasBill) {
        var emptyEl = document.getElementById("empty-bill-state");
        var activeEl = document.getElementById("active-bill-sections");
        var headerMetricsEl = document.getElementById("header-metrics-wrap");
        var headerBreakdownEl = document.getElementById("header-breakdown-bar");
        var shareBtnEl = document.getElementById("copy-share-link-btn");

        if (emptyEl) emptyEl.classList.toggle("hidden", Boolean(hasBill));
        if (activeEl) activeEl.classList.toggle("hidden", !hasBill);
        if (headerMetricsEl) {
          headerMetricsEl.classList.toggle("hidden", !hasBill);
          headerMetricsEl.classList.toggle("flex", Boolean(hasBill));
        }
        if (headerBreakdownEl) {
          headerBreakdownEl.classList.toggle("hidden", !hasBill);
          headerBreakdownEl.classList.toggle("flex", Boolean(hasBill));
        }
        if (shareBtnEl) shareBtnEl.classList.toggle("hidden", !hasBill);
      }

      // Render Itemized Interactive Matrix + Summary Cards safely via DOM APIs
      function renderAll(bill) {
        if (!bill || !Array.isArray(bill.people_shares)) {
          syncEmptyVsActiveVisibility(false);
          notifyResize();
          return;
        }
        currentBill = bill;
        syncEmptyVsActiveVisibility(true);

        var currency = String(bill.currency || "RUB").toUpperCase();
        var settlementCurrency = String(bill.settlement_currency || currency).toUpperCase();
        var isMultiCurrency = settlementCurrency !== currency;
        var titleEl = document.getElementById("bill-title");
        var metaEl = document.getElementById("bill-meta");
        var grandEl = document.getElementById("bill-grand-total");
        var settleGrandEl = document.getElementById("bill-settlement-total");
        var subEl = document.getElementById("bill-subtotal");
        var taxEl = document.getElementById("bill-tax");
        var tipEl = document.getElementById("bill-tip");
        var progEl = document.getElementById("bill-progress");

        if (titleEl) titleEl.textContent = bill.title || "Splittel Check";
        if (metaEl) {
          var fxMeta = isMultiCurrency
            ? " • FX 1 " + currency + " = " + Number(bill.exchange_rate || 1) + " " + settlementCurrency
            : "";
          metaEl.textContent =
            "Check #" + bill.bill_id + " • " + (bill.people || []).length + " участн." + fxMeta;
        }
        if (grandEl) grandEl.textContent = formatMoney(bill.grand_total, currency);
        if (settleGrandEl) {
          if (isMultiCurrency) {
            settleGrandEl.textContent =
              "≈ " + formatMoney(bill.settlement_grand_total, settlementCurrency);
            settleGrandEl.classList.remove("hidden");
          } else {
            settleGrandEl.classList.add("hidden");
          }
        }
        if (subEl) subEl.textContent = formatMoney(bill.subtotal, currency);
        if (taxEl) taxEl.textContent = formatMoney(bill.tax_amount || 0, currency);
        if (tipEl) {
          tipEl.textContent =
            formatMoney(bill.tip_amount, currency) + " (" + Number(bill.tip_percentage || 0) + "%)";
        }

        var paidCount = bill.people_shares.filter(function (s) {
          return s.status === "PAID";
        }).length;
        if (progEl) {
          progEl.textContent = paidCount + " / " + bill.people_shares.length + " Paid";
        }

        syncTipPillHighlight(bill.tip_percentage);

        // Render Section 2: Itemized Interactive Matrix
        var matrixListEl = document.getElementById("dish-matrix-list");
        if (matrixListEl) {
          var matrixFrag = document.createDocumentFragment();
          var people = bill.people || bill.people_shares.map(function (s) { return s.person; });

          (bill.raw_items || []).forEach(function (dish) {
            var row = document.createElement("div");
            row.className = "flex flex-col justify-between gap-2.5 py-3 sm:flex-row sm:items-center";

            // Left column: Dish name, quantity & price
            var left = document.createElement("div");
            left.className = "flex items-baseline justify-between gap-3 sm:justify-start";

            var dishTitle = document.createElement("span");
            dishTitle.dir = "auto";
            dishTitle.className = "bidi-plaintext text-xs font-semibold sm:text-sm";
            dishTitle.textContent =
              dish.item_name + (dish.quantity > 1 ? " ×" + dish.quantity : "");

            var dishPrice = document.createElement("span");
            dishPrice.className = "secondary-copy text-xs font-bold tabular-nums sm:text-sm";
            dishPrice.textContent = formatMoney(dish.line_total, currency);

            left.appendChild(dishTitle);
            left.appendChild(dishPrice);

            // Right column: Avatar chips for each friend
            var chipsWrap = document.createElement("div");
            chipsWrap.className = "flex flex-wrap items-center gap-1.5";

            var selectedCount = 0;
            people.forEach(function (person) {
              var active = isPersonAssignedToItem(person, dish.item_name);
              if (active) selectedCount++;

              var chip = document.createElement("button");
              chip.type = "button";
              chip.className =
                "avatar-chip inline-flex cursor-pointer items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold active:scale-95";
              chip.setAttribute("aria-pressed", active ? "true" : "false");
              chip.setAttribute(
                "aria-label",
                "Toggle " + dish.item_name + " for " + person
              );

              var av = document.createElement("span");
              av.setAttribute("aria-hidden", "true");
              av.className = active
                ? "inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white"
                : "inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-500/20 text-[10px] font-bold";
              av.textContent = initialsFor(person);

              var nameSpan = document.createElement("span");
              nameSpan.dir = "auto";
              nameSpan.textContent = person;

              chip.appendChild(av);
              chip.appendChild(nameSpan);
              chip.addEventListener("click", function () {
                toggleDishAssignment(person, dish.item_name);
              });
              chipsWrap.appendChild(chip);
            });

            var splitHint = document.createElement("span");
            splitHint.className = "secondary-copy ms-1 text-[11px] font-medium";
            splitHint.textContent =
              selectedCount === 0
                ? "Shared all (÷" + people.length + ")"
                : selectedCount > 1
                  ? "÷" + selectedCount
                  : "1×";
            chipsWrap.appendChild(splitHint);

            row.appendChild(left);
            row.appendChild(chipsWrap);
            matrixFrag.appendChild(row);
          });

          matrixListEl.replaceChildren(matrixFrag);
        }

        // Render Section 3: Summary Cards per Person
        var gridEl = document.getElementById("cards-grid");
        if (gridEl) {
          var cardsFrag = document.createDocumentFragment();

          bill.people_shares.forEach(function (share) {
            var isPaid = share.status === "PAID";

            var article = document.createElement("article");
            article.className = "person-card shadow-xs";
            article.setAttribute("data-status", share.status || "PENDING");
            article.setAttribute("data-transaction-id", share.transaction_id);

            // Region 1: <header>
            var header = document.createElement("header");
            header.className = "person-card-header-inner flex flex-col justify-between gap-2 border-b pb-3";
            header.style.borderColor = "var(--border-subtle)";

            var idBox = document.createElement("div");
            idBox.className = "flex items-center gap-2.5";

            var avatar = document.createElement("span");
            avatar.setAttribute("aria-hidden", "true");
            avatar.className = isPaid
              ? "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-xs font-bold text-emerald-700 dark:text-emerald-300"
              : "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-500/15 text-xs font-bold text-indigo-700 dark:text-indigo-300";
            avatar.textContent = initialsFor(share.person);

            var nameWrap = document.createElement("div");
            var h3 = document.createElement("h3");
            h3.dir = "auto";
            h3.className = "bidi-plaintext text-base font-bold leading-tight";
            h3.textContent = share.person;

            var statusPill = document.createElement("span");
            statusPill.className = isPaid
              ? "mt-0.5 inline-flex items-center rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300"
              : "mt-0.5 inline-flex items-center rounded-full bg-amber-500/15 px-2 py-0.5 text-[11px] font-semibold text-amber-700 dark:text-amber-300";
            statusPill.textContent = isPaid
              ? "PAID ✓"
              : share.status === "CANCELLED"
                ? "CANCELLED"
                : "PENDING";

            nameWrap.appendChild(h3);
            nameWrap.appendChild(statusPill);
            idBox.appendChild(avatar);
            idBox.appendChild(nameWrap);

            var totalBox = document.createElement("div");
            totalBox.className = "text-left sm:text-right";
            var totalLbl = document.createElement("div");
            totalLbl.className = "secondary-copy text-[10px] font-semibold uppercase tracking-wider";
            totalLbl.textContent = "Final Amount";
            var totalVal = document.createElement("div");
            totalVal.className = "fluid-person-total font-extrabold tabular-nums";
            totalVal.textContent = formatMoney(share.total_owed, currency);

            totalBox.appendChild(totalLbl);
            totalBox.appendChild(totalVal);
            if (isMultiCurrency) {
              var fxVal = document.createElement("div");
              fxVal.className = "text-xs font-bold tabular-nums text-emerald-600 dark:text-emerald-400";
              fxVal.textContent =
                "≈ " + formatMoney(share.settlement_total_owed, settlementCurrency);
              totalBox.appendChild(fxVal);
            }

            header.appendChild(idBox);
            header.appendChild(totalBox);

            // Region 2: Content <div> (items + subtotal/tax/tip breakdown)
            var contentDiv = document.createElement("div");
            contentDiv.className = "flex flex-col justify-between gap-3 text-sm";

            var ul = document.createElement("ul");
            ul.className = "space-y-1";
            (share.items || []).forEach(function (item) {
              var li = document.createElement("li");
              li.className = "flex items-baseline justify-between gap-2 text-xs";

              var iname = document.createElement("span");
              iname.dir = "auto";
              iname.className = "bidi-plaintext truncate font-medium";
              iname.textContent =
                item.item_name +
                (item.shared_with_count > 1 ? " (÷" + item.shared_with_count + ")" : "");

              var iprice = document.createElement("span");
              iprice.className = "secondary-copy shrink-0 tabular-nums";
              iprice.textContent = formatMoney(item.person_share, currency);

              li.appendChild(iname);
              li.appendChild(iprice);
              ul.appendChild(li);
            });

            var breakdown = document.createElement("div");
            breakdown.className = "muted-panel space-y-1 rounded-lg px-2.5 py-2 text-xs";

            function appendMetricRow(label, val) {
              var r = document.createElement("div");
              r.className = "flex justify-between";
              var l = document.createElement("span");
              l.className = "secondary-copy";
              l.textContent = label;
              var v = document.createElement("span");
              v.className = "font-medium tabular-nums";
              v.textContent = formatMoney(val, currency);
              r.appendChild(l);
              r.appendChild(v);
              breakdown.appendChild(r);
            }

            appendMetricRow("Subtotal", share.items_subtotal);
            appendMetricRow("Proportional Tax", share.tax_share || 0);
            appendMetricRow("Proportional Tip", share.tip_share || 0);

            contentDiv.appendChild(ul);
            contentDiv.appendChild(breakdown);

            // Region 3: <footer> with "Mark as Paid" toggle + "Pay via Link / SBP QR" button
            var footer = document.createElement("footer");
            footer.className = "grid grid-cols-2 gap-2 pt-1";

            var togglePaidBtn = document.createElement("button");
            togglePaidBtn.type = "button";
            togglePaidBtn.setAttribute("aria-pressed", isPaid ? "true" : "false");
            togglePaidBtn.className = isPaid
              ? "cursor-pointer rounded-xl border border-emerald-500/40 bg-emerald-500/15 px-3 py-2 text-xs font-bold text-emerald-700 dark:text-emerald-300 transition hover:opacity-85"
              : "cursor-pointer rounded-xl bg-emerald-600 px-3 py-2 text-xs font-bold text-white shadow-xs transition hover:bg-emerald-500 active:scale-[0.99]";
            togglePaidBtn.textContent = isPaid ? "Paid ✓ (Undo)" : "Mark as Paid";
            togglePaidBtn.addEventListener("click", function () {
              handleTogglePaid(share, togglePaidBtn);
            });

            var payQrBtn = document.createElement("button");
            payQrBtn.type = "button";
            payQrBtn.className =
              "muted-panel cursor-pointer rounded-xl border px-3 py-2 text-xs font-bold transition hover:opacity-85";
            payQrBtn.style.borderColor = "var(--border-subtle)";
            payQrBtn.textContent = "Pay via Link / SBP QR";
            payQrBtn.addEventListener("click", function () {
              openPaymentModal(share, currency);
            });

            footer.appendChild(togglePaidBtn);
            footer.appendChild(payQrBtn);

            article.appendChild(header);
            article.appendChild(contentDiv);
            article.appendChild(footer);
            cardsFrag.appendChild(article);
          });

          gridEl.replaceChildren(cardsFrag);
        }

        var currencySelect = document.getElementById("currency-select");
        if (currencySelect) {
          currencySelect.value = currency;
        }

        renderNativePromoCard(bill);
        notifyResize();
      }

      // Strictly render live CPA benchmark recommendations; hide promo card when none exist
      function renderNativePromoCard(bill) {
        var promoEl = document.getElementById("native-promo-card");
        if (!promoEl) return;

        var rec = bill && bill.recommendation;
        if (!rec) {
          promoEl.classList.add("hidden");
          promoEl.replaceChildren();
          return;
        }

        promoEl.classList.remove("hidden");
        promoEl.replaceChildren();

        var cardInner = document.createElement("div");
        cardInner.className = "flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center";

        var textWrap = document.createElement("div");
        textWrap.className = "flex-1 space-y-1.5";

        var topRow = document.createElement("div");
        topRow.className = "flex flex-wrap items-center gap-2";

        var badgeEl = document.createElement("span");
        badgeEl.className = "inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-bold text-emerald-700 dark:text-emerald-300";
        badgeEl.textContent = "💡 " + (rec.badge || "Сравнение цен в районе");

        var headlineEl = document.createElement("span");
        headlineEl.className = "secondary-copy text-xs font-bold";
        headlineEl.textContent = rec.headline || "Контекстное сравнение";

        topRow.appendChild(badgeEl);
        topRow.appendChild(headlineEl);

        var p = document.createElement("p");
        p.className = "text-xs leading-relaxed sm:text-sm";
        p.textContent = rec.message || "";

        textWrap.appendChild(topRow);
        textWrap.appendChild(p);

        var actionWrap = document.createElement("div");
        actionWrap.className = "flex w-full shrink-0 flex-wrap items-center gap-2 sm:w-auto sm:flex-col sm:items-end";

        var promoBox = document.createElement("div");
        promoBox.className = "inline-flex items-center gap-2 rounded-xl border border-dashed border-emerald-500/50 bg-emerald-500/10 px-3 py-1.5 font-mono text-xs font-bold text-emerald-800 dark:text-emerald-300";
        var codeSpan = document.createElement("span");
        codeSpan.textContent = "ПРОМОКОД: " + (rec.promo_code || "SPLITTEL");

        var copyBtn = document.createElement("button");
        copyBtn.type = "button";
        copyBtn.className = "cursor-pointer font-sans text-[11px] font-bold underline hover:text-emerald-600";
        copyBtn.textContent = "Копировать";
        copyBtn.addEventListener("click", function () {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(rec.promo_code || "SPLITTEL");
            copyBtn.textContent = "✓ Скопировано!";
            setTimeout(function () { copyBtn.textContent = "Копировать"; }, 2000);
          }
        });
        promoBox.appendChild(codeSpan);
        promoBox.appendChild(copyBtn);

        var ctaLink = document.createElement("a");
        ctaLink.href = rec.action_url || ((apiBaseUrl || "") + "/r/partner-offer?code=SPLITTEL");
        ctaLink.target = "_blank";
        ctaLink.rel = "noopener noreferrer";
        ctaLink.className = "cursor-pointer rounded-xl bg-emerald-600 px-3.5 py-2 text-center text-xs font-bold text-white shadow-xs transition hover:bg-emerald-500 active:scale-95";
        ctaLink.textContent = rec.cta_text || "Забронировать со скидкой";

        actionWrap.appendChild(promoBox);
        actionWrap.appendChild(ctaLink);

        cardInner.appendChild(textWrap);
        cardInner.appendChild(actionWrap);
        promoEl.appendChild(cardInner);
      }

      // Layer 3: Browser Geolocation / Timezone / Locale Fallback
      function detectBrowserCurrency() {
        try {
          var tz = (Intl && Intl.DateTimeFormat && Intl.DateTimeFormat().resolvedOptions().timeZone) || "";
          var lang = (navigator.languages && navigator.languages[0]) || navigator.language || "";
          if (/Jerusalem|Tel_Aviv|Israel/i.test(tz) || /^he/i.test(lang)) return "ILS";
          if (/Istanbul|Ankara|Turkey/i.test(tz)) return "TRY";
          if (/Bangkok|Thailand/i.test(tz)) return "THB";
          if (/Dubai|Abu_Dhabi|Muscat/i.test(tz)) return "AED";
          if (/Almaty|Qyzylorda|Astana|Oral|Aktau|Aqtobe|Atyrau/i.test(tz)) return "KZT";
          if (/Tbilisi|Batumi/i.test(tz)) return "GEL";
          if (/London/i.test(tz) || /^en-GB/i.test(lang)) return "GBP";
          if (/Paris|Berlin|Rome|Madrid|Amsterdam|Vienna|Brussels|Warsaw|Prague|Athens|Helsinki|Dublin|Lisbon/i.test(tz)) return "EUR";
          if (/New_York|Chicago|Denver|Los_Angeles|Phoenix|Anchorage|Honolulu/i.test(tz) || /^en-US/i.test(lang)) return "USD";
          if (/Moscow|Samara|Yekaterinburg|Novosibirsk|Krasnoyarsk|Irkutsk|Vladivostok/i.test(tz) || /^ru/i.test(lang)) return "RUB";
        } catch (_) {}
        return "RUB";
      }

      // Layer 4: Manual Currency Select in UI
      var currencySelect = document.getElementById("currency-select");
      if (currencySelect) {
        currencySelect.addEventListener("change", function () {
          if (!currentBill) return;
          var newCurrency = currencySelect.value;
          currentBill.currency = newCurrency;
          currentBill.settlement_currency = newCurrency;
          recomputeBillClientSide(currentBill);
          renderAll(currentBill);

          fetch((apiBaseUrl || "") + "/api/bills/" + encodeURIComponent(currentBill.bill_id) + "/state", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              currency: newCurrency,
              settlement_currency: newCurrency,
              assignments: currentBill.assignments,
              tip_percentage: currentBill.tip_percentage
            })
          })
            .then(function (r) { return r.ok ? r.json() : null; })
            .then(function (data) {
              if (data && data.bill) {
                currentBill = data.bill;
                renderAll(currentBill);
              }
            })
            .catch(function () {});
        });
      }

      // Tip selector pill events
      document.querySelectorAll("[data-tip-preset]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          if (!currentBill) return;
          var pct = Number(btn.getAttribute("data-tip-preset") || 0);
          var customWrap = document.getElementById("tip-custom-wrap");
          if (customWrap) {
            customWrap.classList.add("hidden");
            customWrap.classList.remove("inline-flex");
          }
          currentBill.tip_percentage = pct;
          recomputeBillClientSide(currentBill);
          renderAll(currentBill);
          scheduleServerStateSync();
        });
      });

      var customTipBtn = document.getElementById("tip-custom-btn");
      var customTipWrap = document.getElementById("tip-custom-wrap");
      var customTipInput = document.getElementById("tip-custom-input");

      if (customTipBtn && customTipWrap && customTipInput) {
        customTipBtn.addEventListener("click", function () {
          customTipWrap.classList.remove("hidden");
          customTipWrap.classList.add("inline-flex");
          customTipInput.focus();
          var val = Math.min(100, Math.max(0, Number(customTipInput.value || 0)));
          if (currentBill) {
            currentBill.tip_percentage = val;
            recomputeBillClientSide(currentBill);
            renderAll(currentBill);
            scheduleServerStateSync();
          }
        });

        customTipInput.addEventListener("input", function () {
          var val = Math.min(100, Math.max(0, Number(customTipInput.value || 0)));
          if (currentBill) {
            currentBill.tip_percentage = val;
            recomputeBillClientSide(currentBill);
            renderAll(currentBill);
            scheduleServerStateSync();
          }
        });
      }

      function openManualNewBillModal() {
        showFormError("");
        var curInput = document.getElementById("new-bill-currency-input");
        if (curInput && !curInput.value) {
          curInput.value = "RUB";
        }
        if (newBillDialog && !newBillDialog.open && typeof newBillDialog.showModal === "function") {
          newBillDialog.showModal();
        }
      }

      var openNewBillBtn = document.getElementById("open-new-bill-btn");
      var emptyManualBtn = document.getElementById("empty-manual-bill-btn");
      var cancelNewBillBtn = document.getElementById("cancel-new-bill-btn");

      if (openNewBillBtn) {
        openNewBillBtn.addEventListener("click", openManualNewBillModal);
      }
      if (emptyManualBtn) {
        emptyManualBtn.addEventListener("click", openManualNewBillModal);
      }
      if (cancelNewBillBtn && newBillDialog) {
        cancelNewBillBtn.addEventListener("click", function () {
          newBillDialog.close("cancel");
        });
      }

      // FAB Ripple Micro-Animation + Direct Native Rear Camera Launch
      var scanReceiptFab = document.getElementById("scan-receipt-fab");
      var scanFabSpinner = document.getElementById("scan-fab-spinner");
      var scanFabText = document.getElementById("scan-fab-text");
      var receiptFileInput = document.getElementById("receipt-file-input");
      var receiptGalleryInput = document.getElementById("receipt-gallery-input");
      var modalCameraTriggerBtn = document.getElementById("modal-camera-trigger-btn");
      var previewWrap = document.getElementById("receipt-preview-wrap");
      var previewImg = document.getElementById("receipt-preview-img");
      var ocrSpinner = document.getElementById("receipt-ocr-spinner");
      var ocrStatus = document.getElementById("receipt-ocr-status");

      function spawnFabRipple(btn, clientX, clientY) {
        if (!btn) return;
        var rect = btn.getBoundingClientRect();
        var size = Math.max(rect.width, rect.height);
        var x = (clientX || rect.left + rect.width / 2) - rect.left - size / 2;
        var y = (clientY || rect.top + rect.height / 2) - rect.top - size / 2;
        var ripple = document.createElement("span");
        ripple.className = "fab-ripple";
        ripple.style.width = size + "px";
        ripple.style.height = size + "px";
        ripple.style.left = x + "px";
        ripple.style.top = y + "px";
        btn.appendChild(ripple);
        ripple.addEventListener("animationend", function () {
          ripple.remove();
        });
      }

      function setOcrLoadingState(isLoading) {
        if (scanReceiptFab) {
          scanReceiptFab.setAttribute("data-loading", isLoading ? "true" : "false");
        }
        if (scanFabSpinner) {
          scanFabSpinner.classList.toggle("hidden", !isLoading);
        }
        if (scanFabText) {
          scanFabText.textContent = isLoading ? "Распознаём чек…" : "Сканировать чек 📷";
        }
        if (ocrSpinner) {
          ocrSpinner.classList.toggle("hidden", !isLoading);
        }
      }

      function triggerDirectCameraCapture(event) {
        if (scanReceiptFab && event) {
          spawnFabRipple(scanReceiptFab, event.clientX, event.clientY);
        }
        if (scanReceiptFab && scanReceiptFab.getAttribute("data-loading") === "true") {
          openManualNewBillModal();
          return;
        }
        if (receiptFileInput) {
          receiptFileInput.value = "";
          receiptFileInput.click();
        } else {
          openManualNewBillModal();
        }
      }

      if (scanReceiptFab) {
        scanReceiptFab.addEventListener("click", triggerDirectCameraCapture);
      }
      if (modalCameraTriggerBtn) {
        modalCameraTriggerBtn.addEventListener("click", function () {
          if (receiptFileInput) {
            receiptFileInput.value = "";
            receiptFileInput.click();
          }
        });
      }

      function readAsDataUrlFallback(file) {
        return new Promise(function (resolve, reject) {
          var reader = new FileReader();
          reader.onload = function (evt) {
            resolve((evt.target && evt.target.result) || "");
          };
          reader.onerror = function () {
            reject(new Error("FileReader failed"));
          };
          reader.readAsDataURL(file);
        });
      }

      // Normalize mobile EXIF orientation, decode HEIC/camera captures, and cap edge at 2200px for crisp & fast OCR
      function prepareReceiptImageDataUrl(file) {
        if (typeof createImageBitmap !== "function" || typeof document.createElement !== "function") {
          return readAsDataUrlFallback(file);
        }
        return createImageBitmap(file, { imageOrientation: "from-image" })
          .then(function (bitmap) {
            try {
              var w = bitmap.width || 0;
              var h = bitmap.height || 0;
              if (!w || !h) {
                if (typeof bitmap.close === "function") bitmap.close();
                return readAsDataUrlFallback(file);
              }
              // Token & Mobile Bandwidth Optimization: downscale to max 1200px and 0.82 JPEG quality
              var maxEdge = 1200;
              var scale = Math.max(w, h) > maxEdge ? maxEdge / Math.max(w, h) : 1;
              var targetW = Math.max(1, Math.round(w * scale));
              var targetH = Math.max(1, Math.round(h * scale));
              var canvas = document.createElement("canvas");
              canvas.width = targetW;
              canvas.height = targetH;
              var ctx = canvas.getContext("2d");
              if (!ctx) {
                if (typeof bitmap.close === "function") bitmap.close();
                return readAsDataUrlFallback(file);
              }
              ctx.fillStyle = "#ffffff";
              ctx.fillRect(0, 0, targetW, targetH);
              ctx.drawImage(bitmap, 0, 0, targetW, targetH);
              if (typeof bitmap.close === "function") bitmap.close();
              return canvas.toDataURL("image/jpeg", 0.82);
            } catch (_canvasErr) {
              if (bitmap && typeof bitmap.close === "function") bitmap.close();
              return readAsDataUrlFallback(file);
            }
          })
          .catch(function () {
            return readAsDataUrlFallback(file);
          });
      }

      // Client-side Israeli Shekel (ILS) & multi-currency detector
      function detectClientCurrency(rawText, defaultCurrency) {
        var norm = String(rawText || "")
          .replace(/[\\u200E\\u200F\\u202A-\\u202E\\u2066-\\u2069\\uFEFF]/g, "")
          .replace(/[״“”„«»]|''/g, '"')
          .replace(/[׳‘’]/g, "'");
        var lower = norm.toLowerCase();
        if (
          /₪|\\b(?:ils|nis|shekels?|sheqels?)\\b|шекел|ש"ח|ש'ח|(?:^|[^\\u0590-\\u05FF])(?:שח|שקל(?:ים)?)(?=$|[^\\u0590-\\u05FF])/i.test(
            norm
          )
        ) {
          return "ILS";
        }
        if (/₽|\\brub\\b|(?<=^|\\s)руб/i.test(lower)) return "RUB";
        if (/€|\\beur\\b|евро/i.test(lower)) return "EUR";
        if (/\\$|\\busd\\b|долл/i.test(lower)) return "USD";
        if (/฿|\\b(?:thb|baht)\\b/i.test(lower)) return "THB";
        if (/₺|\\b(?:try|tl)\\b/i.test(lower)) return "TRY";
        if (/\\b(?:aed|dirhams?)\\b|дирхам/i.test(lower)) return "AED";
        if (/₸|\\bkzt\\b|тенге/i.test(lower)) return "KZT";
        if (/[\\u0590-\\u05FF].*[\\u0590-\\u05FF]/.test(norm)) return "ILS";
        return defaultCurrency || "RUB";
      }

      // Client-side Hebrew (RTL) + English + Russian receipt line parser
      function parseReceiptLinesClientSide(rawText, defaultCurrency) {
        var detectedCurrency = detectClientCurrency(rawText, defaultCurrency);
        var items = [];
        if (!rawText || typeof rawText !== "string") {
          return { items: items, detectedCurrency: detectedCurrency };
        }

        var currencyStripRe =
          /(?:₪|ש"ח|ש'ח|(?<=^|\\s)שח(?=\\s|$)|\\b(?:ils|nis|shekels?|sheqels?|rub|usd|eur|thb|baht|try|tl|aed|kzt)\\b|шекел[а-яё]*|руб\\.?|₽|€|\\$|฿|₺|₸)/gi;
        var excludedHebRe =
          /(?:^|[^\\u0590-\\u05FF])(?:חשבונית|קבלה|עוסק\\s*מורשה|סה"כ|סה'כ|סהכ|סך[\\s-]*הכל|לתשלום|ביניים|מע"מ|מע'מ|שולחן|סועדים|מלצר|קופאי|אסמכתא|אשראי|מזומן|עודף|הנחה|תודה|טלפון)(?=$|[^\\u0590-\\u05FF])/;
        var excludedStartRe =
          /^(?:чек|кассовый|итого?|всего|сумма|к оплате|оплата|ндс|спасибо|subtotal|total|amount due|tax|vat|tip|service charge|cash|card|change|thank you)(?:$|\\s|:)/i;

        String(rawText)
          .split(/\\r?\\n/)
          .forEach(function (rawLine) {
            var line = String(rawLine || "")
              .replace(/[\\u200E\\u200F\\u202A-\\u202E\\u2066-\\u2069\\uFEFF]/g, "")
              .replace(/[״“”„«»]|''/g, '"')
              .replace(/[׳‘’]/g, "'")
              .replace(/([\\u0590-\\u05FF])(\\d)/g, "$1 $2")
              .replace(/(\\d)([\\u0590-\\u05FF])/g, "$1 $2")
              .replace(/(?:^|\\s)סה['"י]{1,3}כ(?=\\s|$)/g, ' סה"כ')
              .replace(/(?:^|\\s)מע['"י]{1,3}מ(?=\\s|$)/g, ' מע"מ')
              .replace(/[.·•\\-_]{3,}/g, " ")
              .replace(/\\s+/g, " ")
              .trim();

            if (!line || excludedHebRe.test(line) || excludedStartRe.test(line)) {
              return;
            }
            if (/^\\d{1,2}[./-]\\d{1,2}[./-]\\d{2,4}/.test(line)) {
              return;
            }

            var clean = line
              .replace(currencyStripRe, " ")
              .replace(/^\\d{1,2}[.)]\\s+/, "")
              .replace(/\\s+/g, " ")
              .trim();
            if (!clean) return;

            // 1. 4-Column RTL POS ("36.00 18.00 הפוך גדול 2")
            var m4Rtl = clean.match(
              /^(\\d{1,6}(?:[.,]\\d{1,2})?)\\s+(\\d{1,5}(?:[.,]\\d{1,2})?)\\s+(.+?)(?:\\s+(\\d{1,2}))?$/
            );
            if (m4Rtl && /[A-Za-zА-Яа-яЁё\\u0590-\\u05FF]/.test(m4Rtl[3])) {
              var pA = parseFloat(m4Rtl[1].replace(",", "."));
              var pB = parseFloat(m4Rtl[2].replace(",", "."));
              var unit4 = Math.min(pA, pB);
              var total4 = Math.max(pA, pB);
              var qty4 = m4Rtl[4]
                ? parseInt(m4Rtl[4], 10)
                : unit4 > 0
                  ? Math.round(total4 / unit4)
                  : 1;
              if (
                unit4 > 0 &&
                qty4 >= 1 &&
                Math.abs(unit4 * qty4 - total4) <= 0.06
              ) {
                items.push({
                  item_name: m4Rtl[3].trim(),
                  price: unit4,
                  quantity: qty4,
                });
                return;
              }
            }

            // 2. Standard LTR / Modal format ("[qty x] Dish Name Price")
            var mLtr = clean.match(
              /^(?:(\\d{1,2})\\s*[xX×*]\\s*)?(.+?)\\s+(\\d{1,6}(?:[.,]\\d{1,2})?)$/
            );
            if (
              mLtr &&
              /[A-Za-zА-Яа-яЁё\\u0590-\\u05FF]/.test(mLtr[2]) &&
              !/^\\d+(?:[.,]\\d{1,2})\\b/.test(mLtr[2].trim())
            ) {
              var ltrName = mLtr[2].trim();
              var ltrPrice = parseFloat(mLtr[3].replace(",", "."));
              var ltrQty = mLtr[1] ? parseInt(mLtr[1], 10) : 1;
              if (ltrName && ltrPrice > 0) {
                items.push({
                  item_name: ltrName,
                  price: ltrPrice,
                  quantity: ltrQty,
                });
                return;
              }
            }

            // 3. RTL Price-First format ("58.00 שקשוקה חריפה 1" or "64.00 בירה גולדסטאר 2" or "54 חומוס")
            var mRtl = clean.match(
              /^(\\d{1,6}(?:[.,]\\d{1,2})?)\\s+(.+?)(?:\\s+(?:[xX×*]\\s*)?(\\d{1,2}))?$/
            );
            if (mRtl && /[A-Za-zА-Яа-яЁё\\u0590-\\u05FF]/.test(mRtl[2])) {
              var rtlTotal = parseFloat(mRtl[1].replace(",", "."));
              var rtlName = mRtl[2].trim();
              var rtlQty = mRtl[3] ? parseInt(mRtl[3], 10) : 1;
              if (rtlName && rtlTotal > 0) {
                var rtlUnit = rtlTotal;
                if (
                  rtlQty > 1 &&
                  Math.round(rtlTotal * 100) % rtlQty === 0
                ) {
                  rtlUnit = Number((rtlTotal / rtlQty).toFixed(2));
                } else if (rtlQty > 1) {
                  rtlName = rtlName + " ×" + rtlQty;
                  rtlQty = 1;
                }
                items.push({
                  item_name: rtlName,
                  price: rtlUnit,
                  quantity: rtlQty,
                });
              }
            }
          });

        return { items: items, detectedCurrency: detectedCurrency };
      }

      window.__splittelParseReceiptClient = parseReceiptLinesClientSide;

      // Multi-language client-side Tesseract.js worker (['heb', 'eng', 'rus']) when loaded in browser
      async function runClientTesseractOcr(imageDataUrl) {
        if (
          !imageDataUrl ||
          typeof window.Tesseract === "undefined" ||
          !window.Tesseract ||
          typeof window.Tesseract.createWorker !== "function"
        ) {
          return null;
        }
        var worker = null;
        try {
          worker = await window.Tesseract.createWorker(["heb", "eng", "rus"]);
          var ret = await worker.recognize(imageDataUrl);
          var d = (ret && ret.data) || {};
          return {
            text: String(d.text || ""),
            confidence: typeof d.confidence === "number" ? d.confidence : 0,
          };
        } catch (_clientOcrErr) {
          return null;
        } finally {
          if (worker && typeof worker.terminate === "function") {
            try {
              await worker.terminate();
            } catch (_termErr) {}
          }
        }
      }

      function handleReceiptImageSelected(file) {
        if (!file) return;
        openManualNewBillModal();

        if (previewWrap && previewImg) {
          previewWrap.classList.remove("hidden");
          previewImg.src = URL.createObjectURL(file);
        }

        setOcrLoadingState(true);
        showFormError("");
        if (ocrStatus) {
          ocrStatus.textContent = "Анализ и распознавание чека (OCR)…";
        }

        var curInputForHint = document.getElementById("new-bill-currency-input");
        var currencyHint =
          (curInputForHint && curInputForHint.value) || detectBrowserCurrency();

        prepareReceiptImageDataUrl(file)
          .then(async function (base64Data) {
            if (!base64Data) {
              setOcrLoadingState(false);
              return null;
            }
            var scanPayload = {
              image_base64: base64Data,
              currency_hint: currencyHint,
            };
            return fetch((apiBaseUrl || "") + "/api/receipts/scan", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(scanPayload),
            });
          })
          .then(async function (res) {
            if (!res) return null;
            if (res.status === 429) {
              var limitBody = null;
              try {
                limitBody = await res.json();
              } catch (_e) {}
              return {
                __rateLimited: true,
                error:
                  (limitBody && limitBody.error) ||
                  "Rate limit exceeded. You can scan up to 5 receipts per minute. Please try again in a moment.",
              };
            }
            return res.ok ? res.json() : null;
          })
          .then(function (data) {
            setOcrLoadingState(false);
            if (data && data.__rateLimited) {
              if (ocrStatus) {
                ocrStatus.textContent = "⏳ " + data.error;
              }
              showFormError(data.error);
              return;
            }
            if (data && data.image_url) {
              window.__lastUploadedReceiptImageUrl = data.image_url;
            }
            if (data && data.parsed) {
              var p = data.parsed;
              var titleInput = document.getElementById("new-bill-title-input");
              var itemsText = document.getElementById("new-bill-items-text");
              var taxInput = document.getElementById("new-bill-tax-input");
              var tipInput = document.getElementById("new-bill-tip-input");
              var curInput = document.getElementById("new-bill-currency-input");

              if (titleInput && p.title) {
                titleInput.value = p.title;
              }
              if (curInput && p.detectedCurrency) {
                curInput.value = p.detectedCurrency;
              }
              if (taxInput) {
                taxInput.value = String(p.taxAmount > 0 ? p.taxAmount : 0);
              }
              if (tipInput && p.tipPercentage !== undefined) {
                tipInput.value = String(p.tipPercentage);
              }

              var resolvedItems = Array.isArray(p.items) ? p.items : [];
              if (resolvedItems.length === 0 && p.rawText) {
                var clientFallback = parseReceiptLinesClientSide(
                  p.rawText,
                  p.detectedCurrency || currencyHint
                );
                if (clientFallback.items.length > 0) {
                  resolvedItems = clientFallback.items;
                  if (curInput && clientFallback.detectedCurrency) {
                    curInput.value = clientFallback.detectedCurrency;
                  }
                }
              }

              if (itemsText && resolvedItems.length > 0) {
                itemsText.value = resolvedItems
                  .map(function (item) {
                    return (
                      (item.quantity > 1 ? item.quantity + " x " : "") +
                      item.item_name +
                      " " +
                      item.price
                    );
                  })
                  .join(String.fromCharCode(10));
                showFormError("");
                if (ocrStatus) {
                  ocrStatus.textContent =
                    "✓ Распознано позиций: " + resolvedItems.length;
                }
              } else {
                if (ocrStatus) {
                  ocrStatus.textContent =
                    "Позиции не распознаны автоматически — введите строки чека ниже вручную.";
                }
                if (itemsText) {
                  itemsText.focus();
                }
              }
            } else if (ocrStatus) {
              ocrStatus.textContent =
                "Не удалось распознать текст — введите позиции чека вручную.";
            }
          })
          .catch(function () {
            setOcrLoadingState(false);
            if (ocrStatus) {
              ocrStatus.textContent =
                "Ошибка соединения при распознавании — введите позиции ниже.";
            }
          });
      }

      if (receiptFileInput) {
        receiptFileInput.addEventListener("change", function (e) {
          var file = e.target.files && e.target.files[0];
          handleReceiptImageSelected(file);
        });
      }
      if (receiptGalleryInput) {
        receiptGalleryInput.addEventListener("change", function (e) {
          var file = e.target.files && e.target.files[0];
          handleReceiptImageSelected(file);
        });
      }

      // Reset inline validation message on active typing
      var newBillForm = document.getElementById("new-bill-form");
      var submitNewBillBtn = document.getElementById("submit-new-bill-btn");
      if (newBillForm) {
        newBillForm.addEventListener("input", function () {
          showFormError("");
        });

        newBillForm.addEventListener("submit", async function (event) {
          event.preventDefault();
          showFormError("");

          var titleInput = document.getElementById("new-bill-title-input");
          var currencyInput = document.getElementById("new-bill-currency-input");
          var peopleInput = document.getElementById("new-bill-people-input");
          var itemsText = document.getElementById("new-bill-items-text");
          var tipInput = document.getElementById("new-bill-tip-input");
          var taxInput = document.getElementById("new-bill-tax-input");

          var title = (titleInput && titleInput.value.trim()) || undefined;
          var currency = (currencyInput && currencyInput.value) || detectBrowserCurrency();
          var peopleRaw = (peopleInput && peopleInput.value) || "";
          var people = peopleRaw
            .split(",")
            .map(function (s) {
              return s.trim();
            })
            .filter(Boolean);

          if (people.length === 0) {
            showFormError("Укажите хотя бы одного участника (через запятую).");
            if (peopleInput) peopleInput.focus();
            return;
          }

          var text = (itemsText && itemsText.value.trim()) || "";
          if (!text) {
            showFormError("Добавьте хотя бы одну позицию с ценой или отсканируйте чек.");
            if (itemsText) itemsText.focus();
            return;
          }

          if (submitNewBillBtn) {
            submitNewBillBtn.disabled = true;
            submitNewBillBtn.textContent = "Создание чека…";
          }

          try {
            var localParsed = parseReceiptLinesClientSide(text, currency);
            var rawItems = localParsed.items || [];
            if (
              localParsed.detectedCurrency &&
              (!currencyInput || !currencyInput.value)
            ) {
              currency = localParsed.detectedCurrency;
            }

            if (rawItems.length === 0) {
              var parseRes = await fetch(
                (apiBaseUrl || "") + "/api/receipts/parse",
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ text: text, currency_hint: currency }),
                }
              );
              if (parseRes.status === 429) {
                var rlData = null;
                try {
                  rlData = await parseRes.json();
                } catch (_e) {}
                showFormError(
                  (rlData && rlData.error) ||
                    "Rate limit exceeded. You can scan up to 5 receipts per minute. Please try again in a moment."
                );
                return;
              }
              if (parseRes.ok) {
                var parseData = await parseRes.json();
                rawItems =
                  (parseData && parseData.parsed && parseData.parsed.items) ||
                  [];
              }
            }

            if (rawItems.length === 0) {
              showFormError(
                "Не удалось распознать цены позиций. Укажите строки в формате «Название Цена» или «58.00 שקשוקה»."
              );
              if (itemsText) itemsText.focus();
              return;
            }

            var tipPct = Number(
              tipInput && tipInput.value !== "" ? tipInput.value : 10
            );
            var taxAmt = Number(
              taxInput && taxInput.value !== "" ? taxInput.value : 0
            );

            var createRes = await fetch((apiBaseUrl || "") + "/api/bills/new", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                title: title,
                currency: currency,
                tip_percentage: tipPct,
                tax_amount: taxAmt,
                people: people,
                raw_items: rawItems,
                image_url: window.__lastUploadedReceiptImageUrl || null,
              }),
            });

            if (!createRes.ok) throw new Error("HTTP " + createRes.status);
            var createData = await createRes.json();

            if (createData && createData.bill) {
              window.__lastUploadedReceiptImageUrl = null;
              currentBill = createData.bill;
              if (createData.uiActionToken) {
                uiActionToken = createData.uiActionToken;
              }
              renderAll(currentBill);
              connectRealtimeBillStream(currentBill.bill_id);

              var newUrl = new URL(window.location.href);
              newUrl.searchParams.set("bill_id", currentBill.bill_id);
              window.history.replaceState({}, "", newUrl.toString());

              if (newBillDialog && typeof newBillDialog.close === "function") {
                newBillDialog.close();
              }
              showStatusBanner(
                "Чек «" +
                  currentBill.title +
                  "» создан! Отметьте участников напротив позиций."
              );
            }
          } catch (err) {
            showFormError(
              "Ошибка при создании чека: " +
                (err && err.message ? err.message : err)
            );
          } finally {
            if (submitNewBillBtn) {
              submitNewBillBtn.disabled = false;
              submitNewBillBtn.textContent = "Создать и разделить чек";
            }
          }
        });
      }

      // Share Link button (Scenario C: Group Link Sharing)
      var shareLinkBtn = document.getElementById("copy-share-link-btn");
      if (shareLinkBtn) {
        shareLinkBtn.addEventListener("click", function () {
          var shareUrl =
            (currentBill && currentBill.share_url) || window.location.href;
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(shareUrl).then(function () {
              showStatusBanner("Group share link copied: " + shareUrl);
            }).catch(function () {
              showStatusBanner("Share URL: " + shareUrl);
            });
          } else {
            showStatusBanner("Share URL: " + shareUrl);
          }
        });
      }

      // Open SBP QR & Payment Link Modal
      function openPaymentModal(share, currency) {
        if (!paymentQrDialog || typeof paymentQrDialog.showModal !== "function") {
          if (share.payment && share.payment.pay_url) {
            window.open(share.payment.pay_url, "_blank", "noopener,noreferrer");
          }
          return;
        }

        var subtitleEl = document.getElementById("payment-qr-subtitle");
        var qrImgEl = document.getElementById("payment-qr-img");
        var sbpLinkEl = document.getElementById("payment-sbp-link");
        var stripeLinkEl = document.getElementById("payment-stripe-link");

        var settleCur = String(share.settlement_currency || currency || "RUB").toUpperCase();
        var origCur = String(currency || "RUB").toUpperCase();
        if (subtitleEl) {
          subtitleEl.textContent =
            settleCur !== origCur
              ? share.person + " — " + formatMoney(share.settlement_total_owed, settleCur) + " (" + formatMoney(share.total_owed, origCur) + ")"
              : share.person + " — " + formatMoney(share.total_owed, origCur);
        }
        if (qrImgEl && share.payment && share.payment.qr_code_data_uri) {
          qrImgEl.src = share.payment.qr_code_data_uri;
        }
        if (sbpLinkEl && share.payment) {
          sbpLinkEl.href = share.payment.sbp_link || share.payment.pay_url || "#";
        }
        if (stripeLinkEl && share.payment) {
          stripeLinkEl.href = share.payment.stripe_link || share.payment.pay_url || "#";
        }

        paymentQrDialog.showModal();
      }

      // Confirmation modal logic for standalone toggle Paid / Cancelled
      var activeDialogResolver = null;
      var cancelBtn = document.getElementById("confirm-cancel-btn");
      var approveBtn = document.getElementById("confirm-approve-btn");

      if (cancelBtn && confirmDialog) {
        cancelBtn.addEventListener("click", function () {
          confirmDialog.close("cancel");
        });
      }
      if (approveBtn && confirmDialog) {
        approveBtn.addEventListener("click", function () {
          confirmDialog.close("confirm");
        });
      }
      if (confirmDialog) {
        confirmDialog.addEventListener("close", function () {
          if (activeDialogResolver) {
            var resolve = activeDialogResolver;
            activeDialogResolver = null;
            resolve(confirmDialog.returnValue === "confirm");
          }
        });
      }

      function promptStandaloneConfirmation(share, nextStatus) {
        if (!confirmDialog || typeof confirmDialog.showModal !== "function") {
          return Promise.resolve(true);
        }
        var copyEl = document.getElementById("confirm-dialog-copy");
        if (copyEl) {
          copyEl.textContent =
            nextStatus === "PAID"
              ? "Mark " + share.person + " (" + formatMoney(share.total_owed, currentBill && currentBill.currency) + ") as PAID?"
              : "Revert " + share.person + "'s payment status to CANCELLED?";
        }
        confirmDialog.returnValue = "";
        confirmDialog.showModal();
        return new Promise(function (resolve) {
          activeDialogResolver = resolve;
        });
      }

      async function handleTogglePaid(share, buttonEl) {
        if (!share) return;
        var nextStatus = share.status === "PAID" ? "CANCELLED" : "PAID";
        var prevLabel = buttonEl.textContent;
        buttonEl.disabled = true;
        buttonEl.textContent = "Updating…";

        try {
          if (mcpHostConnected) {
            var rpcResult = await sendRpcRequest(
              "tools/call",
              {
                name: "settle_up_action",
                arguments: {
                  transaction_id: share.transaction_id,
                  status: nextStatus
                }
              },
              30000
            );

            if (rpcResult && rpcResult.isError) {
              throw new Error("Host rejected settlement action");
            }
            if (rpcResult && rpcResult.structuredContent && rpcResult.structuredContent.updated_bill) {
              renderAll(rpcResult.structuredContent.updated_bill);
            } else {
              share.status = nextStatus;
              renderAll(currentBill);
            }
            showStatusBanner(share.person + " marked as " + nextStatus + ".");
            return;
          }

          var confirmed = await promptStandaloneConfirmation(share, nextStatus);
          if (!confirmed) {
            buttonEl.disabled = false;
            buttonEl.textContent = prevLabel;
            return;
          }

          var endpoint = (apiBaseUrl || "") + "/api/ui/settle";
          var resp = await fetch(endpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Splittel-UI-Token": uiActionToken
            },
            body: JSON.stringify({
              bill_id: currentBill.bill_id,
              transaction_id: share.transaction_id,
              status: nextStatus
            })
          });

          if (!resp.ok) {
            throw new Error("HTTP " + resp.status);
          }

          var data = await resp.json();
          if (data && data.updated_bill) {
            renderAll(data.updated_bill);
          } else {
            share.status = nextStatus;
            renderAll(currentBill);
          }
          showStatusBanner(share.person + " status updated to " + nextStatus + ".");
        } catch (_err) {
          buttonEl.disabled = false;
          buttonEl.textContent = prevLabel;
          showStatusBanner("Could not update payment status.");
        }
      }

      // Listen for MCP Host Notifications
      function extractBillFromToolResult(payload) {
        if (!payload || typeof payload !== "object") return null;
        if (payload.structuredContent && payload.structuredContent.bill) {
          return payload.structuredContent.bill;
        }
        if (payload.structuredContent && payload.structuredContent.people_shares) {
          return payload.structuredContent;
        }
        if (payload._meta && payload._meta.bill) {
          return payload._meta.bill;
        }
        return null;
      }

      window.addEventListener("message", function (event) {
        var msg = event.data;
        if (!msg || typeof msg !== "object" || msg.jsonrpc !== "2.0") return;

        if (msg.id !== undefined && pendingRpc.has(msg.id)) {
          var entry = pendingRpc.get(msg.id);
          pendingRpc.delete(msg.id);
          clearTimeout(entry.timer);
          if (msg.error) {
            entry.reject(new Error(msg.error.message || "RPC Error"));
          } else {
            entry.resolve(msg.result);
          }
          return;
        }

        if (msg.method === "ui/notifications/tool-result") {
          var nextBill = extractBillFromToolResult(msg.params);
          if (nextBill) {
            if (msg.params && msg.params._meta && msg.params._meta.uiActionToken) {
              uiActionToken = msg.params._meta.uiActionToken;
            }
            renderAll(nextBill);
            connectRealtimeBillStream(nextBill.bill_id);
          }
        } else if (msg.method === "ui/notifications/host-context-changed") {
          if (msg.params && msg.params.theme) {
            applyHostTheme(msg.params.theme);
          }
        } else if (msg.method === "ui/resource-teardown" && msg.id !== undefined) {
          window.parent.postMessage({ jsonrpc: "2.0", id: msg.id, result: {} }, "*");
        }
      });

      function notifyResize() {
        if (!mcpHostConnected) return;
        var height = Math.ceil(document.documentElement.scrollHeight);
        sendRpcNotification("ui/notifications/size-changed", { height: height });
      }

      if (typeof ResizeObserver !== "undefined") {
        var ro = new ResizeObserver(function () {
          notifyResize();
        });
        ro.observe(document.body);
      }

      var activeBillEventSource = null;
      function connectRealtimeBillStream(billId) {
        if (!billId || typeof EventSource === "undefined") return;
        try {
          if (activeBillEventSource) {
            activeBillEventSource.close();
            activeBillEventSource = null;
          }
          var streamUrl = (apiBaseUrl || "") + "/api/bills/" + encodeURIComponent(billId) + "/events";
          var es = new EventSource(streamUrl);
          es.addEventListener("bill_update", function (ev) {
            try {
              var payload = JSON.parse(ev.data);
              if (payload && payload.bill && (!currentBill || payload.bill.bill_id === currentBill.bill_id)) {
                currentBill = payload.bill;
                renderAll(currentBill);
              }
            } catch (_err) {}
          });
          es.onerror = function () {
            es.close();
          };
          activeBillEventSource = es;
        } catch (_e) {}
      }

      if (currentBill) {
        renderAll(currentBill);
        connectRealtimeBillStream(currentBill.bill_id);
      } else {
        syncEmptyVsActiveVisibility(false);
      }

      if (isEmbedded) {
        sendRpcRequest(
          "ui/initialize",
          {
            protocolVersion: "2025-06-18",
            appInfo: { name: "Splittel Bill Board", version: "1.0.0" },
            appCapabilities: {}
          },
          1500
        )
          .then(function (initResult) {
            mcpHostConnected = true;
            if (initResult && initResult.hostContext && initResult.hostContext.theme) {
              applyHostTheme(initResult.hostContext.theme);
            }
            sendRpcNotification("ui/notifications/initialized", {});
            notifyResize();
          })
          .catch(function () {
            mcpHostConnected = false;
          });
      }
    })();
  </script>
</body>
</html>`;
}
