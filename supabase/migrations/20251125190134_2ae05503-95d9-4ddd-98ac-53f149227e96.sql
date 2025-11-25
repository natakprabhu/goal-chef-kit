-- Create blog_authors table
CREATE TABLE IF NOT EXISTS public.blog_authors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  bio TEXT NOT NULL,
  credentials TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  read_time TEXT NOT NULL,
  image_url TEXT,
  author_id UUID NOT NULL REFERENCES public.blog_authors(id) ON DELETE CASCADE,
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.blog_authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for blog_authors
CREATE POLICY "Anyone can view authors"
  ON public.blog_authors FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage authors"
  ON public.blog_authors FOR ALL
  USING (auth.role() = 'authenticated');

-- RLS Policies for blog_posts
CREATE POLICY "Anyone can view published posts"
  ON public.blog_posts FOR SELECT
  USING (published = true);

CREATE POLICY "Authenticated users can manage posts"
  ON public.blog_posts FOR ALL
  USING (auth.role() = 'authenticated');

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_author ON public.blog_posts(author_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON public.blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON public.blog_posts(published);

-- Create updated_at triggers
CREATE TRIGGER update_blog_authors_updated_at
  BEFORE UPDATE ON public.blog_authors
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();