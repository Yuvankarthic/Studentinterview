import React, { useState } from 'react';
import { Send, SkipForward, Clock } from 'lucide-react';
import Card, { CardHeader, CardBody, CardFooter } from './UI/Card';
import Button from './UI/Button';
import Spinner from './UI/Spinner';

interface QuestionCardProps {
  text: string;
  choices: string[];
  onSubmitAnswer: (answer: string) => void;
  onSkip: () => void;
  loading?: boolean;
  remainingTime?: number;
  selectedAnswer: string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  text,
  choices,
  onSubmitAnswer,
  onSkip,
  loading = false,
  remainingTime
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState('');

  const handleSubmit = () => {
    if (selectedAnswer) {
      onSubmitAnswer(selectedAnswer);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <Card className="w-full max-w-2xl mx-auto transition-all duration-300 hover:shadow-lg bg-gray-800 border border-gray-700 backdrop-filter backdrop-blur-lg bg-opacity-30 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-green-500 to-white text-black">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Question</h3>
          {remainingTime !== undefined && (
            <div className="flex items-center text-black/90">
              <Clock size={16} className="mr-1" />
              <span>{formatTime(remainingTime)}</span>
            </div>
          )}
        </div>
      </CardHeader>

      <CardBody className="text-white">
        <div className="mb-6">
          <p className="text-lg font-medium text-gray-300">{text}</p>
        </div>

        <div className="mb-4">
          {choices.map((choice, index) => (
            <label
              key={index}
              htmlFor={`choice-${index}`}
              className={`flex items-center mb-2 p-2 rounded-md hover:bg-gray-700 hover:scale-105 transition-all duration-200 cursor-pointer ${selectedAnswer === choice ? 'bg-blue-100 text-black ring-2 ring-blue-500 scale-105 animate-pulse' : ''}`}
              onClick={() => {
                if (!loading) {
                  onSubmitAnswer(choice.charAt(0));
                }
              }}
            >
              {choice}
            </label>
          ))}
        </div>
      </CardBody>

      <CardFooter className="bg-gray-800 flex justify-between items-center">
        <Button
          variant="outline"
          onClick={() => onSkip()}
          disabled={loading}
          className="flex items-center text-green-500 border border-green-500 hover:bg-green-500 hover:text-white transition"
        >
          <SkipForward size={16} className="mr-1" />
          Skip
        </Button>

      </CardFooter>
    </Card>
  );
};

export default QuestionCard;

// Tailwind CSS animation classes
// animate-pulse: makes the text pulse
// animate-fade-in: Add this to tailwind config
// @keyframes fade-in {
//   from { opacity: 0; }
//   to { opacity: 1; }
// }
// .animate-fade-in {
//   animation: fade-in 1s ease-in-out forwards;
// }
