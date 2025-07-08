import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Map, Users, Award } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-accent-600/20" />
        <div className="relative max-w-7xl mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 dark:text-white mb-6">
            Belajar Aksara
            <span className="block text-primary-600 dark:text-primary-400">
              Batak
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Jelajahi kekayaan budaya Batak melalui pembelajaran aksara tradisional dengan teknologi modern
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/belajar"
              className="px-8 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-lg font-semibold"
            >
              Mulai Belajar
            </Link>
            <Link
              to="/teks"
              className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-white border-2 border-gray-200 dark:border-gray-600 rounded-lg hover:border-primary-600 dark:hover:border-primary-400 transition-colors text-lg font-semibold"
            >
              Jelajahi Teks
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
            Fitur Pembelajaran
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-lg">
              <BookOpen className="w-12 h-12 text-primary-600 dark:text-primary-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                Pembelajaran Interaktif
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Pelajari setiap huruf dengan animasi stroke dan audio pronunciation
              </p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-accent-50 to-accent-100 dark:from-accent-900/20 dark:to-accent-800/20 rounded-lg">
              <Award className="w-12 h-12 text-accent-600 dark:text-accent-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                Kuis & Latihan
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Uji kemampuan dengan berbagai jenis soal dan dapatkan sertifikat
              </p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg">
              <Map className="w-12 h-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                Peta Budaya
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Jelajahi persebaran varian aksara Batak di seluruh Sumatera
              </p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg">
              <Users className="w-12 h-12 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                Komunitas
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Bergabung dengan komunitas pembelajar dan berbagi pengalaman
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-12">
            Bergabunglah dengan Ribuan Pembelajar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
              <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                5,000+
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                Pengguna Aktif
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
              <div className="text-4xl font-bold text-accent-600 dark:text-accent-400 mb-2">
                19
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                Huruf Aksara
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
              <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                50+
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                Teks Pustaha
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 dark:bg-primary-700">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Siap Memulai Perjalanan Belajar?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Bergabunglah dengan ribuan orang yang telah mempelajari aksara Batak
          </p>
          <Link
            to="/belajar"
            className="inline-block px-8 py-4 bg-white text-primary-600 rounded-lg hover:bg-gray-100 transition-colors text-lg font-semibold"
          >
            Mulai Sekarang - Gratis!
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;