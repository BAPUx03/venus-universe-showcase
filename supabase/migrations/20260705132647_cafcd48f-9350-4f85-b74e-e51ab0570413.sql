
DROP POLICY IF EXISTS "Anyone can insert leads" ON public.leads;
CREATE POLICY "Public can submit leads"
  ON public.leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(btrim(email)) > 0
    AND length(btrim(phone)) > 0
    AND length(btrim(first_name)) > 0
    AND length(btrim(last_name)) > 0
    AND length(btrim(requirement)) > 0
    AND length(btrim(budget)) > 0
    AND length(email) <= 320
    AND length(phone) <= 32
    AND length(first_name) <= 100
    AND length(last_name) <= 100
    AND length(requirement) <= 500
    AND length(budget) <= 100
  );
