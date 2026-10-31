import { allocateProportionalCents, fromCents, toCents } from "./billSplitter.js";
import { normalizeCurrency, resolveExchangeRate } from "./fxConverter.js";
import type {
  GroupBalanceResult,
  GroupExpenseInput,
  ParticipantNetBalance,
  SettlementTransfer,
} from "./types.js";

interface CentBalanceNode {
  person: string;
  netCents: number;
}

function greedySettleComponent(
  nodes: CentBalanceNode[],
  settlementCurrency: string
): SettlementTransfer[] {
  const debtors = nodes
    .filter((n) => n.netCents < 0)
    .map((n) => ({ person: n.person, amountCents: -n.netCents }));
  const creditors = nodes
    .filter((n) => n.netCents > 0)
    .map((n) => ({ person: n.person, amountCents: n.netCents }));

  const transfers: SettlementTransfer[] = [];

  while (debtors.length > 0 && creditors.length > 0) {
    debtors.sort((a, b) =>
      b.amountCents !== a.amountCents
        ? b.amountCents - a.amountCents
        : a.person.localeCompare(b.person)
    );
    creditors.sort((a, b) =>
      b.amountCents !== a.amountCents
        ? b.amountCents - a.amountCents
        : a.person.localeCompare(b.person)
    );

    const debtor = debtors[0]!;
    const creditor = creditors[0]!;
    const settledCents = Math.min(debtor.amountCents, creditor.amountCents);

    if (settledCents > 0) {
      transfers.push({
        debtor: debtor.person,
        creditor: creditor.person,
        amount: fromCents(settledCents),
        currency: settlementCurrency,
      });
    }

    debtor.amountCents -= settledCents;
    creditor.amountCents -= settledCents;

    if (debtor.amountCents === 0) debtors.shift();
    if (creditor.amountCents === 0) creditors.shift();
  }

  return transfers;
}

function solveMinimumTransfers(
  nonZeroNodes: CentBalanceNode[],
  settlementCurrency: string
): SettlementTransfer[] {
  if (nonZeroNodes.length <= 1) return [];

  const n = nonZeroNodes.length;
  if (n > 14) {
    const remaining: CentBalanceNode[] = [];
    const byAmount = new Map<number, CentBalanceNode[]>();
    const pairTransfers: SettlementTransfer[] = [];

    for (const node of nonZeroNodes) {
      const oppList = byAmount.get(-node.netCents);
      if (oppList && oppList.length > 0) {
        const match = oppList.shift()!;
        const debtor = node.netCents < 0 ? node : match;
        const creditor = node.netCents > 0 ? node : match;
        pairTransfers.push({
          debtor: debtor.person,
          creditor: creditor.person,
          amount: fromCents(Math.abs(node.netCents)),
          currency: settlementCurrency,
        });
      } else {
        const list = byAmount.get(node.netCents) ?? [];
        list.push(node);
        byAmount.set(node.netCents, list);
      }
    }

    for (const list of byAmount.values()) {
      remaining.push(...list);
    }

    return [
      ...pairTransfers,
      ...greedySettleComponent(remaining, settlementCurrency),
    ];
  }

  const totalMasks = 1 << n;
  const subsetSum = new Int32Array(totalMasks);
  for (let mask = 1; mask < totalMasks; mask++) {
    const lsb = mask & -mask;
    const bitIdx = Math.clz32(lsb) ^ 31;
    subsetSum[mask] =
      (subsetSum[mask ^ lsb] ?? 0) + (nonZeroNodes[bitIdx]?.netCents ?? 0);
  }

  const dp = new Int16Array(totalMasks);
  const choice = new Int32Array(totalMasks);

  for (let mask = 1; mask < totalMasks; mask++) {
    if (subsetSum[mask] !== 0) continue;
    dp[mask] = 1;
    choice[mask] = mask;

    for (let sub = (mask - 1) & mask; sub > 0; sub = (sub - 1) & mask) {
      if (subsetSum[sub] === 0) {
        const candidate = (dp[sub] ?? 0) + (dp[mask ^ sub] ?? 0);
        if (candidate > (dp[mask] ?? 0)) {
          dp[mask] = candidate;
          choice[mask] = sub;
        }
      }
    }
  }

  const transfers: SettlementTransfer[] = [];
  const extractComponents = (mask: number): void => {
    if (mask === 0) return;
    const sub = choice[mask] ?? mask;
    if (sub === mask || sub === 0) {
      const component: CentBalanceNode[] = [];
      for (let i = 0; i < n; i++) {
        if ((mask & (1 << i)) !== 0) {
          component.push(nonZeroNodes[i]!);
        }
      }
      transfers.push(...greedySettleComponent(component, settlementCurrency));
      return;
    }
    extractComponents(sub);
    extractComponents(mask ^ sub);
  };

  extractComponents(totalMasks - 1);
  return transfers.sort((a, b) =>
    b.amount !== a.amount ? b.amount - a.amount : a.debtor.localeCompare(b.debtor)
  );
}

export interface CalculateGroupBalanceOptions {
  settlement_currency?: string;
}

export function calculateGroupBalance(
  expenses: GroupExpenseInput[],
  options: CalculateGroupBalanceOptions = {}
): GroupBalanceResult {
  const firstExpenseCurrency = expenses.find((e) => e.currency)?.currency;
  const settlementCurrency = normalizeCurrency(
    options.settlement_currency,
    firstExpenseCurrency ? normalizeCurrency(firstExpenseCurrency, "RUB") : "RUB"
  );

  const canonicalName = new Map<string, string>();
  const paidCents = new Map<string, number>();
  const shareCents = new Map<string, number>();
  const rawPairs = new Set<string>();

  const registerPerson = (raw: string): string => {
    const clean = raw.trim();
    const key = clean.toLowerCase();
    if (!canonicalName.has(key)) {
      canonicalName.set(key, clean);
      paidCents.set(key, 0);
      shareCents.set(key, 0);
    }
    return key;
  };

  let totalSpendCents = 0;
  let validExpenseCount = 0;

  for (const exp of expenses) {
    if (exp.amount <= 0) continue;
    const payerKey = registerPerson(exp.paid_by);
    const uniqueSharers = Array.from(
      new Set(exp.split_among.map((s) => registerPerson(s)).filter(Boolean))
    );

    if (uniqueSharers.length === 0) continue;

    const fx = resolveExchangeRate({
      fromCurrency: exp.currency ?? settlementCurrency,
      toCurrency: settlementCurrency,
      explicitRate: exp.exchange_rate,
    });

    const amountCents = toCents(exp.amount * fx.rate);
    totalSpendCents += amountCents;
    validExpenseCount += 1;

    paidCents.set(payerKey, (paidCents.get(payerKey) ?? 0) + amountCents);

    const splits = allocateProportionalCents(
      amountCents,
      uniqueSharers.map(() => 1)
    );

    uniqueSharers.forEach((sharerKey, idx) => {
      const sCents = splits[idx] ?? 0;
      shareCents.set(sharerKey, (shareCents.get(sharerKey) ?? 0) + sCents);
      if (sharerKey !== payerKey && sCents > 0) {
        rawPairs.add(`${sharerKey}->${payerKey}`);
      }
    });
  }

  const participantBalances: ParticipantNetBalance[] = [];
  const nonZeroNodes: CentBalanceNode[] = [];

  for (const [key, display] of canonicalName.entries()) {
    const paid = paidCents.get(key) ?? 0;
    const share = shareCents.get(key) ?? 0;
    const net = paid - share;

    participantBalances.push({
      person: display,
      total_paid: fromCents(paid),
      total_share: fromCents(share),
      net_balance: fromCents(net),
    });

    if (net !== 0) {
      nonZeroNodes.push({ person: display, netCents: net });
    }
  }

  participantBalances.sort((a, b) => b.net_balance - a.net_balance);

  const settlementMatrix = solveMinimumTransfers(
    nonZeroNodes,
    settlementCurrency
  );
  const rawEdges = Math.max(rawPairs.size, settlementMatrix.length);

  return {
    settlement_currency: settlementCurrency,
    total_group_spend: fromCents(totalSpendCents),
    expense_count: validExpenseCount,
    participant_balances: participantBalances,
    settlement_matrix: settlementMatrix,
    optimization_stats: {
      raw_obligation_edges: rawEdges,
      optimized_transfers: settlementMatrix.length,
      transfers_saved: Math.max(0, rawEdges - settlementMatrix.length),
    },
  };
}
