-- Create a storage bucket for sitemaps (public access)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('sitemaps', 'sitemaps', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to sitemap files
CREATE POLICY "Anyone can view sitemaps"
ON storage.objects FOR SELECT
USING (bucket_id = 'sitemaps');

-- Allow service role to upload sitemaps (edge functions use service role)
CREATE POLICY "Service role can upload sitemaps"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'sitemaps');

CREATE POLICY "Service role can update sitemaps"
ON storage.objects FOR UPDATE
USING (bucket_id = 'sitemaps');

CREATE POLICY "Service role can delete sitemaps"
ON storage.objects FOR DELETE
USING (bucket_id = 'sitemaps');