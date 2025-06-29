/*
  # Authentication and User Management Setup

  1. Security Updates
    - Update RLS policies to use proper authentication
    - Ensure data isolation between authenticated users
  
  2. Changes
    - Update tasks table policies for authenticated users
    - Update streaks table policies for authenticated users
    - Remove anonymous access and require authentication
*/

-- Update tasks table policies
DROP POLICY IF EXISTS "Users can manage their own tasks" ON tasks;

CREATE POLICY "Authenticated users can manage their own tasks"
  ON tasks
  FOR ALL
  TO authenticated
  USING (auth.uid()::text = user_id)
  WITH CHECK (auth.uid()::text = user_id);

-- Update streaks table policies  
DROP POLICY IF EXISTS "Users can manage their own streaks" ON streaks;

CREATE POLICY "Authenticated users can manage their own streaks"
  ON streaks
  FOR ALL
  TO authenticated
  USING (auth.uid()::text = user_id)
  WITH CHECK (auth.uid()::text = user_id);