-- Add SEO fields to blog_posts table
ALTER TABLE blog_posts 
ADD COLUMN meta_title TEXT,
ADD COLUMN meta_description TEXT,
ADD COLUMN og_image TEXT,
ADD COLUMN schema_markup JSONB;