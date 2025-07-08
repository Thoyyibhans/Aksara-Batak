import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Award, RotateCcw } from 'lucide-react';
import { Quiz, QuizQuestion } from '../types';
import useAppStore from '../store/useAppStore';

interface QuizEngineProps {
  quiz: Quiz;
  onComplete?: (score: number) => void;
}

const QuizEngine: React.FC<QuizEngineProps> = ({ quiz, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const { updateProgress } = useAppStore();

  const question = quiz.items[currentQuestion];
  const totalQuestions = quiz.items.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  const handleAnswer = (answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [question.id]: answer
    }));
    setUserAnswer(answer);
  };

  const nextQuestion = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(prev => prev + 1);
      setUserAnswer('');
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    const score = calculateScore();
    setShowResults(true);
    updateProgress({
      quizScores: { [quiz.id]: score },
      totalPoints: score * 10
    });
    onComplete?.(score);
  };

  const calculateScore = () => {
    const correctAnswers = quiz.items.filter(
      item => answers[item.id] === item.answer
    ).length;
    return Math.round((correctAnswers / totalQuestions) * 100);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setUserAnswer('');
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreMedal = (score: number) => {
    if (score >= 90) return '🥇';
    if (score >= 70) return '🥈';
    if (score >= 50) return '🥉';
    return '📝';
  };

  if (showResults) {
    const score = calculateScore();
    
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
          <div className="text-6xl mb-4">{getScoreMedal(score)}</div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            Quiz Complete!
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            {quiz.title}
          </p>
          
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6">
            <div className={`text-4xl font-bold mb-2 ${getScoreColor(score)}`}>
              {score}%
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              {quiz.items.filter(item => answers[item.id] === item.answer).length} out of {totalQuestions} correct
            </p>
          </div>
          
          <div className="space-y-4">
            {quiz.items.map((item, index) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="font-medium">Question {index + 1}</span>
                {answers[item.id] === item.answer ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600" />
                )}
              </div>
            ))}
          </div>
          
          <button
            onClick={resetQuiz}
            className="mt-6 flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors mx-auto"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              {quiz.title}
            </h2>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {currentQuestion + 1} / {totalQuestions}
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
            {question.question}
          </h3>
          
          {question.type === 'choice' && question.choices && (
            <div className="space-y-3">
              {question.choices.map((choice, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(choice)}
                  className={`w-full p-3 text-left rounded-lg border-2 transition-colors ${
                    userAnswer === choice
                      ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                >
                  {choice}
                </button>
              ))}
            </div>
          )}
          
          {question.type === 'type-latin' && (
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => {
                setUserAnswer(e.target.value);
                handleAnswer(e.target.value);
              }}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-200"
              placeholder="Type your answer in Latin..."
            />
          )}
          
          {question.type === 'type-batak' && (
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => {
                setUserAnswer(e.target.value);
                handleAnswer(e.target.value);
              }}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-200"
              placeholder="Type your answer in Batak script..."
              style={{ fontFamily: 'Noto Sans Batak, serif' }}
            />
          )}
        </div>
        
        <div className="flex justify-between">
          <button
            onClick={() => currentQuestion > 0 && setCurrentQuestion(prev => prev - 1)}
            disabled={currentQuestion === 0}
            className="px-4 py-2 text-gray-600 dark:text-gray-400 disabled:opacity-50"
          >
            Previous
          </button>
          
          <button
            onClick={nextQuestion}
            disabled={!userAnswer}
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentQuestion === totalQuestions - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizEngine;