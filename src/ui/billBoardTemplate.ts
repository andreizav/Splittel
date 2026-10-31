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
  billId?: string;
  uiActionToken: string;
  apiBaseUrl: string;
  initialTheme?: "light" | "dark";
  isGuest?: boolean;
  anonUserId?: string;
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

  const effectiveBillId = options.billId || options.bill?.bill_id || "";
  const isGuest = options.isGuest ?? true;

  const bootstrapPayload = escapeJsonForScriptTag({
    bill: options.bill,
    billId: effectiveBillId,
    uiActionToken: options.uiActionToken,
    apiBaseUrl: options.apiBaseUrl.replace(/\/+$/, ""),
    isGuest,
    anonUserId: options.anonUserId,
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
                id="share-whatsapp-btn"
                class="${hasInitialBill || effectiveBillId ? "" : "hidden "}cursor-pointer inline-flex items-center gap-1.5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white px-3 py-1 text-xs font-bold shadow-xs transition active:scale-95"
                title="Открыть WhatsApp и отправить ссылку друзьям для выбора блюд"
              >
                <svg class="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.031 2C6.495 2 2 6.495 2 12.031c0 1.768.46 3.493 1.332 5.006L2 22l5.127-1.344a10.015 10.015 0 0 0 4.904 1.282h.005c5.535 0 10.03-4.496 10.03-10.031 0-2.68-1.043-5.2-2.937-7.094A10.007 10.007 0 0 0 12.031 2zm0 18.326h-.004a8.318 8.318 0 0 1-4.24-1.162l-.304-.18-3.153.827.842-3.073-.198-.315a8.337 8.337 0 0 1-1.277-4.423c0-4.594 3.738-8.332 8.336-8.332 2.226 0 4.318.868 5.892 2.443a8.307 8.307 0 0 1 2.441 5.891c0 4.595-3.738 8.333-8.336 8.333zm4.568-6.237c-.25-.125-1.48-.73-1.71-.813-.23-.083-.396-.125-.562.125-.167.25-.646.813-.792.98-.146.166-.292.187-.542.062s-1.06-.391-2.019-1.246c-.747-.666-1.251-1.488-1.397-1.738-.146-.25-.016-.385.11-.51.113-.112.25-.292.375-.438.125-.146.167-.25.25-.417.084-.167.042-.313-.02-.438s-.563-1.355-.772-1.855c-.203-.488-.41-.422-.563-.43l-.479-.008c-.167 0-.438.063-.667.313-.23.25-.875.855-.875 2.084s.896 2.418 1.021 2.585c.125.166 1.763 2.693 4.272 3.777.597.258 1.064.412 1.428.528.6.191 1.146.164 1.577.1.48-.072 1.48-.605 1.688-1.189.208-.584.208-1.084.146-1.189-.062-.104-.229-.167-.479-.292z"/>
                </svg>
                <span>В WhatsApp 💬 (разделить счёт)</span>
              </button>
              <button
                type="button"
                id="copy-share-link-btn"
                class="${hasInitialBill || effectiveBillId ? "" : "hidden "}cursor-pointer inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold transition hover:bg-emerald-500/10 hover:border-emerald-500"
                style="border-color: var(--border-subtle);"
                title="Скопировать ссылку на чек"
              >
                <span>🔗</span>
                <span>Копировать ссылку</span>
              </button>
            </div>
            <h1 id="bill-title" dir="auto" class="bidi-plaintext fluid-bill-title truncate font-bold tracking-tight">${initialTitle
              .replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")}</h1>
            <p id="bill-meta" class="secondary-copy text-xs">${
              hasInitialBill ? "" : "Нажмите «Сканировать чек 📷», чтобы сфотографировать чек"
            }</p>
          </div>

          <div id="header-metrics-wrap" class="hidden"></div>
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
        <!-- Auth Status Container (Guest vs Logged In) -->
        <div id="auth-status-container" class="space-y-2">
          <div id="guest-auth-banner" class="${isGuest ? "flex" : "hidden"} flex-wrap items-center justify-between gap-3 px-4 py-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-xs text-emerald-900 dark:text-emerald-200">
            <div class="flex items-center gap-2">
              <span class="text-base" aria-hidden="true">👋</span>
              <span>Вы в режиме <strong>Гостя</strong>. Войдите через Google, чтобы сохранять историю ваших счетов и чеков.</span>
            </div>
            <button
              type="button"
              id="open-google-login-btn"
              class="cursor-pointer shrink-0 inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 px-3.5 py-1.5 font-bold text-white shadow-xs transition active:scale-95"
            >
              <svg class="h-3.5 w-3.5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#ffffff"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#ffffff"/>
              </svg>
              <span>Войти через Google</span>
            </button>
          </div>
          <div id="logged-user-banner" class="${isGuest ? "hidden" : "flex"} flex-wrap items-center justify-between gap-3 px-4 py-2.5 rounded-xl border border-blue-500/30 bg-blue-500/10 text-xs text-blue-900 dark:text-blue-200">
            <div class="flex items-center gap-2">
              <span class="text-base" aria-hidden="true">👤</span>
              <span>Вы вошли как: <strong id="logged-user-name">Пользователь</strong> (<span id="logged-user-email">email</span>)</span>
            </div>
            <div class="flex items-center gap-2">
              <button
                type="button"
                id="open-user-history-btn"
                class="cursor-pointer rounded-lg bg-blue-600 hover:bg-blue-500 px-3 py-1 font-bold text-white shadow-xs transition"
              >
                📜 Мои счёта
              </button>
              <button
                type="button"
                id="logout-btn"
                class="cursor-pointer rounded-lg border border-blue-400 hover:bg-blue-500/20 px-2.5 py-1 font-semibold transition"
              >
                Выйти
              </button>
            </div>
          </div>
        </div>

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
            Нажмите кнопку <strong>«Сканировать чек 📷»</strong> внизу экрана — откроется камера смартфона, а позиции и цены распознаются автоматически.
          </p>
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
                <p class="secondary-copy text-xs">Нажмите на блюдо или «+ Я ел(а)», чтобы отметить его за собой.</p>
              </div>
              <div id="participant-indicator-wrap" class="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs">
                <span>👤 Отмечаете как:</span>
                <strong id="active-participant-name" class="text-emerald-700 dark:text-emerald-300">Гость</strong>
                <button type="button" id="edit-participant-name-btn" class="cursor-pointer underline text-[11px] text-emerald-600 hover:text-emerald-500 ml-1">изменить</button>
              </div>
            </div>
            <div id="dish-matrix-list" class="divide-y" style="border-color: var(--border-subtle);"></div>
          </section>

          <!-- Summary Cards per Person -->
          <section aria-labelledby="summary-cards-heading" class="space-y-3">
            <h2 id="summary-cards-heading" class="text-sm font-bold sm:text-base">Summary per Person</h2>
            <div id="cards-grid" class="check-matrix-grid"></div>
          </section>

          <!-- WhatsApp Sharing Call-to-Action Card -->
          <section
            aria-labelledby="share-cta-heading"
            class="surface-card rounded-2xl border p-4 text-center sm:p-6 shadow-xs"
            style="border-color: var(--border-subtle);"
          >
            <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#25D366]/15 text-2xl" aria-hidden="true">
              💬
            </div>
            <h3 id="share-cta-heading" class="mt-2 text-sm font-bold sm:text-base">
              Разделите этот счёт с друзьями в WhatsApp
            </h3>
            <p class="secondary-copy mx-auto mt-1 max-w-md text-xs leading-relaxed">
              Отправьте ссылку друзьям в WhatsApp — они откроют её со своих смартфонов и сразу смогут отметить блюда, которые заказывали.
            </p>
            <div class="mt-3.5 flex flex-wrap items-center justify-center gap-2.5">
              <button
                type="button"
                id="bottom-whatsapp-share-btn"
                class="cursor-pointer inline-flex items-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white px-5 py-2.5 text-xs sm:text-sm font-bold shadow-xs transition active:scale-95"
              >
                <svg class="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.031 2C6.495 2 2 6.495 2 12.031c0 1.768.46 3.493 1.332 5.006L2 22l5.127-1.344a10.015 10.015 0 0 0 4.904 1.282h.005c5.535 0 10.03-4.496 10.03-10.031 0-2.68-1.043-5.2-2.937-7.094A10.007 10.007 0 0 0 12.031 2zm0 18.326h-.004a8.318 8.318 0 0 1-4.24-1.162l-.304-.18-3.153.827.842-3.073-.198-.315a8.337 8.337 0 0 1-1.277-4.423c0-4.594 3.738-8.332 8.336-8.332 2.226 0 4.318.868 5.892 2.443a8.307 8.307 0 0 1 2.441 5.891c0 4.595-3.738 8.333-8.336 8.333zm4.568-6.237c-.25-.125-1.48-.73-1.71-.813-.23-.083-.396-.125-.562.125-.167.25-.646.813-.792.98-.146.166-.292.187-.542.062s-1.06-.391-2.019-1.246c-.747-.666-1.251-1.488-1.397-1.738-.146-.25-.016-.385.11-.51.113-.112.25-.292.375-.438.125-.146.167-.25.25-.417.084-.167.042-.313-.02-.438s-.563-1.355-.772-1.855c-.203-.488-.41-.422-.563-.43l-.479-.008c-.167 0-.438.063-.667.313-.23.25-.875.855-.875 2.084s.896 2.418 1.021 2.585c.125.166 1.763 2.693 4.272 3.777.597.258 1.064.412 1.428.528.6.191 1.146.164 1.577.1.48-.072 1.48-.605 1.688-1.189.208-.584.208-1.084.146-1.189-.062-.104-.229-.167-.479-.292z"/>
                </svg>
                <span>Отправить в WhatsApp 💬</span>
              </button>
              <button
                type="button"
                id="bottom-copy-share-btn"
                class="muted-panel cursor-pointer inline-flex items-center gap-1.5 rounded-xl border px-4 py-2.5 text-xs sm:text-sm font-semibold transition hover:opacity-85"
                style="border-color: var(--border-subtle);"
              >
                <span>🔗</span>
                <span>Скопировать ссылку</span>
              </button>
            </div>
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
    <div class="modal-grab-handle sm:hidden" aria-hidden="true"></div>
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

      <!-- OCR Status Banner (hidden until photo taken/selected; photo preview removed) -->
      <div id="receipt-preview-wrap" class="hidden rounded-xl border p-2.5 text-center" style="border-color: var(--border-subtle);">
        <div class="inline-flex items-center justify-center gap-2 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
          <span id="receipt-ocr-spinner" class="ocr-spinner hidden" aria-hidden="true"></span>
          <span id="receipt-ocr-status" role="status" aria-live="polite"></span>
        </div>
      </div>

      <!-- Title & Hidden Currency -->
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
        <input type="hidden" id="new-bill-currency-input" name="currency" value="RUB">
      </div>

      <!-- Participant Count Selector (1 to 10 buttons) -->
      <div>
        <label class="mb-1.5 block font-semibold">Количество участников:</label>
        <div id="participant-count-pills" class="flex flex-wrap items-center gap-1.5" role="radiogroup" aria-label="Количество участников">
          <button type="button" data-count="1" class="participant-count-btn cursor-pointer rounded-xl border px-3 py-1.5 text-xs font-bold transition hover:border-emerald-500" aria-pressed="false">1</button>
          <button type="button" data-count="2" class="participant-count-btn cursor-pointer rounded-xl border border-emerald-600 bg-emerald-600 text-white font-bold px-3 py-1.5 text-xs transition shadow-xs" aria-pressed="true">2</button>
          <button type="button" data-count="3" class="participant-count-btn cursor-pointer rounded-xl border px-3 py-1.5 text-xs font-bold transition hover:border-emerald-500" aria-pressed="false">3</button>
          <button type="button" data-count="4" class="participant-count-btn cursor-pointer rounded-xl border px-3 py-1.5 text-xs font-bold transition hover:border-emerald-500" aria-pressed="false">4</button>
          <button type="button" data-count="5" class="participant-count-btn cursor-pointer rounded-xl border px-3 py-1.5 text-xs font-bold transition hover:border-emerald-500" aria-pressed="false">5</button>
          <button type="button" data-count="6" class="participant-count-btn cursor-pointer rounded-xl border px-3 py-1.5 text-xs font-bold transition hover:border-emerald-500" aria-pressed="false">6</button>
          <button type="button" data-count="7" class="participant-count-btn cursor-pointer rounded-xl border px-3 py-1.5 text-xs font-bold transition hover:border-emerald-500" aria-pressed="false">7</button>
          <button type="button" data-count="8" class="participant-count-btn cursor-pointer rounded-xl border px-3 py-1.5 text-xs font-bold transition hover:border-emerald-500" aria-pressed="false">8</button>
          <button type="button" data-count="9" class="participant-count-btn cursor-pointer rounded-xl border px-3 py-1.5 text-xs font-bold transition hover:border-emerald-500" aria-pressed="false">9</button>
          <button type="button" data-count="10" class="participant-count-btn cursor-pointer rounded-xl border px-3 py-1.5 text-xs font-bold transition hover:border-emerald-500" aria-pressed="false">10</button>
        </div>
        <input type="hidden" id="new-bill-people-input" name="people" value="Человек 1, Человек 2" required>
        <p class="secondary-copy mt-1 text-[11px]">Нажмите цифру, чтобы выбрать количество участников (выбрано: <strong id="selected-participant-count-text">2</strong>).</p>
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
    <div class="modal-grab-handle sm:hidden" aria-hidden="true"></div>
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
    <div class="modal-grab-handle sm:hidden" aria-hidden="true"></div>

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

  <!-- Light-Dismiss Google Sign-In Dialog -->
  <dialog
    id="google-login-dialog"
    closedby="any"
    aria-labelledby="google-login-title"
    class="splittel-modal m-auto w-[min(94vw,28rem)] rounded-2xl p-5 shadow-2xl"
  >
    <div class="modal-grab-handle sm:hidden" aria-hidden="true"></div>

    <div class="flex items-start justify-between gap-2 border-b pb-3" style="border-color: var(--border-subtle);">
      <div class="flex items-center gap-2.5">
        <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
          <svg class="h-5 w-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
          </svg>
        </div>
        <div>
          <h2 id="google-login-title" class="text-base font-bold">Вход через Google</h2>
          <p class="secondary-copy text-xs">Сохранение истории счетов и чеков</p>
        </div>
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

    <div class="mt-4 space-y-4 text-xs">
      <p class="secondary-copy leading-relaxed">
        Войдите через Google, чтобы ваши чеки сохранялись в личной истории, были доступны на всех ваших устройствах и открывались по защищённому OAuth 2.1 протоколу.
      </p>

      <form id="google-login-form" class="space-y-3" novalidate>
        <div id="google-login-error" class="hidden rounded-lg bg-rose-500/10 border border-rose-500/30 p-2.5 text-rose-600 dark:text-rose-400 font-medium"></div>

        <div>
          <label for="google-email-input" class="secondary-copy mb-1 block font-semibold uppercase tracking-wider text-[10px]">
            Google Email:
          </label>
          <input
            type="email"
            id="google-email-input"
            required
            placeholder="например: user@gmail.com"
            class="muted-panel w-full rounded-xl border px-3 py-2 text-xs font-medium"
            style="border-color: var(--border-subtle);"
          >
        </div>

        <div>
          <label for="google-name-input" class="secondary-copy mb-1 block font-semibold uppercase tracking-wider text-[10px]">
            Ваше имя:
          </label>
          <input
            type="text"
            id="google-name-input"
            placeholder="например: Андрей"
            class="muted-panel w-full rounded-xl border px-3 py-2 text-xs font-medium"
            style="border-color: var(--border-subtle);"
          >
        </div>

        <button
          type="submit"
          id="google-login-submit-btn"
          class="cursor-pointer flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 text-xs font-bold shadow-xs transition active:scale-98"
        >
          <svg class="h-4 w-4" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#ffffff"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#ffffff"/>
          </svg>
          <span>Войти через Google Аккаунт</span>
        </button>
      </form>
    </div>
  </dialog>

  <!-- Light-Dismiss User History Dialog -->
  <dialog
    id="user-history-dialog"
    closedby="any"
    aria-labelledby="user-history-title"
    class="splittel-modal m-auto w-[min(94vw,34rem)] rounded-2xl p-5 shadow-2xl"
  >
    <div class="modal-grab-handle sm:hidden" aria-hidden="true"></div>

    <div class="flex items-start justify-between gap-2 border-b pb-3" style="border-color: var(--border-subtle);">
      <div>
        <div class="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">История счетов</div>
        <h2 id="user-history-title" class="mt-0.5 text-base font-bold">Мои сохранённые чеки</h2>
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

    <div class="mt-4 space-y-3 text-xs">
      <div id="user-history-list" class="divide-y max-h-80 overflow-y-auto" style="border-color: var(--border-subtle);">
        <p class="secondary-copy py-6 text-center">Загрузка истории…</p>
      </div>
    </div>
  </dialog>

  <!-- Light-Dismiss Participant Name Dialog -->
  <dialog
    id="set-name-dialog"
    closedby="any"
    aria-labelledby="set-name-title"
    class="splittel-modal m-auto w-[min(92vw,24rem)] rounded-2xl p-5 shadow-2xl"
  >
    <div class="modal-grab-handle sm:hidden" aria-hidden="true"></div>

    <div class="flex items-start justify-between gap-2 border-b pb-3" style="border-color: var(--border-subtle);">
      <div>
        <h2 id="set-name-title" class="text-base font-bold">Как вас зовут?</h2>
        <p class="secondary-copy text-xs">Друзья увидят ваше имя рядом с отмеченными блюдами</p>
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

    <form id="set-name-form" class="mt-4 space-y-3 text-xs" novalidate>
      <div>
        <label for="participant-name-input" class="secondary-copy mb-1 block font-semibold uppercase tracking-wider text-[10px]">
          Ваше имя:
        </label>
        <input
          type="text"
          id="participant-name-input"
          required
          placeholder="например: Давид, Катя, Миша"
          class="muted-panel w-full rounded-xl border px-3 py-2 text-xs font-bold"
          style="border-color: var(--border-subtle);"
        >
      </div>

      <button
        type="submit"
        class="cursor-pointer w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 text-xs font-bold shadow-xs transition active:scale-98"
      >
        Сохранить имя
      </button>
    </form>
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
      var googleLoginDialog = document.getElementById("google-login-dialog");
      var userHistoryDialog = document.getElementById("user-history-dialog");
      var setNameDialog = document.getElementById("set-name-dialog");
      attachDialogLightDismissFallback(confirmDialog);
      attachDialogLightDismissFallback(paymentQrDialog);
      attachDialogLightDismissFallback(newBillDialog);
      attachDialogLightDismissFallback(googleLoginDialog);
      attachDialogLightDismissFallback(userHistoryDialog);
      attachDialogLightDismissFallback(setNameDialog);

      // 3. Hydrate initial state
      var bootstrapEl = document.getElementById("splittel-bootstrap");
      var bootstrap = bootstrapEl ? JSON.parse(bootstrapEl.textContent || "{}") : {};
      var currentBill = bootstrap.bill || null;
      var uiActionToken = bootstrap.uiActionToken || "";
      var apiBaseUrl = bootstrap.apiBaseUrl || "";

      // Section 2 & 3: Guest vs Registered identity & co-claiming user session
      var safeStorage = null;
      try {
        if (typeof window !== "undefined" && window.localStorage) {
          safeStorage = window.localStorage;
        } else if (typeof localStorage !== "undefined") {
          safeStorage = localStorage;
        }
      } catch (_e) {}

      var currentUserId =
        bootstrap.anonUserId ||
        (safeStorage ? safeStorage.getItem("splittel_user_id") : null) ||
        ("user_" + Math.random().toString(36).substring(2, 10));
      if (safeStorage) {
        try {
          safeStorage.setItem("splittel_user_id", currentUserId);
        } catch (_e) {}
      }

      var currentUserName = "";
      if (safeStorage) {
        try {
          currentUserName = safeStorage.getItem("splittel_user_name") || "";
        } catch (_e) {}
      }

      if (
        !params.get("bill_id") &&
        bootstrap.billId &&
        typeof window !== "undefined" &&
        window.history &&
        typeof window.history.replaceState === "function"
      ) {
        try {
          var newSearch = new URLSearchParams(window.location.search);
          newSearch.set("bill_id", bootstrap.billId);
          window.history.replaceState(
            {},
            "",
            window.location.pathname + "?" + newSearch.toString()
          );
        } catch (_e) {}
      }

      var CLAIMANT_COLORS = [
        "border-emerald-500/30 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
        "border-sky-500/30 bg-sky-500/15 text-sky-700 dark:text-sky-300",
        "border-indigo-500/30 bg-indigo-500/15 text-indigo-700 dark:text-indigo-300",
        "border-amber-500/30 bg-amber-500/15 text-amber-700 dark:text-amber-300",
        "border-rose-500/30 bg-rose-500/15 text-rose-700 dark:text-rose-300",
        "border-purple-500/30 bg-purple-500/15 text-purple-700 dark:text-purple-300",
        "border-teal-500/30 bg-teal-500/15 text-teal-700 dark:text-teal-300"
      ];

      function getClaimantBadgeClass(name, fallbackIdx) {
        var str = String(name || "");
        if (!str) return CLAIMANT_COLORS[fallbackIdx % CLAIMANT_COLORS.length];
        var hash = 0;
        for (var i = 0; i < str.length; i++) {
          hash = (hash << 5) - hash + str.charCodeAt(i);
          hash |= 0;
        }
        var idx = Math.abs(hash) % CLAIMANT_COLORS.length;
        return CLAIMANT_COLORS[idx];
      }

      function updateParticipantDisplay() {
        var nameEl = document.getElementById("active-participant-name");
        if (nameEl) {
          nameEl.textContent = currentUserName || "Гость";
        }
      }

      var onParticipantNameSavedCallback = null;
      function promptParticipantName(callback) {
        var dlg = document.getElementById("set-name-dialog");
        var input = document.getElementById("participant-name-input");
        if (input) {
          input.value = currentUserName && currentUserName.indexOf("Гость-") !== 0 ? currentUserName : "";
        }
        if (dlg && typeof dlg.showModal === "function") {
          onParticipantNameSavedCallback = callback;
          dlg.showModal();
          if (input) setTimeout(function () { input.focus(); }, 50);
        } else {
          var entered = window.prompt("Введите ваше имя для отметки блюд в счёте:", currentUserName || "Гость");
          if (entered && entered.trim()) {
            currentUserName = entered.trim();
            if (safeStorage) safeStorage.setItem("splittel_user_name", currentUserName);
            updateParticipantDisplay();
          }
          if (typeof callback === "function") callback();
        }
      }

      var setNameForm = document.getElementById("set-name-form");
      if (setNameForm) {
        setNameForm.addEventListener("submit", function (e) {
          e.preventDefault();
          var input = document.getElementById("participant-name-input");
          var entered = input ? input.value.trim() : "";
          if (entered) {
            currentUserName = entered;
            if (safeStorage) safeStorage.setItem("splittel_user_name", currentUserName);
            updateParticipantDisplay();
          }
          var dlg = document.getElementById("set-name-dialog");
          if (dlg) dlg.close();
          if (typeof onParticipantNameSavedCallback === "function") {
            var cb = onParticipantNameSavedCallback;
            onParticipantNameSavedCallback = null;
            cb();
          }
        });
      }

      var editParticipantBtn = document.getElementById("edit-participant-name-btn");
      if (editParticipantBtn) {
        editParticipantBtn.addEventListener("click", function () {
          promptParticipantName(function () {
            showStatusBanner("Имя обновлено: " + currentUserName);
          });
        });
      }

      function executeClaimRequest(dishIdOrName) {
        if (!currentBill || !currentBill.bill_id) return;
        var url = (apiBaseUrl || "") + "/api/bills/" + encodeURIComponent(currentBill.bill_id) + "/claim";
        var headers = {
          "Content-Type": "application/json",
          "X-Splittel-Anon-User-Id": currentUserId
        };
        var token = safeStorage ? safeStorage.getItem("splittel_oauth_token") : null;
        if (token) {
          headers["Authorization"] = "Bearer " + token;
        }

        fetch(url, {
          method: "POST",
          headers: headers,
          body: JSON.stringify({
            item_id: dishIdOrName,
            user_id: currentUserId,
            user_name: currentUserName || "Гость",
            action: "toggle"
          })
        })
          .then(function (res) {
            if (!res.ok) throw new Error("Claim failed with status " + res.status);
            return res.json();
          })
          .then(function (data) {
            if (data && data.bill) {
              currentBill = data.bill;
              renderAll(currentBill);
              showStatusBanner("Выбор блюда сохранён");
            }
          })
          .catch(function (err) {
            console.error("Co-claim error:", err);
            showStatusBanner("Не удалось обновить выбор блюда");
          });
      }

      function toggleDishClaim(dishIdOrName) {
        if (!currentBill || !currentBill.bill_id) return;
        if (!currentUserName || !currentUserName.trim() || currentUserName.indexOf("Гость-") === 0) {
          promptParticipantName(function () {
            executeClaimRequest(dishIdOrName);
          });
          return;
        }
        executeClaimRequest(dishIdOrName);
      }

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
        var waBtnEl = document.getElementById("share-whatsapp-btn");

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
        if (waBtnEl) waBtnEl.classList.toggle("hidden", !hasBill);
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

        // Render Section 2: Itemized Interactive Matrix with Co-Claiming & Badges
        var matrixListEl = document.getElementById("dish-matrix-list");
        if (matrixListEl) {
          var matrixFrag = document.createDocumentFragment();
          var people = bill.people || bill.people_shares.map(function (s) { return s.person; });

          (bill.raw_items || []).forEach(function (dish) {
            var row = document.createElement("div");
            row.className =
              "flex flex-col justify-between gap-3 py-3.5 sm:flex-row sm:items-center rounded-2xl px-3 transition hover:bg-slate-500/5 active:bg-slate-500/10 cursor-pointer";

            // Left column: Dish name, quantity & price + Claimed Badges
            var left = document.createElement("div");
            left.className = "flex flex-col gap-1 sm:max-w-[55%]";

            var titlePriceRow = document.createElement("div");
            titlePriceRow.className = "flex items-baseline justify-between gap-3 sm:justify-start";

            var dishTitle = document.createElement("span");
            dishTitle.dir = "auto";
            dishTitle.className = "bidi-plaintext text-xs font-semibold sm:text-sm";
            dishTitle.textContent =
              dish.item_name + (dish.quantity > 1 ? " ×" + dish.quantity : "");

            var dishPrice = document.createElement("span");
            dishPrice.className = "secondary-copy text-xs font-bold tabular-nums sm:text-sm";
            dishPrice.textContent = formatMoney(dish.line_total, currency);

            titlePriceRow.appendChild(dishTitle);
            titlePriceRow.appendChild(dishPrice);
            left.appendChild(titlePriceRow);

            // SECTION 4.2: Claimed Dishes Visual Badges
            if (dish.claimedBy && Array.isArray(dish.claimedBy) && dish.claimedBy.length > 0) {
              var claimantsWrap = document.createElement("div");
              claimantsWrap.className = "claimants-badges flex flex-wrap items-center gap-1.5 mt-0.5";
              dish.claimedBy.forEach(function (claimant, cIdx) {
                var cBadge = document.createElement("span");
                cBadge.className =
                  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold border " +
                  getClaimantBadgeClass(claimant.userName, cIdx);
                var cIcon = document.createElement("span");
                cIcon.setAttribute("aria-hidden", "true");
                cIcon.textContent = "👤";
                var cName = document.createElement("span");
                cName.dir = "auto";
                cName.textContent = claimant.userName;
                cBadge.appendChild(cIcon);
                cBadge.appendChild(cName);
                claimantsWrap.appendChild(cBadge);
              });
              left.appendChild(claimantsWrap);
            }

            // Right column: Co-claim button + Avatar chips for each friend
            var chipsWrap = document.createElement("div");
            chipsWrap.className = "flex flex-wrap items-center gap-1.5";

            // Current user co-claim toggle button (Section 3.3)
            var isClaimedByMe = (dish.claimedBy || []).some(function (c) {
              return (
                (currentUserId && c.userId === currentUserId) ||
                (currentUserName && c.userName.toLowerCase() === currentUserName.toLowerCase())
              );
            });

            var claimBtn = document.createElement("button");
            claimBtn.type = "button";
            claimBtn.className = isClaimedByMe
              ? "cursor-pointer inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs transition hover:bg-emerald-500 active:scale-95"
              : "cursor-pointer inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition hover:bg-emerald-500/10 hover:border-emerald-500 active:scale-95";
            claimBtn.style.borderColor = isClaimedByMe ? "transparent" : "var(--border-subtle)";
            claimBtn.textContent = isClaimedByMe ? "✓ Я ел(а)" : "+ Я ел(а)";
            claimBtn.setAttribute("aria-pressed", isClaimedByMe ? "true" : "false");
            claimBtn.setAttribute(
              "title",
              isClaimedByMe
                ? "Снять отметку с этого блюда"
                : "Отметить блюдо для себя"
            );
            claimBtn.addEventListener("click", function (e) {
              e.stopPropagation();
              toggleDishClaim(dish.item_id || dish.item_name);
            });
            chipsWrap.appendChild(claimBtn);

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
              chip.addEventListener("click", function (e) {
                e.stopPropagation();
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

            // Tap dish card itself toggles claim (Section 3.3)
            row.addEventListener("click", function (e) {
              if (
                e.target.closest("button") ||
                e.target.closest("a") ||
                e.target.closest("input")
              ) {
                return;
              }
              toggleDishClaim(dish.item_id || dish.item_name);
            });

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

            article.appendChild(header);
            article.appendChild(contentDiv);
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

      function setParticipantCount(num) {
        var count = Math.max(1, Math.min(10, parseInt(num, 10) || 2));
        var peopleArr = [];
        for (var i = 1; i <= count; i++) {
          peopleArr.push("Человек " + i);
        }
        var peopleInput = document.getElementById("new-bill-people-input");
        if (peopleInput) {
          peopleInput.value = peopleArr.join(", ");
        }
        var countText = document.getElementById("selected-participant-count-text");
        if (countText) {
          countText.textContent = String(count);
        }
        var countBtns = document.querySelectorAll(".participant-count-btn");
        for (var b = 0; b < countBtns.length; b++) {
          var btn = countBtns[b];
          var bCount = parseInt(btn.getAttribute("data-count"), 10);
          var isSelected = bCount === count;
          btn.setAttribute("aria-pressed", isSelected ? "true" : "false");
          if (isSelected) {
            btn.className = "participant-count-btn cursor-pointer rounded-xl border border-emerald-600 bg-emerald-600 text-white font-bold px-3 py-1.5 text-xs transition shadow-xs";
          } else {
            btn.className = "participant-count-btn muted-panel cursor-pointer rounded-xl border px-3 py-1.5 text-xs font-bold transition hover:border-emerald-500";
            btn.style.borderColor = "var(--border-subtle)";
          }
        }
      }

      function openManualNewBillModal() {
        showFormError("");
        var curInput = document.getElementById("new-bill-currency-input");
        if (curInput && !curInput.value) {
          curInput.value = "RUB";
        }
        var peopleInput = document.getElementById("new-bill-people-input");
        var currentVal = (peopleInput && peopleInput.value) || "";
        var currentLen = currentVal ? currentVal.split(",").length : 2;
        setParticipantCount(currentLen || 2);
        if (newBillDialog && !newBillDialog.open && typeof newBillDialog.showModal === "function") {
          newBillDialog.showModal();
        }
      }

      var countPillsContainer = document.getElementById("participant-count-pills");
      if (countPillsContainer) {
        countPillsContainer.addEventListener("click", function (e) {
          var target = e.target && e.target.closest(".participant-count-btn");
          if (target) {
            var countVal = target.getAttribute("data-count");
            if (countVal) {
              setParticipantCount(countVal);
            }
          }
        });
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

        if (previewWrap) {
          previewWrap.classList.remove("hidden");
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

            var createHeaders = { "Content-Type": "application/json" };
            var activeToken = safeStorage ? safeStorage.getItem("splittel_oauth_token") : null;
            if (activeToken) {
              createHeaders["Authorization"] = "Bearer " + activeToken;
            }
            if (currentUserId) {
              createHeaders["x-splittel-anon-user-id"] = currentUserId;
            }

            var createRes = await fetch((apiBaseUrl || "") + "/api/bills/new", {
              method: "POST",
              headers: createHeaders,
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

      // WhatsApp & Deep Link Sharing (Section 3: Shareable Co-Claiming & Real-Time WhatsApp Sharing)
      function openWhatsAppShare() {
        var activeBillId =
          (currentBill && currentBill.bill_id) ||
          bootstrap.billId ||
          new URLSearchParams(window.location.search).get("bill_id") ||
          "";

        var baseUrl = (apiBaseUrl || window.location.origin).replace(new RegExp("/+$"), "");
        var shareUrl = baseUrl + "/ui/bill-board?bill_id=" + encodeURIComponent(activeBillId);

        var title = currentBill && currentBill.title ? currentBill.title : "Общий счёт";
        var totalStr = "";
        if (currentBill && currentBill.grand_total) {
          totalStr = " на сумму " + currentBill.grand_total + " " + (currentBill.currency || "₪");
        }

        var message =
          "Привет! Делим счёт «" +
          title +
          "»" +
          totalStr +
          " в Splittel 🧾\\n\\n" +
          "Открой ссылку со своего телефона и отметь блюда, которые заказывал(а) ты:\\n" +
          shareUrl;

        var waUrl = "https://api.whatsapp.com/send?text=" + encodeURIComponent(message);
        window.open(waUrl, "_blank");
        showStatusBanner("Открываем WhatsApp для выбора друзей…");
      }

      function copyShareUrl() {
        var activeBillId =
          (currentBill && currentBill.bill_id) ||
          bootstrap.billId ||
          new URLSearchParams(window.location.search).get("bill_id") ||
          "";
        var baseUrl = (apiBaseUrl || window.location.origin).replace(new RegExp("/+$"), "");
        var shareUrl = baseUrl + "/ui/bill-board?bill_id=" + encodeURIComponent(activeBillId);

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard
            .writeText(shareUrl)
            .then(function () {
              showStatusBanner("Ссылка на счёт скопирована в буфер обмена!");
            })
            .catch(function () {
              showStatusBanner("Ссылка на счёт: " + shareUrl);
            });
        } else {
          showStatusBanner("Ссылка на счёт: " + shareUrl);
        }
      }

      var headerWhatsAppBtn = document.getElementById("share-whatsapp-btn");
      if (headerWhatsAppBtn) {
        headerWhatsAppBtn.addEventListener("click", openWhatsAppShare);
      }

      var bottomWhatsAppBtn = document.getElementById("bottom-whatsapp-share-btn");
      if (bottomWhatsAppBtn) {
        bottomWhatsAppBtn.addEventListener("click", openWhatsAppShare);
      }

      var headerCopyBtn = document.getElementById("copy-share-link-btn");
      if (headerCopyBtn) {
        headerCopyBtn.addEventListener("click", copyShareUrl);
      }

      var bottomCopyBtn = document.getElementById("bottom-copy-share-btn");
      if (bottomCopyBtn) {
        bottomCopyBtn.addEventListener("click", copyShareUrl);
      }

      // Google Sign-In & Registered User Profile Handlers
      var googleLoginBtn = document.getElementById("open-google-login-btn");
      var googleLoginDlg = document.getElementById("google-login-dialog");
      var googleLoginForm = document.getElementById("google-login-form");
      var googleLoginError = document.getElementById("google-login-error");
      var openUserHistoryBtn = document.getElementById("open-user-history-btn");
      var userHistoryDlg = document.getElementById("user-history-dialog");
      var logoutBtn = document.getElementById("logout-btn");

      function updateAuthUI(user) {
        var guestBanner = document.getElementById("guest-auth-banner");
        var loggedBanner = document.getElementById("logged-user-banner");
        var nameSpan = document.getElementById("logged-user-name");
        var emailSpan = document.getElementById("logged-user-email");

        if (user && user.email) {
          if (guestBanner) guestBanner.classList.add("hidden");
          if (loggedBanner) {
            loggedBanner.classList.remove("hidden");
            loggedBanner.classList.add("flex");
          }
          if (nameSpan) nameSpan.textContent = user.name || user.email;
          if (emailSpan) emailSpan.textContent = user.email;
        } else {
          if (loggedBanner) {
            loggedBanner.classList.add("hidden");
            loggedBanner.classList.remove("flex");
          }
          if (guestBanner) guestBanner.classList.remove("hidden");
        }
      }

      function checkSessionAuth() {
        var token = safeStorage ? safeStorage.getItem("splittel_oauth_token") : null;
        if (!token) {
          updateAuthUI(null);
          return;
        }
        fetch((apiBaseUrl || "") + "/api/auth/me", {
          headers: { Authorization: "Bearer " + token }
        })
          .then(function (r) {
            if (!r.ok) throw new Error("unauthorized");
            return r.json();
          })
          .then(function (data) {
            if (data && data.authenticated && data.user) {
              currentUserId = data.user.id;
              currentUserName = data.user.name;
              if (safeStorage) {
                safeStorage.setItem("splittel_user_id", currentUserId);
                safeStorage.setItem("splittel_user_name", currentUserName);
              }
              updateParticipantDisplay();
              updateAuthUI(data.user);
            } else {
              if (safeStorage) safeStorage.removeItem("splittel_oauth_token");
              updateAuthUI(null);
            }
          })
          .catch(function () {
            if (safeStorage) safeStorage.removeItem("splittel_oauth_token");
            updateAuthUI(null);
          });
      }

      if (googleLoginBtn && googleLoginDlg) {
        googleLoginBtn.addEventListener("click", function () {
          if (googleLoginError) googleLoginError.classList.add("hidden");
          googleLoginDlg.showModal();
        });
      }

      if (googleLoginForm) {
        googleLoginForm.addEventListener("submit", function (e) {
          e.preventDefault();
          var emailInput = document.getElementById("google-email-input");
          var nameInput = document.getElementById("google-name-input");
          var submitBtn = document.getElementById("google-login-submit-btn");

          var email = emailInput ? emailInput.value.trim() : "";
          var name = nameInput ? nameInput.value.trim() : "";

          if (!email) {
            if (googleLoginError) {
              googleLoginError.textContent = "Пожалуйста, укажите ваш Google email";
              googleLoginError.classList.remove("hidden");
            }
            return;
          }

          if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = "Вход…";
          }

          fetch((apiBaseUrl || "") + "/api/auth/google", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: email, name: name })
          })
            .then(function (res) {
              return res.json().then(function (data) {
                if (!res.ok) throw new Error(data.message || data.error || "Ошибка авторизации");
                return data;
              });
            })
            .then(function (data) {
              if (safeStorage) {
                safeStorage.setItem("splittel_oauth_token", data.token);
                safeStorage.setItem("splittel_user_id", data.user.id);
                safeStorage.setItem("splittel_user_name", data.user.name);
                safeStorage.setItem("splittel_user_email", data.user.email);
              }
              currentUserId = data.user.id;
              currentUserName = data.user.name;
              updateParticipantDisplay();
              updateAuthUI(data.user);
              if (googleLoginDlg) googleLoginDlg.close();
              showStatusBanner("Добро пожаловать, " + data.user.name + "!");

              if (currentBill && currentBill.bill_id) {
                fetch((apiBaseUrl || "") + "/api/user/history", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + data.token
                  },
                  body: JSON.stringify({ bill_id: currentBill.bill_id })
                }).catch(function () {});
              }
            })
            .catch(function (err) {
              if (googleLoginError) {
                googleLoginError.textContent = err.message || "Ошибка авторизации";
                googleLoginError.classList.remove("hidden");
              }
            })
            .finally(function () {
              if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = "Войти через Google Аккаунт";
              }
            });
        });
      }

      if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
          if (safeStorage) {
            safeStorage.removeItem("splittel_oauth_token");
            safeStorage.removeItem("splittel_user_email");
          }
          updateAuthUI(null);
          showStatusBanner("Вы вышли из аккаунта (режим Гостя).");
        });
      }

      if (openUserHistoryBtn && userHistoryDlg) {
        openUserHistoryBtn.addEventListener("click", function () {
          userHistoryDlg.showModal();
          var listEl = document.getElementById("user-history-list");
          if (!listEl) return;
          listEl.innerHTML = '<p class="secondary-copy py-6 text-center">Загрузка счетов…</p>';

          var token = safeStorage ? safeStorage.getItem("splittel_oauth_token") : null;
          fetch((apiBaseUrl || "") + "/api/user/history", {
            headers: { Authorization: "Bearer " + token }
          })
            .then(function (r) {
              return r.json();
            })
            .then(function (data) {
              var bills = (data && data.bills) || [];
              if (bills.length === 0) {
                listEl.innerHTML =
                  '<p class="secondary-copy py-6 text-center">У вас пока нет сохранённых счетов.<br>Отсканируйте чек или создайте расчёт!</p>';
                return;
              }
              listEl.innerHTML = "";
              bills.forEach(function (b) {
                var item = document.createElement("div");
                item.className = "flex items-center justify-between gap-3 py-3 border-b";
                item.style.borderColor = "var(--border-subtle)";
                var dateStr = b.created_at
                  ? new Date(b.created_at).toLocaleDateString("ru-RU", {
                      day: "numeric",
                      month: "short",
                      year: "numeric"
                    })
                  : "";
                item.innerHTML =
                  '<div class="min-w-0 flex-1">' +
                  '<h4 class="font-bold truncate text-xs sm:text-sm">' +
                  (b.title || "Чек") +
                  "</h4>" +
                  '<p class="secondary-copy text-[11px]">' +
                  dateStr +
                  " • " +
                  (b.people ? b.people.join(", ") : "") +
                  "</p>" +
                  "</div>" +
                  '<div class="shrink-0 text-right">' +
                  '<span class="font-bold text-xs sm:text-sm text-emerald-600 dark:text-emerald-400">' +
                  b.grand_total +
                  " " +
                  (b.currency || "₪") +
                  "</span>" +
                  '<a href="' +
                  (apiBaseUrl || "") +
                  "/ui/bill-board?bill_id=" +
                  encodeURIComponent(b.bill_id) +
                  '" class="block mt-1 text-[11px] font-bold text-blue-600 hover:underline">Открыть ➔</a>' +
                  "</div>";
                listEl.appendChild(item);
              });
            })
            .catch(function () {
              listEl.innerHTML =
                '<p class="text-rose-500 py-4 text-center">Не удалось загрузить историю счетов</p>';
            });
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

      updateParticipantDisplay();
      checkSessionAuth();

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
