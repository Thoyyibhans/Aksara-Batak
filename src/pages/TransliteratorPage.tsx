import React from 'react';
import { useTranslation } from 'react-i18next';
import { Languages, Book, Lightbulb } from 'lucide-react';
import Transliterator from '../components/Transliterator';

const TransliteratorPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900/20 rounded-2xl mb-4">
            <Languages className="w-8 h-8 text-primary-600 dark:text-primary-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Transliterator Aksara Batak
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Konversi teks antara aksara Latin dan Batak dengan mudah dan akurat
          </p>
        </div>

        {/* Main Transliterator */}
        <Transliterator />

        {/* Tips Section */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Lightbulb className="w-6 h-6 text-accent-500 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Tips Transliterasi
              </h3>
            </div>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-accent-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                Gunakan huruf kecil untuk hasil terbaik
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-accent-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                Perhatikan konteks kata untuk akurasi maksimal
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-accent-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                Beberapa huruf memiliki variasi dalam varian yang berbeda
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Book className="w-6 h-6 text-primary-500 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Contoh Penggunaan
              </h3>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Latin:</p>
                <p className="text-gray-900 dark:text-white font-medium">horas ma</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Batak:</p>
                <p className="text-gray-900 dark:text-white font-batak text-lg">ᯄᯫᯒᯞᯘ ᯔᯞ</p>
              </div>
            </div>
          </div>
        </div>

        {/* Character Reference */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Referensi Huruf Batak
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                { batak: 'ᯄ', latin: 'ha' },
                { batak: 'ᯅ', latin: 'ba' },
                { batak: 'ᯇ', latin: 'pa' },
                { batak: 'ᯊ', latin: 'na' },
                { batak: 'ᯋ', latin: 'wa' },
                { batak: 'ᯌ', latin: 'ga' },
                { batak: 'ᯏ', latin: 'ja' },
                { batak: 'ᯑ', latin: 'da' },
                { batak: 'ᯒ', latin: 'ra' },
                { batak: 'ᯔ', latin: 'ma' },
                { batak: 'ᯖ', latin: 'ta' },
                { batak: 'ᯘ', latin: 'sa' },
                { batak: 'ᯚ', latin: 'ya' },
                { batak: 'ᯀ', latin: 'nga' },
                { batak: 'ᯃ', latin: 'la' },
                { batak: 'ᯰ', latin: 'nya' },
                { batak: 'ᯞ', latin: 'ca' },
                { batak: 'ᯣ', latin: 'kha' },
              ].map((char) => (
                <div
                  key={char.latin}
                  className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <div className="text-2xl font-batak text-primary-600 dark:text-primary-400 mb-1">
                    {char.batak}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {char.latin}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransliteratorPage;