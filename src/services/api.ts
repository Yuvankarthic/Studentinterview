import axios from 'axios';
import config from '../config';
import { Question, AnswerResult, VideoProcessingResult } from '../types';

const api = axios.create({
  baseURL: config.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const fetchQuestions = async (): Promise<Question[]> => {
  const response = await api.get('/questions');
  return response.data.questions;
};

export const generateQuestion = async (subject: string, difficulty: string): Promise<Question> => {
  const response = await api.post('/generate-question', { subject, difficulty });
  return response.data;
};

export const checkAnswer = async (
  answer: string, 
  correct_answer: string, 
  session_id: string
): Promise<AnswerResult> => {
  const response = await api.post('/check-answer', { answer, correct_answer, session_id });
  return response.data;
};

export const processVideo = async (image: string): Promise<VideoProcessingResult> => {
  const response = await api.post('/process-video', { image });
  return response.data;
};

export const getSessionStats = async (session_id: string) => {
  const response = await api.get(`/session/${session_id}`);
  return response.data;
};

export default api;