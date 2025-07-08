import React, { useState } from 'react';
import { ArrowLeftRight, Copy, Check } from 'lucide-react';
import { transliterateBatakToLatin, transliterateLatinToBatak } from '../utils/transliterator';

const Transliterator: React.FC = () => {
  const [leftText, setLeftText] = useState('');
  const [rightText, setRightText] = useState('');
  const [mode, setMode] = useState<'latin-to-batak' | 'batak-to-latin'>('latin-to-batak');
  const [copied, setCopied] = useState(false);

  const handleTransliterate = (text: string) => {
    if (mode === 'latin-to-batak') {
      setLeftText(text);
      setRightText(transliterateLatinToBatak(text));
    } else {
      setLeftText(text);
      setRightText(transliterateBatakToLatin(text));
    }
  };

  const swapMode = () => {
    setMode(prev => prev === 'latin-to-batak' ? 'batak-to-latin' : 'latin-to-batak');
    setLeftText(rightText);
    setRightText(leftText);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(rightText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Transliterator
          </h2>
          <button
            onClick={swapMode}
            className="flex items-center space-x-2 px-4 py-2 bg-accent-100 dark:bg-accent-800 text-accent-700 dark:text-accent-300 rounded-lg hover:bg-accent-200 dark:hover:bg-accent-700 transition-colors"
          >
            <ArrowLeftRight className="w-4 h-4" />
            <span>Swap</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {mode === 'latin-to-batak' ? 'Latin Text' : 'Batak Script'}
            </label>
            <textarea
              value={leftText}
              onChange={(e) => handleTransliterate(e.target.value)}
              className="w-full h-32 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-200"
              placeholder={mode === 'latin-to-batak' ? 'Type Latin text...' : 'Type Batak script...'}
              style={{ fontFamily: mode === 'batak-to-latin' ? 'Noto Sans Batak, serif' : 'inherit' }}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {mode === 'latin-to-batak' ? 'Batak Script' : 'Latin Text'}
              </label>
              <button
                onClick={copyToClipboard}
                className="flex items-center space-x-1 px-2 py-1 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <div
              className="w-full h-32 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 overflow-y-auto"
              style={{ fontFamily: mode === 'latin-to-batak' ? 'Noto Sans Batak, serif' : 'inherit' }}
            >
              {rightText || (
                <span className="text-gray-400 dark:text-gray-500">
                  Translation will appear here...
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm text-blue-700 dark:text-blue-300">
            <strong>Tip:</strong> The transliterator supports basic Batak Toba characters. 
            For more accurate results, consider the context and meaning of the text.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Transliterator;