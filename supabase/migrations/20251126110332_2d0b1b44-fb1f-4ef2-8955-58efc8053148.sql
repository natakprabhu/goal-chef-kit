-- Create function to notify search engines when blog posts are published
CREATE OR REPLACE FUNCTION notify_blog_post_update()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  request_id bigint;
BEGIN
  -- Only notify if the post is published
  IF NEW.published = true THEN
    -- Call the edge function to submit sitemap to search engines
    SELECT net.http_post(
      url := 'https://kaqjnyjkosefosbncwki.supabase.co/functions/v1/notify-content-update',
      headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImthcWpueWprb3NlZm9zYm5jd2tpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2MzQwNjIsImV4cCI6MjA3ODIxMDA2Mn0.u4bFz223JdDpnWUiIm25T0ddNHX467LpVgOgHrcsqdM"}'::jsonb,
      body := json_build_object('type', 'blog_post', 'record', row_to_json(NEW))::jsonb
    ) INTO request_id;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger for blog posts
DROP TRIGGER IF EXISTS on_blog_post_update ON blog_posts;
CREATE TRIGGER on_blog_post_update
  AFTER INSERT OR UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION notify_blog_post_update();

-- Create function to notify search engines when recipes are added
CREATE OR REPLACE FUNCTION notify_recipe_update()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  request_id bigint;
BEGIN
  -- Only notify for guest-accessible recipes
  IF NEW.access_level = 'guest' THEN
    -- Call the edge function to submit sitemap to search engines
    SELECT net.http_post(
      url := 'https://kaqjnyjkosefosbncwki.supabase.co/functions/v1/notify-content-update',
      headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImthcWpueWprb3NlZm9zYm5jd2tpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2MzQwNjIsImV4cCI6MjA3ODIxMDA2Mn0.u4bFz223JdDpnWUiIm25T0ddNHX467LpVgOgHrcsqdM"}'::jsonb,
      body := json_build_object('type', 'recipe', 'record', row_to_json(NEW))::jsonb
    ) INTO request_id;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger for recipes
DROP TRIGGER IF EXISTS on_recipe_update ON recipes;
CREATE TRIGGER on_recipe_update
  AFTER INSERT OR UPDATE ON recipes
  FOR EACH ROW
  EXECUTE FUNCTION notify_recipe_update();