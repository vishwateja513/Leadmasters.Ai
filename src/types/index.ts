export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  total_questions: number;
  duration_minutes: number;
  created_at: string;
}

export interface Question {
  id: string;
  module_id: string;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: 'a' | 'b' | 'c' | 'd';
  question_number: number;
}

export interface UserAttempt {
  id: string;
  user_id: string;
  module_id: string;
  score: number;
  total_questions: number;
  time_taken_minutes: number;
  answers: Record<string, string>;
  completed_at: string;
  proctoring_violations: number;
}

export interface ProctoringEvent {
  type: 'tab_change' | 'fullscreen_exit' | 'right_click' | 'copy_paste';
  timestamp: string;
}