import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronRight, Play, Award, BookOpen, Trophy, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import LetterTable from '../components/LetterTable';
import StrokeDemo from '../components/StrokeDemo';
import { Letter } from '../types';
import useAppStore from '../store/useAppStore';
import lettersData from '../data/letters.json';

const Learn: React.FC = () => {
  const { t } = useTranslation();
  const { currentVariant, userProgress, user } = useAppStore();
  const [selectedLetter, setSelectedLetter] = useState<Letter | null>(null);
  const [showStrokeDemo, setShowStrokeDemo] = useState(false);

  const filteredLetters = lettersData.filter(letter => 
    letter.varian.includes(currentVariant)
  );

  const progress = userProgress.completedLessons.length > 0 
    ? (userProgress.completedLessons.length / filteredLetters.length) * 100 
    : 0;

  const handleLetterClick = (letter: Letter) => {
    setSelectedLetter(letter);
    setShowStrokeDemo(true);
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-primary-600';
  };

  const getProgressMessage = (progress: number) => {
    if (progress === 0) return 'Mulai perjalanan belajar Anda!';
    if (progress < 25) return 'Terus semangat! Anda baru memulai.';
    if (progress < 50) return 'Bagus! Anda sudah menguasai beberapa huruf.';
    if (progress < 75) return 'Luar biasa! Anda hampir menguasai setengahnya.';
    if (progress < 100) return 'Hebat! Anda hampir menyelesaikan semua huruf.';
    return 'Selamat! Anda telah menguasai semua huruf dasar!';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('learn.title')}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Pelajari 19 huruf dasar aksara Batak dengan metode interaktif
          </p>
          
          {/* Progress Section */}
          <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('learn.progress')}
                </span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {userProgress.completedLessons.length}/{filteredLetters.length} huruf
              </span>
            </div>
            
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-3">
              <div
                className={`h-3 rounded-full transition-all duration-500 ${getProgressColor(progress)}`}
                style={{ width: `${progress}%` }}
              />
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              {getProgressMessage(progress)}
            </p>
            
            {user && (
              <div className="mt-4 flex justify-center space-x-6 text-sm">
                <div className="text-center">
                  <div className="font-semibold text-primary-600 dark:text-primary-400">
                    {userProgress.totalPoints}
                  </div>
                  <div className="text-gray-500 dark:text-gray-400">Poin</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-green-600 dark:text-green-400">
                    {userProgress.currentStreak}
                  </div>
                  <div className="text-gray-500 dark:text-gray-400">Hari Berturut</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-purple-600 dark:text-purple-400">
                    {Object.keys(userProgress.quizScores).length}
                  </div>
                  <div className="text-gray-500 dark:text-gray-400">Kuis Selesai</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Variant Selector */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white dark:bg-gray-800 rounded-lg p-1 shadow-md">
            {['toba', 'mandailing', 'karo'].map((variant) => (
              <button
                key={variant}
                onClick={() => useAppStore.getState().setCurrentVariant(variant)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentVariant === variant
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400'
                }`}
              >
                {variant.charAt(0).toUpperCase() + variant.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Letter Table */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                {t('learn.letters')} ({currentVariant})
              </h2>
              <LetterTable 
                letters={filteredLetters}
                onLetterClick={handleLetterClick}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stroke Demo */}
            {selectedLetter && showStrokeDemo && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Animasi Stroke - {selectedLetter.latin}
                </h3>
                <StrokeDemo
                  character={selectedLetter.char}
                  strokePath="M50,50 L150,50 L150,150 L50,150 Z"
                  isPlaying={showStrokeDemo}
                />
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    <strong>Huruf:</strong> {selectedLetter.char}<br />
                    <strong>Bunyi:</strong> {selectedLetter.latin}<br />
                    <strong>Varian:</strong> {selectedLetter.varian.join(', ')}
                  </p>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Aksi Cepat
              </h3>
              <div className="space-y-3">
                <Link
                  to="/belajar/kuis"
                  className="w-full flex items-center justify-between p-3 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
                >
                  <div className="flex items-center">
                    <Award className="w-4 h-4 mr-2" />
                    <span>{t('learn.quiz')}</span>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </Link>
                
                <Link
                  to="/transliterator"
                  className="w-full flex items-center justify-between p-3 bg-accent-50 dark:bg-accent-900/20 text-accent-700 dark:text-accent-300 rounded-lg hover:bg-accent-100 dark:hover:bg-accent-900/30 transition-colors"
                >
                  <div className="flex items-center">
                    <Target className="w-4 h-4 mr-2" />
                    <span>Transliterator</span>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/teks"
                  className="w-full flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                >
                  <div className="flex items-center">
                    <BookOpen className="w-4 h-4 mr-2" />
                    <span>Baca Pustaha</span>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Achievement Badges */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Pencapaian
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: 'Pemula', icon: '🌱', condition: progress > 0, desc: 'Mulai belajar' },
                  { name: 'Pembelajar', icon: '📚', condition: progress >= 25, desc: '25% selesai' },
                  { name: 'Ahli', icon: '🎓', condition: progress >= 75, desc: '75% selesai' },
                  { name: 'Master', icon: '👑', condition: progress === 100, desc: '100% selesai' },
                ].map((badge) => (
                  <div
                    key={badge.name}
                    className={`p-3 rounded-lg text-center transition-all ${
                      badge.condition
                        ? 'bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-200 dark:border-yellow-800'
                        : 'bg-gray-50 dark:bg-gray-700 opacity-50'
                    }`}
                  >
                    <div className="text-2xl mb-1">{badge.icon}</div>
                    <div className="text-xs font-medium text-gray-900 dark:text-white">
                      {badge.name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {badge.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learn;