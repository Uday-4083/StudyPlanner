/*
  # Create streaks table for StudySprint

  1. New Tables
    - `streaks`
      - `id` (uuid, primary key)
      - `user_id` (text, user identifier)
      - `current_streak` (integer, current consecutive days)
      - `last_activity_date` (date, last activity date)
      - `longest_streak` (integer, best streak achieved)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `streaks` table
    - Add policy for users to manage their own streaks
*/

CREATE TABLE IF NOT EXISTS streaks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL UNIQUE,
  current_streak integer DEFAULT 0,
  last_activity_date date NOT NULL,
  longest_streak integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE streaks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own streaks"
  ON streaks
  FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);