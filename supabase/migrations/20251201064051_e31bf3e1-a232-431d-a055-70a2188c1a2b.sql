-- Enable required extensions for cron jobs
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Schedule daily sitemap regeneration at 3 AM UTC
SELECT cron.schedule(
  'daily-sitemap-regeneration',
  '0 3 * * *',
  $$
  SELECT net.http_post(
    url := 'https://kaqjnyjkosefosbncwki.supabase.co/functions/v1/generate-full-sitemap',
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImthcWpueWprb3NlZm9zYm5jd2tpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2MzQwNjIsImV4cCI6MjA3ODIxMDA2Mn0.u4bFz223JdDpnWUiIm25T0ddNHX467LpVgOgHrcsqdM"}'::jsonb,
    body := '{}'::jsonb
  ) AS request_id;
  $$
);