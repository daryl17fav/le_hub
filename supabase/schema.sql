-- ENABLE THE UUID EXTENSION
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. VILLAGES (The Competition)
CREATE TABLE villages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  total_points BIGINT DEFAULT 0,
  student_count INT DEFAULT 0
);

-- 2. ACCOUNTS (One per SIM Card)
CREATE TABLE accounts (
  phone_number TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PROFILES (The Family Members)
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  account_id TEXT REFERENCES accounts(phone_number) ON DELETE CASCADE,
  village_id UUID REFERENCES villages(id),
  full_name TEXT NOT NULL,
  role TEXT CHECK (role IN ('junior', 'adult')),
  avatar_url TEXT,
  points BIGINT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RPC Functions for Points (Required by Service)
CREATE OR REPLACE FUNCTION increment_profile_points(row_id UUID, val INT)
RETURNS void LANGUAGE plpgsql AS $$
BEGIN
  UPDATE profiles SET points = points + val WHERE id = row_id;
END;
$$;

CREATE OR REPLACE FUNCTION increment_village_points(row_id UUID, val INT)
RETURNS void LANGUAGE plpgsql AS $$
BEGIN
  UPDATE villages SET total_points = total_points + val WHERE id = row_id;
END;
$$;
