-- Create health_news table
CREATE TABLE IF NOT EXISTS public.health_news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  url TEXT NOT NULL,
  category TEXT,
  read_time TEXT,
  source TEXT,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.health_news ENABLE ROW LEVEL SECURITY;

-- Allow everyone to view health news
CREATE POLICY "Anyone can view health news"
ON public.health_news
FOR SELECT
USING (true);

-- Insert sample data
INSERT INTO public.health_news (title, description, url, category, read_time, source) VALUES
('The Science Behind Protein Timing', 'New research reveals the optimal times to consume protein for maximum muscle growth and recovery.', 'https://example.com/protein-timing', 'Nutrition', '5 min read', 'Health Journal'),
('Understanding Micronutrients', 'Why vitamins and minerals are just as important as macros for your overall health and fitness goals.', 'https://example.com/micronutrients', 'Wellness', '4 min read', 'Nutrition Today'),
('Meal Prep Tips for Busy Professionals', 'Expert strategies to prepare healthy meals in advance and stay on track with your nutrition goals.', 'https://example.com/meal-prep', 'Lifestyle', '6 min read', 'Fitness Magazine'),
('The Role of Fiber in Weight Management', 'Learn how dietary fiber can help with satiety, digestion, and achieving your weight loss goals.', 'https://example.com/fiber', 'Nutrition', '5 min read', 'Diet Science');