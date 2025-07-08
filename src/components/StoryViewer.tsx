import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { Story } from '../types';

interface StoryViewerProps {
  story: Story;
}

const StoryViewer: React.FC<StoryViewerProps> = ({ story }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [syncScroll, setSyncScroll] = useState(true);
  const batakRef = useRef<HTMLDivElement>(null);
  const latinRef = useRef<HTMLDivElement>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    return () => {
      if (utteranceRef.current) {
        speechSynthesis.cancel();
      }
    };
  }, []);

  const toggleAudio = async () => {
    if (isPlaying) {
      speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }
    
    if (!('speechSynthesis' in window)) {
      setAudioError('Audio tidak didukung di browser ini');
      return;
    }
    
    try {
      setAudioError(null);
      
      const utterance = new SpeechSynthesisUtterance(story.latin);
      utterance.lang = 'id-ID';
      utterance.rate = 0.8;
      utterance.pitch = 1.0;
      
      utterance.onstart = () => {
        setIsPlaying(true);
      };
      
      utterance.onend = () => {
        setIsPlaying(false);
      };
      
      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event);
        setAudioError('Gagal memutar audio');
        setIsPlaying(false);
      };
      
      utteranceRef.current = utterance;
      speechSynthesis.speak(utterance);
      
    } catch (error) {
      console.error('Error playing audio:', error);
      setAudioError('Gagal memutar audio');
      setIsPlaying(false);
    }
  };

  const handleScroll = (source: 'batak' | 'latin') => {
    if (!syncScroll) return;
    
    const sourceRef = source === 'batak' ? batakRef : latinRef;
    const targetRef = source === 'batak' ? latinRef : batakRef;
    
    if (sourceRef.current && targetRef.current) {
      const scrollPercent = sourceRef.current.scrollTop / 
        (sourceRef.current.scrollHeight - sourceRef.current.clientHeight);
      
      targetRef.current.scrollTop = scrollPercent * 
        (targetRef.current.scrollHeight - targetRef.current.clientHeight);
    }
  };

  const resetAudio = () => {
    speechSynthesis.cancel();
    setIsPlaying(false);
    setAudioError(null);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                {story.title}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {story.origin} • Abad ke-{story.century}
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSyncScroll(!syncScroll)}
                className={`px-3 py-1 rounded-full text-sm ${
                  syncScroll 
                    ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' 
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                }`}
              >
                {syncScroll ? 'Sync ON' : 'Sync OFF'}
              </button>
              
              <button
                onClick={resetAudio}
                className="flex items-center space-x-2 px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>
              
              <button
                onClick={toggleAudio}
                className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    <span>Play</span>
                  </>
                )}
              </button>
            </div>
          </div>
          
          {audioError && (
            <div className="mt-2 p-2 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded text-sm">
              {audioError}
            </div>
          )}
        </div>
        
        <div className="flex flex-col lg:flex-row h-96 lg:h-[600px]">
          <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Aksara Batak
            </h2>
            <div
              ref={batakRef}
              className="h-full overflow-y-auto pr-4 text-lg leading-relaxed"
              style={{ fontFamily: 'Noto Sans Batak, serif' }}
              onScroll={() => handleScroll('batak')}
            >
              {story.batak}
            </div>
          </div>
          
          <div className="flex-1 p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Terjemahan Latin
            </h2>
            <div
              ref={latinRef}
              className="h-full overflow-y-auto pr-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300"
              onScroll={() => handleScroll('latin')}
            >
              {story.latin}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryViewer;