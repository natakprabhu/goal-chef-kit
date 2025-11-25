-- Add goal_category column to recipes table
ALTER TABLE recipes ADD COLUMN goal_category text;

-- Add check constraint for goal_category
ALTER TABLE recipes ADD CONSTRAINT recipes_goal_category_check 
CHECK (goal_category IN ('weight_gain', 'weight_loss', 'maintenance'));

-- Create index for better query performance
CREATE INDEX idx_recipes_goal_category ON recipes(goal_category);

-- Update existing recipes based on their tags (if any exist)
UPDATE recipes 
SET goal_category = 'weight_gain' 
WHERE 'weight gain' = ANY(tags);

UPDATE recipes 
SET goal_category = 'weight_loss' 
WHERE 'weight loss' = ANY(tags);

UPDATE recipes 
SET goal_category = 'maintenance' 
WHERE 'maintenance' = ANY(tags) OR goal_category IS NULL;