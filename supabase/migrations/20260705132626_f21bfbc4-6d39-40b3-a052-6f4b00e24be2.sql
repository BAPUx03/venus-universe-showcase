
-- leads: drop public SELECT
DROP POLICY IF EXISTS "Leads readable" ON public.leads;

-- site_content: drop overly permissive INSERT/UPDATE
DROP POLICY IF EXISTS "Anyone can insert site content" ON public.site_content;
DROP POLICY IF EXISTS "Anyone can update site content" ON public.site_content;

-- venus-media storage: drop broad listing + write/delete policies
DROP POLICY IF EXISTS "Public read venus-media" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload venus-media" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can update venus-media" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can delete venus-media" ON storage.objects;
