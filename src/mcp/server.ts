import { randomUUID } from "node:crypto";
import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import {
  registerAppResource,
  registerAppTool,
  RESOURCE_MIME_TYPE,
} from "@modelcontextprotocol/ext-apps/server";
import { z } from "zod";
import { parseAndSplitBill } from "../domain/billSplitter.js";
import { calculateGroupBalance } from "../domain/debtOptimizer.js";
import { generatePaymentCards } from "../domain/paymentCardGenerator.js";
import { foodPriceTracker } from "../domain/foodPriceTracker.js";
import type { LedgerStore } from "../store/ledgerStore.js";
import type { SplittelOAuthProvider } from "../auth/oauthProvider.js";
import { renderBillBoardHtml } from "../ui/billBoardTemplate.js";

export const SPLITTEL_APP_NAME = "Splittel";
export const SPLITTEL_APP_HANDLE = "@Splittel";
export const SPLITTEL_CATEGORY = "Finance / Productivity";
export const SPLITTEL_APP_DESCRIPTION =
  "Мгновенный расчет общих чеков, расходов и долгов с распознаванием фото, умным учетом чаевых и интерактивной карточкой оплаты прямо в диалоге.";
export const SPLITTEL_UI_RESOURCE_URI = "ui://splittel/bill-board";

export const SPLITTEL_SERVER_INSTRUCTIONS = `Splittel is an intelligent bill-splitting and group expense distribution agent. Use Splittel whenever the user provides a receipt image, asks to split a check, calculate shared travel expenses, or generate debt payment links. 
Rules:
1. Always call \`parse_and_split_bill\` first when a receipt or item list is provided.
2. Automatically split shared items (e.g., bottle of wine, shared appetizers) proportionally among tagged individuals.
3. Calculate tax (VAT) and tips as a percentage applied proportionally to each person's individual subtotal.
4. Present final breakdowns via the interactive UI widget resource \`ui://splittel/bill-board\`.
5. When a check or trip expense is in a foreign currency (e.g., EUR, USD, TRY, THB) and transfers are settled in another currency (e.g., RUB), pass \`currency\` and \`settlement_currency\` (plus optional \`exchange_rate\`) for automatic cent-exact FX conversion.`;

export interface CreateSplittelMcpDeps {
  store: LedgerStore;
  oauthProvider: SplittelOAuthProvider;
  publicBaseUrl: string;
}

export function createSplittelMcpServer(deps: CreateSplittelMcpDeps): McpServer {
  const cleanBaseUrl = deps.publicBaseUrl.replace(/\/+$/, "");

  const server = new McpServer(
    {
      name: SPLITTEL_APP_NAME,
      title: "Splittel (@Splittel)",
      version: "1.0.0",
    },
    {
      instructions: SPLITTEL_SERVER_INSTRUCTIONS,
      capabilities: {
        tools: { listChanged: true },
        resources: { listChanged: true },
        logging: {},
      },
    }
  );

  // ===========================================================================
  // UI RESOURCE: ui://splittel/bill-board (MCP Apps Sandboxed Iframe)
  // ===========================================================================
  registerAppResource(
    server,
    "Splittel Bill Board",
    SPLITTEL_UI_RESOURCE_URI,
    {
      title: "Splittel Interactive Bill Board",
      description:
        "Mobile-first interactive check-matrix showing dishes, friend avatar chips, tip selector pills (0%, 10%, 15%, Custom), per-person summary cards, Mark as Paid toggle, and SBP/Stripe QR.",
      mimeType: RESOURCE_MIME_TYPE,
      _meta: {
        ui: {
          prefersBorder: false,
          csp: {
            connectDomains: [cleanBaseUrl],
            resourceDomains: [cleanBaseUrl],
          },
        },
      },
    },
    async () => {
      const newBillId = randomUUID();
      const uiActionToken = deps.oauthProvider.signUiActionToken(newBillId);
      const html = renderBillBoardHtml({
        bill: null,
        billId: newBillId,
        uiActionToken,
        apiBaseUrl: cleanBaseUrl,
        isGuest: true,
      });

      return {
        contents: [
          {
            uri: SPLITTEL_UI_RESOURCE_URI,
            mimeType: RESOURCE_MIME_TYPE,
            text: html,
            _meta: {
              ui: {
                prefersBorder: false,
                csp: {
                  connectDomains: [cleanBaseUrl],
                  resourceDomains: [cleanBaseUrl],
                },
              },
            },
          },
        ],
      };
    }
  );

  server.registerResource(
    "Splittel Bill Board by ID",
    new ResourceTemplate("ui://splittel/bill-board/{bill_id}", {
      list: undefined,
    }),
    {
      title: "Splittel Bill Board Instance",
      description: "Interactive check-matrix UI for a specific bill ID.",
      mimeType: RESOURCE_MIME_TYPE,
    },
    async (uri, variables) => {
      const billId =
        typeof variables.bill_id === "string" ? variables.bill_id : undefined;
      const bill = billId ? await deps.store.getBill(billId) : undefined;
      if (!bill) {
        throw new Error(`Bill not found: ${billId ?? "missing"}`);
      }
      const uiActionToken = deps.oauthProvider.signUiActionToken(bill.bill_id);
      const html = renderBillBoardHtml({
        bill,
        billId: bill.bill_id,
        uiActionToken,
        apiBaseUrl: cleanBaseUrl,
        isGuest: false,
      });

      return {
        contents: [
          {
            uri: uri.href,
            mimeType: RESOURCE_MIME_TYPE,
            text: html,
          },
        ],
      };
    }
  );

  // ===========================================================================
  // TOOL 1: parse_and_split_bill (Free Tier Zero-Auth + UI Resource Binding)
  // ===========================================================================
  registerAppTool(
    server,
    "parse_and_split_bill",
    {
      title: "Parse and Split Bill",
      description:
        "Parse receipt items and map them to individuals with proportional tip and tax calculations.",
      annotations: {
        title: "Parse and Split Bill",
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false,
      },
      inputSchema: {
        raw_items: z
          .array(
            z.object({
              item_name: z
                .string()
                .min(1)
                .describe("Dish or receipt line item name"),
              price: z
                .number()
                .nonnegative()
                .describe("Unit price of the item"),
              quantity: z
                .number()
                .int()
                .positive()
                .default(1)
                .describe("Item quantity (default: 1)"),
            })
          )
          .min(1)
          .describe("Extracted line items from receipt photo or text"),
        people: z
          .array(z.string().min(1))
          .min(1)
          .describe("Names of individuals splitting the bill"),
        assignments: z
          .record(z.string(), z.array(z.string()))
          .optional()
          .describe("Map of person_name -> array of item_names"),
        tip_percentage: z
          .number()
          .min(0)
          .max(100)
          .default(10)
          .describe("Tip percentage applied proportionally (default: 10)"),
        tax_amount: z
          .number()
          .min(0)
          .default(0)
          .describe(
            "Tax / VAT amount distributed proportionally to each person's subtotal (default: 0)"
          ),
        currency: z
          .string()
          .min(3)
          .max(3)
          .optional()
          .default("RUB")
          .describe("Receipt ISO 4217 currency code (default: RUB)"),
        settlement_currency: z
          .string()
          .min(3)
          .max(3)
          .optional()
          .describe(
            "Optional ISO 4217 transfer/settlement currency when different from receipt currency (e.g., RUB for a check in EUR)"
          ),
        exchange_rate: z
          .number()
          .positive()
          .optional()
          .describe(
            "Optional FX conversion rate (1 unit of currency = exchange_rate units of settlement_currency)"
          ),
        title: z
          .string()
          .optional()
          .describe("Optional restaurant or check title"),
        image_url: z
          .string()
          .url()
          .optional()
          .describe("Optional Cloudflare R2 / HTTPS CDN receipt image URL"),
        geo_location: z
          .object({
            lat: z.number().min(-90).max(90),
            lng: z.number().min(-180).max(180),
          })
          .optional()
          .describe("Optional WGS84 coordinates of the restaurant for PostGIS 1km price comparison"),
      },
      _meta: {
        ui: {
          resourceUri: SPLITTEL_UI_RESOURCE_URI,
        },
      },
    },
    async (args, extra) => {
      const ownerSub =
        typeof extra.authInfo?.extra?.sub === "string"
          ? extra.authInfo.extra.sub
          : undefined;

      const nearbyBenchmarks = args.geo_location
        ? await deps.store.queryNearbyBenchmarks({
            lat: args.geo_location.lat,
            lng: args.geo_location.lng,
            currency: args.currency ?? "RUB",
            items: args.raw_items,
            excludeRestaurantName: args.title,
          })
        : undefined;

      const bill = await parseAndSplitBill({
        raw_items: args.raw_items,
        people: args.people,
        assignments: args.assignments,
        tip_percentage: args.tip_percentage ?? 10,
        tax_amount: args.tax_amount ?? 0,
        currency: args.currency ?? "RUB",
        settlement_currency: args.settlement_currency,
        exchange_rate: args.exchange_rate,
        title: args.title,
        image_url: args.image_url,
        geo_location: args.geo_location,
        nearbyBenchmarks,
        baseUrl: cleanBaseUrl,
        ownerSub,
      });

      await deps.store.saveBill(bill);
      if (ownerSub) {
        await deps.store.attachBillToUserHistory(bill.bill_id, ownerSub);
      }
      const uiActionToken = deps.oauthProvider.signUiActionToken(bill.bill_id);
      const isCrossCurrency = bill.settlement_currency !== bill.currency;

      const lines: string[] = [
        `### @Splittel — ${bill.title}`,
        `- **Subtotal**: ${bill.currency} ${bill.subtotal.toFixed(2)}`,
        `- **Tax (VAT)**: ${bill.currency} ${bill.tax_amount.toFixed(2)}`,
        `- **Tip (${bill.tip_percentage}%)**: ${bill.currency} ${bill.tip_amount.toFixed(2)}`,
        `- **Total Bill**: **${bill.currency} ${bill.grand_total.toFixed(2)}**`,
        ...(isCrossCurrency
          ? [
              `- **Settlement Total (1 ${bill.currency} = ${bill.exchange_rate} ${bill.settlement_currency})**: **${bill.settlement_currency} ${bill.settlement_grand_total.toFixed(2)}**`,
            ]
          : []),
        "",
        "#### Individual Shares",
        ...bill.people_shares.map((s) => {
          const fxPart = isCrossCurrency
            ? ` → **${s.settlement_currency} ${s.settlement_total_owed.toFixed(2)}**`
            : "";
          return `- **${s.person}**: **${bill.currency} ${s.total_owed.toFixed(2)}**${fxPart} (subtotal: ${s.items_subtotal.toFixed(2)}, tax: ${s.tax_share.toFixed(2)}, tip: ${s.tip_share.toFixed(2)}, txn: \`${s.transaction_id}\`)`;
        }),
        "",
        `Shared Group Check URL (no login required): ${bill.share_url}`,
        ...(bill.recommendation
          ? [
              "",
              `💡 **${bill.recommendation.headline}**: ${bill.recommendation.message}`,
            ]
          : []),
      ];

      const uiMetadata = {
        resourceUri: SPLITTEL_UI_RESOURCE_URI,
      };

      return {
        content: [
          {
            type: "text" as const,
            text: lines.join("\n"),
          },
        ],
        structuredContent: {
          bill,
          share_url: bill.share_url,
          ui: uiMetadata,
        },
        _meta: {
          ui: uiMetadata,
          "ui/resourceUri": SPLITTEL_UI_RESOURCE_URI,
          bill,
          uiActionToken,
          iframeUrl: bill.share_url,
        },
        meta: {
          ui: uiMetadata,
        },
      };
    }
  );

  // ===========================================================================
  // TOOL 2: calculate_group_balance (Free Tier Zero-Auth)
  // ===========================================================================
  server.registerTool(
    "calculate_group_balance",
    {
      title: "Calculate Group Balance",
      description:
        'Minimizes transactions ("who owes whom") for multi-day trips or shared apartments.',
      annotations: {
        title: "Calculate Group Balance",
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false,
      },
      inputSchema: {
        expenses: z
          .array(
            z.object({
              description: z
                .string()
                .optional()
                .describe("Expense description (e.g., Hotel, Dinner, Taxi)"),
              paid_by: z
                .string()
                .min(1)
                .describe("Name of the person who paid"),
              amount: z
                .number()
                .positive()
                .describe("Total amount paid for this expense"),
              split_among: z
                .array(z.string().min(1))
                .min(1)
                .describe("Names of group members splitting this expense"),
              currency: z
                .string()
                .min(3)
                .max(3)
                .optional()
                .describe(
                  "Optional ISO 4217 currency of this expense (e.g., EUR, USD, TRY, RUB)"
                ),
              exchange_rate: z
                .number()
                .positive()
                .optional()
                .describe(
                  "Optional FX rate converting this expense's currency into settlement_currency"
                ),
            })
          )
          .min(1)
          .describe("List of shared group expenses"),
        settlement_currency: z
          .string()
          .min(3)
          .max(3)
          .optional()
          .describe(
            "Target ISO 4217 currency for net balances and settlements (default: RUB or first expense currency)"
          ),
      },
    },
    async ({ expenses, settlement_currency }) => {
      const result = calculateGroupBalance(expenses, { settlement_currency });
      const cur = result.settlement_currency;

      const settlementSummary =
        result.settlement_matrix.length === 0
          ? "All group members are settled up — zero transfers needed."
          : result.settlement_matrix
              .map(
                (t, idx) =>
                  `${idx + 1}. **${t.debtor}** → **${t.creditor}**: **${cur} ${t.amount.toFixed(2)}**`
              )
              .join("\n");

      const text = [
        `### @Splittel Optimal Debt Settlement Matrix (${cur})`,
        `- **Total Group Spend**: ${cur} ${result.total_group_spend.toFixed(2)} (${result.expense_count} expenses)`,
        `- **Minimal Transfers**: ${result.optimization_stats.optimized_transfers} (eliminated ${result.optimization_stats.transfers_saved} redundant transfer(s))`,
        "",
        "#### Net Participant Balances",
        ...result.participant_balances.map((b) => {
          const sign = b.net_balance >= 0 ? "+" : "-";
          return `- **${b.person}**: paid ${cur} ${b.total_paid.toFixed(2)}, share ${cur} ${b.total_share.toFixed(2)} → net **${sign}${cur} ${Math.abs(b.net_balance).toFixed(2)}**`;
        }),
        "",
        "#### Settlements (Who Owes Whom)",
        settlementSummary,
      ].join("\n");

      return {
        content: [{ type: "text" as const, text }],
        structuredContent: {
          ...result,
          settlements: result.settlement_matrix,
        },
      };
    }
  );

  // ===========================================================================
  // TOOL 3: generate_payment_card (Free Tier Zero-Auth + SBP/Stripe QR)
  // ===========================================================================
  server.registerTool(
    "generate_payment_card",
    {
      title: "Generate Payment Card",
      description:
        "Generates final debt breakdown cards, SBP/Stripe payment links, and QR codes.",
      annotations: {
        title: "Generate Payment Card",
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false,
      },
      inputSchema: {
        settlements: z
          .array(
            z.object({
              debtor: z.string().min(1).describe("Person who owes money"),
              creditor: z
                .string()
                .min(1)
                .describe("Person receiving the transfer"),
              amount: z.number().positive().describe("Settlement transfer amount"),
              currency: z
                .string()
                .min(3)
                .max(3)
                .optional()
                .describe(
                  "Optional source ISO 4217 currency for this settlement row"
                ),
              payment_link: z
                .string()
                .optional()
                .describe(
                  "Optional custom SBP / Stripe / bank transfer URL override"
                ),
            })
          )
          .min(1)
          .describe("List of settlements to generate payment cards and QR codes for"),
        currency: z
          .string()
          .min(3)
          .max(3)
          .optional()
          .default("RUB")
          .describe("Source ISO 4217 currency code (default: RUB)"),
        settlement_currency: z
          .string()
          .min(3)
          .max(3)
          .optional()
          .describe(
            "Optional target ISO 4217 transfer currency (e.g., RUB when check was in EUR)"
          ),
        exchange_rate: z
          .number()
          .positive()
          .optional()
          .describe(
            "Optional FX conversion rate from source currency to settlement_currency"
          ),
      },
    },
    async ({ settlements, currency, settlement_currency, exchange_rate }) => {
      const cards = await generatePaymentCards({
        settlements,
        baseUrl: cleanBaseUrl,
        currency: currency ?? "RUB",
        settlement_currency,
        exchange_rate,
      });

      await deps.store.savePaymentCards(cards);

      const effectiveCurrency = (
        cards[0]?.currency ??
        settlement_currency ??
        currency ??
        "RUB"
      ).toUpperCase();
      const totalVolume = cards.reduce((acc, c) => acc + c.amount, 0);
      const text = [
        `### @Splittel Payment Cards & SBP/Stripe QR (${cards.length})`,
        `Total Settlement Volume: **${effectiveCurrency} ${totalVolume.toFixed(2)}**`,
        "",
        ...cards.map((c) => {
          const fxBadge =
            c.original_currency !== c.currency
              ? ` _(from ${c.original_currency} ${c.original_amount.toFixed(2)} @ ${c.exchange_rate})_`
              : "";
          return [
            `#### ${c.debtor} → ${c.creditor}: ${c.currency} ${c.amount.toFixed(2)}${fxBadge}`,
            `- **Transaction ID**: \`${c.transaction_id}\``,
            `- **SBP Fast Payment Link**: ${c.links.sbp_url}`,
            `- **Stripe Payment Link**: ${c.links.stripe_payment_url}`,
            `- **Hosted QR Card**: ${c.links.splittel_pay_url}`,
          ].join("\n");
        }),
      ].join("\n\n");

      return {
        content: [{ type: "text" as const, text }],
        structuredContent: {
          payment_cards: cards.map(({ qr_code_svg: _svg, ...rest }) => rest),
          total_cards: cards.length,
          total_amount: Number(totalVolume.toFixed(2)),
        },
      };
    }
  );

  // ===========================================================================
  // TOOL 4: settle_up_action (Account Linking Required + Destructive Hint)
  // ===========================================================================
  server.registerTool(
    "settle_up_action",
    {
      title: "Settle Up Transaction",
      description:
        "Confirms payment status or executes transaction settlement.",
      annotations: {
        title: "Settle Up Transaction",
        readOnlyHint: false,
        destructiveHint: true,
        idempotentHint: true,
        openWorldHint: false,
      },
      inputSchema: {
        transaction_id: z
          .string()
          .min(1)
          .describe("Unique transaction identifier to update"),
        status: z
          .enum(["PAID", "CANCELLED"])
          .describe("Target transaction settlement status: PAID or CANCELLED"),
      },
    },
    async ({ transaction_id, status }, extra) => {
      const actor =
        typeof extra.authInfo?.extra?.sub === "string"
          ? extra.authInfo.extra.sub
          : extra.authInfo?.clientId ?? "linked_account_user";

      const result = await deps.store.updateTransactionStatus(
        transaction_id,
        status,
        actor
      );

      const summary =
        status === "PAID"
          ? `Transaction \`${transaction_id}\` (${result.transaction.debtor} → ${result.transaction.creditor}, ${result.transaction.currency} ${result.transaction.amount.toFixed(2)}) confirmed as **PAID** at ${result.transaction.settled_at}.`
          : `Transaction \`${transaction_id}\` marked as **CANCELLED** (previous status: ${result.previous_status}).`;

      return {
        content: [{ type: "text" as const, text: summary }],
        structuredContent: {
          committed: true,
          previous_status: result.previous_status,
          transaction: result.transaction,
          updated_bill: result.updated_bill,
        },
      };
    }
  );

  // ===========================================================================
  // TOOL 5: get_food_price_index (Crowdsourced Food Price Moat Analytics)
  // ===========================================================================
  server.registerTool(
    "get_food_price_index",
    {
      title: "Get Crowdsourced Food Price Index",
      description:
        "Retrieve crowdsourced restaurant dish price benchmarks, category averages (mains, drinks, dessert, sides), and local food price indexes across currencies (ILS, RUB, USD, EUR).",
      annotations: {
        title: "Get Food Price Index",
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false,
      },
      inputSchema: {
        currency: z
          .string()
          .min(3)
          .max(3)
          .default("ILS")
          .describe("ISO 4217 currency code (e.g., ILS, RUB, USD, EUR)"),
      },
    },
    async (args) => {
      const cur = (args.currency || "ILS").toUpperCase();
      const index = foodPriceTracker.getFoodPriceIndex(cur);

      const topDishesText = index.popular_dishes
        .slice(0, 5)
        .map(
          (d) =>
            `- **${d.dish_name}** (${d.category}): avg ${cur} ${d.avg_price} (min ${d.min_price}, max ${d.max_price}) [${d.count} checks]`
        )
        .join("\n");

      const text = [
        `### Crowdsourced Food Price Index (${cur})`,
        `• **Tracked Receipts**: ${index.total_receipts_tracked}`,
        `• **Indexed Items**: ${index.total_items_indexed}`,
        `• **Average Receipt Check**: ${cur} ${index.average_receipt_total}`,
        `• **Category Averages**:`,
        ...Object.entries(index.category_averages).map(
          ([cat, s]) => `  - *${cat}*: ${cur} ${s.average_price} (${s.item_count} items)`
        ),
        index.popular_dishes.length > 0 ? `\n• **Popular Dishes Benchmark**:\n${topDishesText}` : "",
      ]
        .filter(Boolean)
        .join("\n");

      return {
        content: [{ type: "text" as const, text }],
        structuredContent: {
          currency: cur,
          index,
        },
      };
    }
  );

  return server;
}
