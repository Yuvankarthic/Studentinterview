export interface Question {
  id: number;
  text: string;
  choices: string[];
  correct_answer: string;
  category: string;
}

export interface SessionStats {
  correct: number;
  wrong: number;
  skipped: number;
  total_score: number;
}

export interface AnswerResult {
  result: 'correct' | 'wrong' | 'skipped';
  score: number;
  session_stats: SessionStats;
}

export interface VideoProcessingResult {
  student_present: boolean;
  faces_detected: number;
  error?: string;
}

export interface AppConfig {
  apiBaseUrl: string;
}
