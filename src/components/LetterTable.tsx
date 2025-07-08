import React, { useState } from 'react';
import { Play, Volume2, VolumeX } from 'lucide-react';
import { Letter } from '../types';
import useAppStore from '../store/useAppStore';

interface LetterTableProps {
  letters: Letter[];
  onLetterClick?: (letter: Letter) => void;
}

const LetterTable: React.FC<LetterTableProps> = ({ letters, onLetterClick }) => {
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const [audioError, setAudioError] = useState<string | null>(null);
  const { updateProgress } = useAppStore();

  const playAudio = async (letterId: string, latin: string) => {
    if (playingAudio === letterId) {
      setPlayingAudio(null);
      return;
    }
    
    setPlayingAudio(letterId);
    setAudioError(null);
    
    try {
      // Create synthetic audio using Web Speech API
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(latin);
        utterance.lang = 'id-ID';
        utterance.rate = 0.7;
        utterance.pitch = 1.2;
        
        utterance.onend = () => {
          setPlayingAudio(null);
        };
        
        utterance.onerror = () => {
          setAudioError('Audio tidak tersedia');
          setPlayingAudio(null);
        };
        
        speechSynthesis.speak(utterance);
        
        // Mark as learned
        updateProgress({
          completedLessons: [letterId],
          totalPoints: 10
        });
      } else {
        throw new Error('Speech synthesis not supported');
      }
    } catch (error) {
      console.error('Error playing audio:', error);
      setAudioError('Audio tidak tersedia');
      setPlayingAudio(null);
    }
  };

  const handleLetterClick = (letter: Letter) => {
    onLetterClick?.(letter);
    updateProgress({
      completedLessons: [letter.id],
      totalPoints: 5
    });
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
      {letters.map((letter) => (
        <div
          key={letter.id}
          className="relative group bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer transform hover:scale-105"
          onClick={() => handleLetterClick(letter)}
        >
          <div className="p-6 text-center">
            <div className="text-4xl font-batak mb-2 text-primary-600 dark:text-primary-400">
              {letter.char}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {letter.latin}
            </div>
          </div>
          
          <button
            className="absolute top-2 right-2 p-2 rounded-full bg-accent-100 dark:bg-accent-800 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              playAudio(letter.id, letter.latin);
            }}
            aria-label={`Play pronunciation of ${letter.latin}`}
          >
            {playingAudio === letter.id ? (
              <Volume2 className="w-4 h-4 text-accent-600 dark:text-accent-400 animate-pulse" />
            ) : audioError ? (
              <VolumeX className="w-4 h-4 text-red-500" />
            ) : (
              <Play className="w-4 h-4 text-accent-600 dark:text-accent-400" />
            )}
          </button>
          
          {audioError && (
            <div className="absolute bottom-2 left-2 right-2 text-xs text-red-500 text-center">
              {audioError}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default LetterTable;