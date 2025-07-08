import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Play, Pause } from 'lucide-react';

interface StrokeDemoProps {
  strokePath?: string;
  character: string;
  isPlaying?: boolean;
  onComplete?: () => void;
}

const StrokeDemo: React.FC<StrokeDemoProps> = ({
  strokePath = "M50,50 L150,50 L150,150 L50,150 Z",
  character,
  isPlaying = false,
  onComplete,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isPlaying && !isAnimating) {
      setIsAnimating(true);
    }
  }, [isPlaying, isAnimating]);

  const handleAnimationComplete = () => {
    setIsAnimating(false);
    onComplete?.();
  };

  const resetAnimation = () => {
    setIsAnimating(false);
    setTimeout(() => setIsAnimating(true), 100);
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-6">
      <div className="relative w-64 h-64 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full"
          style={{ overflow: 'visible' }}
        >
          {/* Guide grid */}
          <defs>
            <pattern
              id="grid"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="200" height="200" fill="url(#grid)" />
          
          {/* Static character background */}
          <text
            x="100"
            y="120"
            textAnchor="middle"
            className="text-6xl font-batak fill-gray-200 dark:fill-gray-700"
            style={{ fontFamily: 'Noto Sans Batak, serif' }}
          >
            {character}
          </text>
          
          {/* Animated stroke path */}
          <motion.path
            d={strokePath}
            stroke="#2854E1"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: isAnimating ? 1 : 0 }}
            transition={{
              duration: 2,
              ease: "easeInOut",
            }}
            onAnimationComplete={handleAnimationComplete}
          />
          
          {/* Stroke direction indicator */}
          <motion.circle
            r="4"
            fill="#F5A623"
            initial={{ offsetDistance: "0%" }}
            animate={{ offsetDistance: isAnimating ? "100%" : "0%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            style={{ 
              offsetPath: `path('${strokePath}')`,
              offsetRotate: 'auto',
            }}
          />
        </svg>
      </div>
      
      <div className="flex space-x-2">
        <button
          onClick={() => setIsAnimating(!isAnimating)}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          {isAnimating ? (
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
        
        <button
          onClick={resetAnimation}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
};

export default StrokeDemo;