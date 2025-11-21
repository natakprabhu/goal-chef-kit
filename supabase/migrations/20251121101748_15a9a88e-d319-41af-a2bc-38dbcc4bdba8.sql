-- Update meal_type enum to support snack and snack2
ALTER TYPE meal_type ADD VALUE IF NOT EXISTS 'snack2';