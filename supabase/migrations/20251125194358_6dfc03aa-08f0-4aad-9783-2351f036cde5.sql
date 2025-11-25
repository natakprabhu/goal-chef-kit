-- Add INSERT policy for recipes table to allow authenticated users to seed data
CREATE POLICY "Authenticated users can insert recipes"
ON recipes
FOR INSERT
TO authenticated
WITH CHECK (true);