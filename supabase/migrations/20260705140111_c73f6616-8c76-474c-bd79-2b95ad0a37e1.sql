
-- 1) Explicit restrictive read policy on leads: block all SELECT via Data API.
-- Only service_role (which bypasses RLS) can read leads. This makes the fail-closed posture explicit.
CREATE POLICY "No public read of leads"
ON public.leads
AS RESTRICTIVE
FOR SELECT
TO anon, authenticated
USING (false);

-- 2) Lock down storage.objects for the 'venus-media' bucket.
-- Keep public SELECT (bucket is public for media delivery) but block anon/auth writes & deletes.
CREATE POLICY "venus-media public read"
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (bucket_id = 'venus-media');

CREATE POLICY "venus-media block anon writes"
ON storage.objects
AS RESTRICTIVE
FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id <> 'venus-media');

CREATE POLICY "venus-media block anon updates"
ON storage.objects
AS RESTRICTIVE
FOR UPDATE
TO anon, authenticated
USING (bucket_id <> 'venus-media')
WITH CHECK (bucket_id <> 'venus-media');

CREATE POLICY "venus-media block anon deletes"
ON storage.objects
AS RESTRICTIVE
FOR DELETE
TO anon, authenticated
USING (bucket_id <> 'venus-media');
