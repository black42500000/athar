-- SQL file to run in Supabase SQL Editor
-- Go to https://supabase.com, create project, open SQL Editor, paste this

-- Products table
CREATE TABLE products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  tagline TEXT DEFAULT '',
  image TEXT DEFAULT '',
  description TEXT DEFAULT '',
  notes JSONB DEFAULT '[]'::jsonb,
  features JSONB DEFAULT '[]'::jsonb,
  prices JSONB DEFAULT '[]'::jsonb,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Auto-update updated_at on row change
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Row-level security (optional, disable for simplicity or set up later)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all" ON products FOR ALL USING (true) WITH CHECK (true);

-- Storage bucket for product images
-- Run this separately in Supabase Storage:
-- 1. Go to Storage → Create bucket → name: "products" → public
