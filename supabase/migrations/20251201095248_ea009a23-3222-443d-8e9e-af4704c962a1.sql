-- Drop the existing restrictive policy
DROP POLICY IF EXISTS "Anyone can view published posts" ON public.blog_posts;

-- Create a permissive policy that allows anyone (including anonymous) to view published posts
CREATE POLICY "Anyone can view published posts"
ON public.blog_posts
FOR SELECT
USING (published = true);