/*
# Create website enquiry, dealer, dealer-application and price tables

Plain-English summary
This migration sets up the storage the SBF Rapid website needs for public forms and
data lists. The site has no sign-in, so visitors use it anonymously.

1. New Tables
- `contact_enquiries`: messages submitted through the Contact Us form.
- `dealer_applications`: dealership applications submitted through Become a Dealer.
- `dealers`: authorised dealer directory shown on Find Dealers (empty until SBF supplies verified data).
- `price_items`: editable price list shown on the Pricing page (empty until SBF supplies approved rates).

2. Security
- RLS is enabled on every table.
- Visitors (anon) may INSERT enquiries and dealer applications only; they cannot read them back.
- Visitors may READ only active dealers and price items; they cannot change them.
- Writes to dealers and price items are reserved for the project owner via the dashboard.

3. Notes
- No existing data is modified or removed.
- Migration is idempotent and safe to re-run.
*/

CREATE TABLE IF NOT EXISTS contact_enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 120),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 200),
  phone text NOT NULL CHECK (char_length(phone) BETWEEN 6 AND 30),
  subject text NOT NULL CHECK (char_length(subject) BETWEEN 1 AND 120),
  message text NOT NULL CHECK (char_length(message) BETWEEN 1 AND 2000),
  consent boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE contact_enquiries ENABLE ROW LEVEL SECURITY;
GRANT INSERT ON contact_enquiries TO anon, authenticated;

DROP POLICY IF EXISTS "anon_insert_contact_enquiries" ON contact_enquiries;
CREATE POLICY "anon_insert_contact_enquiries" ON contact_enquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (consent = true);

CREATE TABLE IF NOT EXISTS dealer_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 120),
  phone text NOT NULL CHECK (char_length(phone) BETWEEN 6 AND 30),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 200),
  business_name text CHECK (business_name IS NULL OR char_length(business_name) <= 160),
  monthly_requirement text NOT NULL CHECK (char_length(monthly_requirement) BETWEEN 1 AND 120),
  district text NOT NULL CHECK (char_length(district) BETWEEN 1 AND 120),
  state text NOT NULL CHECK (char_length(state) BETWEEN 1 AND 120),
  country text NOT NULL CHECK (char_length(country) BETWEEN 1 AND 120),
  message text CHECK (message IS NULL OR char_length(message) <= 2000),
  consent boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE dealer_applications ENABLE ROW LEVEL SECURITY;
GRANT INSERT ON dealer_applications TO anon, authenticated;

DROP POLICY IF EXISTS "anon_insert_dealer_applications" ON dealer_applications;
CREATE POLICY "anon_insert_dealer_applications" ON dealer_applications FOR INSERT
  TO anon, authenticated
  WITH CHECK (consent = true);

CREATE TABLE IF NOT EXISTS dealers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  dealer_name text NOT NULL,
  address text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  pin_code text NOT NULL,
  phone text,
  latitude double precision,
  longitude double precision,
  active boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS dealers_city_idx ON dealers (lower(city));
CREATE INDEX IF NOT EXISTS dealers_pin_idx ON dealers (pin_code);

ALTER TABLE dealers ENABLE ROW LEVEL SECURITY;
GRANT SELECT ON dealers TO anon, authenticated;

DROP POLICY IF EXISTS "public_read_active_dealers" ON dealers;
CREATE POLICY "public_read_active_dealers" ON dealers FOR SELECT
  TO anon, authenticated
  USING (active = true);

CREATE TABLE IF NOT EXISTS price_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  grade text NOT NULL,
  diameter_mm integer NOT NULL CHECK (diameter_mm > 0),
  price numeric(12,2) NOT NULL CHECK (price >= 0),
  unit text NOT NULL DEFAULT 'per piece',
  region text NOT NULL DEFAULT 'All regions',
  updated_at timestamptz NOT NULL DEFAULT now(),
  active boolean NOT NULL DEFAULT false
);

ALTER TABLE price_items ENABLE ROW LEVEL SECURITY;
GRANT SELECT ON price_items TO anon, authenticated;

DROP POLICY IF EXISTS "public_read_active_prices" ON price_items;
CREATE POLICY "public_read_active_prices" ON price_items FOR SELECT
  TO anon, authenticated
  USING (active = true);
