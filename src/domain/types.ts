export interface RawReceiptItem {
  item_name: string;
  price: number;
  quantity?: number;
}

export interface BillMatrixItem {
  item_id: string;
  item_name: string;
  price: number;
  quantity: number;
  line_total: number;
}

export interface PersonAssignedItem {
  item_id: string;
  item_name: string;
  quantity_share: number;
  unit_price: number;
  line_total: number;
  person_share: number;
  shared_with_count: number;
  unassigned_split: boolean;
}

export type TransactionStatus = "PENDING" | "PAID" | "CANCELLED";

export interface PersonPaymentOptions {
  pay_url: string;
  sbp_link: string;
  stripe_link: string;
  qr_code_data_uri: string;
}

export interface PersonBillSummary {
  person: string;
  transaction_id: string;
  status: TransactionStatus;
  settled_at?: string;
  settled_by?: string;
  items: PersonAssignedItem[];
  items_subtotal: number;
  tax_share: number;
  tip_share: number;
  total_owed: number;
  settlement_currency: string;
  settlement_total_owed: number;
  payment: PersonPaymentOptions;
}

export interface ContextualRecommendation {
  type: "price_comparison" | "partner_offer";
  headline: string;
  badge?: string;
  message: string;
  restaurant_name?: string;
  average_area_check?: number;
  partner_name?: string;
  partner_price?: number;
  savings_percent?: number;
  savings_amount?: number;
  promo_code?: string;
  action_url?: string;
  cta_text?: string;
}

export interface ReceiptSnippetRecord {
  snippet_id: string;
  restaurant_name: string;
  geo_location?: {
    city?: string;
    area?: string;
    country?: string;
  };
  items: Array<{
    name: string;
    price: number;
    category?: "meat" | "drinks" | "pizza" | "pasta" | "asian" | "salad" | "dessert" | "other";
  }>;
  currency: string;
  total_amount: number;
  timestamp: string;
}

export interface ParsedBillBoard {
  bill_id: string;
  title: string;
  currency: string;
  settlement_currency: string;
  exchange_rate: number;
  created_at: string;
  owner_sub?: string;
  image_url?: string | null;
  geo_location?: { lat: number; lng: number } | null;
  share_url: string;
  raw_items: BillMatrixItem[];
  people: string[];
  assignments: Record<string, string[]>;
  subtotal: number;
  tax_amount: number;
  tip_percentage: number;
  tip_amount: number;
  grand_total: number;
  settlement_grand_total: number;
  unassigned_items: string[];
  people_shares: PersonBillSummary[];
  recommendation?: ContextualRecommendation;
}

export interface GroupExpenseInput {
  description?: string;
  paid_by: string;
  amount: number;
  split_among: string[];
  currency?: string;
  exchange_rate?: number;
}

export interface ParticipantNetBalance {
  person: string;
  total_paid: number;
  total_share: number;
  net_balance: number;
}

export interface SettlementTransfer {
  debtor: string;
  creditor: string;
  amount: number;
  currency?: string;
  payment_link?: string;
}

export interface GroupBalanceResult {
  settlement_currency: string;
  total_group_spend: number;
  expense_count: number;
  participant_balances: ParticipantNetBalance[];
  settlement_matrix: SettlementTransfer[];
  optimization_stats: {
    raw_obligation_edges: number;
    optimized_transfers: number;
    transfers_saved: number;
  };
}

export interface PaymentTransferLinks {
  primary_payment_url: string;
  splittel_pay_url: string;
  sbp_url: string;
  stripe_payment_url: string;
}

export interface PaymentCard {
  transaction_id: string;
  debtor: string;
  creditor: string;
  original_amount: number;
  original_currency: string;
  amount: number;
  currency: string;
  exchange_rate: number;
  status: TransactionStatus;
  memo: string;
  links: PaymentTransferLinks;
  qr_code_data_uri: string;
  qr_code_svg: string;
  created_at: string;
}

export interface TransactionRecord {
  transaction_id: string;
  kind: "bill_share" | "settlement_card" | "manual";
  bill_id?: string;
  debtor: string;
  creditor: string;
  amount: number;
  currency: string;
  status: TransactionStatus;
  created_at: string;
  settled_at?: string;
  settled_by?: string;
}

export interface UserPaymentProfile {
  sub: string;
  display_name?: string;
  sbp_phone?: string;
  sbp_bank?: string;
  stripe_payment_link?: string;
  updated_at: string;
}
