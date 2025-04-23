import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BrainCircuit } from 'lucide-react';
import QuestionCard from '../components/QuestionCard';
import Button from '../components/UI/Button';
import questions from '../config/questions.json';
import VideoMonitor from '../components/VideoMonitor';

interface Question {
  id: number;
  text: string;
  choices: string[];
  correct_answer: string;
}

const AssessmentPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [studentPresent, setStudentPresent] = useState(true);
  const [username, setUsername] = useState('User');

  const handleAnswerSubmit = (answer: string) => {
    if (answer === questions.questions[currentQuestionIndex].correct_answer) {
      setScore(prevScore => prevScore + 1);
    }
    setSelectedAnswer(answer);
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    setSelectedAnswer('');
    if (currentQuestionIndex < questions.questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      navigate('/results', { state: { score: score, totalQuestions: questions.questions.length, username: username } });
    }
  };

  const handleSkip = () => {
    setSelectedAnswer('');
    if (currentQuestionIndex < questions.questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      navigate('/results', { state: { score: score, totalQuestions: questions.questions.length, username: username } });
    }
  };

  const handleStudentStatusChange = (present: boolean) => {
    setStudentPresent(present);
  };

  const progress = ((currentQuestionIndex + 1) / questions.questions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-transparent py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div>
            <img src="/logo.png" alt="HackingFlix Logo" className="h-8" />
          </div>
          <nav className="space-x-6 text-gray-300">
            <Link to="/" className="hover:text-white">Home</Link>
            <Link to="/about" className="hover:text-white">About</Link>
            <Link to="/contact" className="hover:text-white">Contact</Link>
          </nav>
        </div>
      </header>

      <div className="w-full bg-gray-700 h-2 rounded-full mt-2">
        <div
          className="bg-green-500 h-2 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-400 mt-1">
        Question {currentQuestionIndex + 1} / {questions.questions.length}
      </div>

      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-start">
          <div className="w-2/3">
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-300 text-sm font-bold mb-2">
                Enter your name:
              </label>
              <input
                type="text"
                id="username"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white">
                {questions.questions[currentQuestionIndex].text}
              </h2>
            </div>

            <QuestionCard
              text={questions.questions[currentQuestionIndex].text}
              choices={questions.questions[currentQuestionIndex].choices}
              onSubmitAnswer={handleAnswerSubmit}
              onSkip={handleSkip}
              selectedAnswer={selectedAnswer}
            />
          </div>
          <div className="w-1/3 pl-8">
            <VideoMonitor
              enabled={true}
              onStatusChange={handleStudentStatusChange}
            />
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mt-8 border-t border-gray-700 pt-8 text-gray-400 text-sm text-center">
            <p>© 2025 HackingFlix. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AssessmentPage;
