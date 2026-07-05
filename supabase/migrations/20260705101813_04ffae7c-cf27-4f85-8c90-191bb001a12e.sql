
CREATE EXTENSION IF NOT EXISTS citext;

CREATE TYPE public.enquiry_kind AS ENUM ('general','school_placement','athletex','contact');

CREATE TABLE public.enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kind public.enquiry_kind NOT NULL,
  ref text NOT NULL UNIQUE,
  email citext NOT NULL,
  payload jsonb NOT NULL,
  ip_hash text,
  user_agent text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX enquiries_kind_created_idx ON public.enquiries (kind, created_at DESC);
CREATE INDEX enquiries_email_idx ON public.enquiries (email);

GRANT INSERT ON public.enquiries TO anon, authenticated;
GRANT ALL ON public.enquiries TO service_role;

ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public can submit enquiries"
  ON public.enquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(coalesce(ref,'')) BETWEEN 6 AND 12
    AND length(email::text) BETWEEN 5 AND 254
  );
