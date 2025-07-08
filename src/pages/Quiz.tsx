import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Trophy, Clock, Target, Play } from 'lucide-react';
import QuizEngine from '../components/QuizEngine';
import { Quiz } from '../types';
import quizzesData from '../data/quizzes.json';

const QuizPage: React.FC = () => {
  const { t } = useTranslation();
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);

  const handleQuizSelect = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setShowQuiz(true);
  };

  const handleQuizComplete = (score: number) => {
    setShowQuiz(false);
    setSelectedQuiz(null);
  };

  if (showQuiz && selectedQuiz) {
    return <QuizEngine quiz={selectedQuiz} onComplete={handleQuizComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent-50 to-primary-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('quiz.title')}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Uji kemampuan Anda dalam membaca dan menulis aksara Batak
          </p>
        </div>

        {/* Quiz Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzesData.map((quiz) => (
            <div
              key={quiz.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    quiz.difficulty === 'beginner' 
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300'
                      : quiz.difficulty === 'intermediate'
                      ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300'
                      : 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300'
                  }`}>
                    {quiz.difficulty}
                  </div>
                  <Trophy className="w-5 h-5 text-gray-400 group-hover:text-primary-500 transition-colors" />
                </div>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {quiz.title}
                </h3>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
                  <div className="flex items-center">
                    <Target className="w-4 h-4 mr-1" />
                    <span>{quiz.items.length} soal</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>~{quiz.items.length * 30}s</span>
                  </div>
                </div>

                <button
                  onClick={() => handleQuizSelect(quiz)}
                  className="w-full flex items-center justify-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white py-3 px-4 rounded-lg transition-colors group-hover:scale-105 transform duration-200"
                >
                  <Play className="w-4 h-4" />
                  <span>Mulai Quiz</span>
                </button>
              </div>

              {/* Progress Bar */}
              <div className="px-6 pb-6">
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
                  <span>Progress</span>
                  <span>0%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                  <div className="bg-primary-600 h-1 rounded-full" style={{ width: '0%' }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Achievement Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Pencapaian Anda
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Pemula', icon: '🥉', description: 'Selesaikan quiz pertama' },
              { name: 'Pembelajar', icon: '🥈', description: 'Selesaikan 5 quiz' },
              { name: 'Ahli', icon: '🥇', description: 'Selesaikan semua quiz' },
              { name: 'Sempurna', icon: '🏆', description: 'Skor 100% di semua quiz' },
            ].map((achievement) => (
              <div
                key={achievement.name}
                className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center opacity-50"
              >
                <div className="text-3xl mb-2">{achievement.icon}</div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                  {achievement.name}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;