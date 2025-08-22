/*
  # Create exam application database schema

  1. New Tables
    - `modules`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `total_questions` (integer)
      - `duration_minutes` (integer)
      - `created_at` (timestamp)
    
    - `questions`
      - `id` (uuid, primary key)
      - `module_id` (uuid, foreign key)
      - `question_text` (text)
      - `option_a` (text)
      - `option_b` (text)
      - `option_c` (text)
      - `option_d` (text)
      - `correct_answer` (text)
      - `question_number` (integer)
    
    - `user_attempts`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `module_id` (uuid, foreign key)
      - `score` (integer)
      - `total_questions` (integer)
      - `time_taken_minutes` (integer)
      - `answers` (jsonb)
      - `completed_at` (timestamp)
      - `proctoring_violations` (integer)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to read modules and questions
    - Add policies for users to manage their own attempts
*/

-- Create modules table
CREATE TABLE IF NOT EXISTS modules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  total_questions integer NOT NULL DEFAULT 0,
  duration_minutes integer NOT NULL DEFAULT 60,
  created_at timestamptz DEFAULT now()
);

-- Create questions table
CREATE TABLE IF NOT EXISTS questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id uuid REFERENCES modules(id) ON DELETE CASCADE,
  question_text text NOT NULL,
  option_a text NOT NULL,
  option_b text NOT NULL,
  option_c text NOT NULL,
  option_d text NOT NULL,
  correct_answer text NOT NULL CHECK (correct_answer IN ('a', 'b', 'c', 'd')),
  question_number integer NOT NULL
);

-- Create user_attempts table
CREATE TABLE IF NOT EXISTS user_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  module_id uuid REFERENCES modules(id) ON DELETE CASCADE,
  score integer NOT NULL DEFAULT 0,
  total_questions integer NOT NULL,
  time_taken_minutes integer NOT NULL DEFAULT 0,
  answers jsonb DEFAULT '{}',
  completed_at timestamptz DEFAULT now(),
  proctoring_violations integer DEFAULT 0
);

-- Enable RLS
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_attempts ENABLE ROW LEVEL SECURITY;

-- Create policies for modules
CREATE POLICY "Anyone can read modules"
  ON modules
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policies for questions
CREATE POLICY "Anyone can read questions"
  ON questions
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policies for user_attempts
CREATE POLICY "Users can read own attempts"
  ON user_attempts
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own attempts"
  ON user_attempts
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Insert sample modules
INSERT INTO modules (title, description, total_questions, duration_minutes) VALUES
  ('Programming Basics', 'Fundamental programming concepts including variables, data structures, algorithms, and basic programming principles.', 20, 30),
  ('JavaScript', 'Core JavaScript concepts including data types, operators, functions, arrays, objects, and ES6+ features.', 20, 30),
  ('React', 'React fundamentals covering components, hooks, state management, lifecycle methods, and modern React patterns.', 20, 30)
ON CONFLICT DO NOTHING;