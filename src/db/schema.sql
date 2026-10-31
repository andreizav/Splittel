-- =============================================================================
-- Splittel (@Splittel) Enterprise Database Schema (PostgreSQL 16+ & PostGIS)
-- =============================================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- -----------------------------------------------------------------------------
-- Enums
-- -----------------------------------------------------------------------------
DO $$ BEGIN
  CREATE TYPE bill_status AS ENUM ('OPEN', 'SETTLED', 'CANCELLED');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE item_category AS ENUM ('mains', 'drinks', 'desserts', 'starters', 'other');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE settlement_status AS ENUM ('PENDING', 'PAID');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- -----------------------------------------------------------------------------
-- 1. Table `bills`
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS bills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  external_bill_id TEXT UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  total_amount BIGINT NOT NULL CHECK (total_amount >= 0),
  currency VARCHAR(8) NOT NULL DEFAULT 'RUB',
  status bill_status NOT NULL DEFAULT 'OPEN',
  organizer_user_id TEXT NULL,
  image_url TEXT NULL
);

CREATE INDEX IF NOT EXISTS idx_bills_organizer_user_id ON bills (organizer_user_id) WHERE organizer_user_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_bills_created_at ON bills (created_at DESC);

-- -----------------------------------------------------------------------------
-- 2. Table `receipt_items` (Crowdsourced Food Price Index + PostGIS Spatial)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS receipt_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bill_id UUID NOT NULL REFERENCES bills(id) ON DELETE CASCADE,
  item_name_raw TEXT NOT NULL,
  item_name_clean TEXT NOT NULL,
  category item_category NOT NULL DEFAULT 'other',
  price_cents BIGINT NOT NULL CHECK (price_cents >= 0),
  currency VARCHAR(8) NOT NULL,
  restaurant_name TEXT NULL,
  location GEOMETRY(Point, 4326) NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_receipt_items_bill_id ON receipt_items (bill_id);
CREATE INDEX IF NOT EXISTS idx_receipt_items_currency_category ON receipt_items (currency, category);
CREATE INDEX IF NOT EXISTS idx_receipt_items_location_gist ON receipt_items USING GIST (location);

-- -----------------------------------------------------------------------------
-- 3. Table `debt_settlements`
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS debt_settlements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  external_txn_id TEXT UNIQUE,
  bill_id UUID NOT NULL REFERENCES bills(id) ON DELETE CASCADE,
  debtor_name TEXT NOT NULL,
  creditor_name TEXT NOT NULL,
  amount_cents BIGINT NOT NULL CHECK (amount_cents >= 0),
  status settlement_status NOT NULL DEFAULT 'PENDING',
  payment_link TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_debt_settlements_bill_id ON debt_settlements (bill_id);
CREATE INDEX IF NOT EXISTS idx_debt_settlements_status ON debt_settlements (status);

