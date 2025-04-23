import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, SkipForward, Trophy } from 'lucide-react';
import { SessionStats } from '../types';
import Card, { CardHeader, CardBody } from './UI/Card';
import ProgressIndicator from './UI/ProgressIndicator';

interface ScoreDisplayProps {
  stats: SessionStats;
  totalQuestions?: number;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({
  stats,
  totalQuestions = 10
}) => {
  const [animateScore, setAnimateScore] = useState(false);
  
  useEffect(() => {
    setAnimateScore(true);
    const timer = setTimeout(() => setAnimateScore(false), 1000);
    return () => clearTimeout(timer);
  }, [stats.total_score]);
  
  const progressValue = stats.correct + stats.wrong + stats.skipped;
  const accuracy = stats.correct + stats.wrong > 0 
    ? Math.round((stats.correct / (stats.correct + stats.wrong)) * 100) 
    : 0;
  
  return (
    <Card className="w-full">
      <CardHeader className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
        <h3 className="text-lg font-semibold flex items-center">
          <Trophy className="mr-2" size={20} />
          Score Tracker
        </h3>
      </CardHeader>
      
      <CardBody>
        <div className="mb-6">
          <div className={`text-4xl font-bold text-center mb-2 transition-all duration-300 ${
            animateScore ? 'scale-125 text-blue-600' : ''
          }`}>
            {stats.total_score}
          </div>
          <p className="text-gray-600 text-center">Total Score</p>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="flex flex-col items-center">
            <div className="flex items-center text-green-600 mb-1">
              <CheckCircle size={16} className="mr-1" />
              <span className="font-semibold">{stats.correct}</span>
            </div>
            <p className="text-xs text-gray-600">Correct</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="flex items-center text-red-600 mb-1">
              <XCircle size={16} className="mr-1" />
              <span className="font-semibold">{stats.wrong}</span>
            </div>
            <p className="text-xs text-gray-600">Wrong</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="flex items-center text-gray-600 mb-1">
              <SkipForward size={16} className="mr-1" />
              <span className="font-semibold">{stats.skipped}</span>
            </div>
            <p className="text-xs text-gray-600">Skipped</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Progress
            </label>
            <ProgressIndicator
              value={progressValue}
              maxValue={totalQuestions}
              variant="primary"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Accuracy
            </label>
            <ProgressIndicator
              value={accuracy}
              maxValue={100}
              variant={accuracy >= 70 ? 'success' : 'danger'}
              labelFormat={(val) => `${val}%`}
            />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default ScoreDisplay;