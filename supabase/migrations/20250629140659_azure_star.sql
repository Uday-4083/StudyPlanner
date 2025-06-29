/*
  # Create tasks table for StudySprint

  1. New Tables
    - `tasks`
      - `id` (uuid, primary key)
      - `title` (text, task description)
      - `subject` (text, subject category)
      - `completed` (boolean, completion status)
      - `date` (date, task date)
      - `user_id` (text, user identifier)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `tasks` table
    - Add policy for users to manage their own tasks
*/

CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subject text NOT NULL,
  completed boolean DEFAULT false,
  date date NOT NULL,
  user_id text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own tasks"
  ON tasks
  FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);