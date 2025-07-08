import React from 'react';
import { Calendar, MapPin, Users, Scroll } from 'lucide-react';

const History: React.FC = () => {
  const timelineEvents = [
    {
      year: '14th Century',
      title: 'Awal Mula Aksara Batak',
      description: 'Aksara Batak mulai berkembang dari pengaruh aksara Pallava dan Kawi dari India.',
      icon: <Scroll className="w-6 h-6" />,
      color: 'bg-purple-500',
    },
    {
      year: '16th Century',
      title: 'Penyebaran ke Seluruh Sumatera',
      description: 'Aksara Batak menyebar ke seluruh wilayah Sumatera Utara melalui perdagangan dan migrasi.',
      icon: <MapPin className="w-6 h-6" />,
      color: 'bg-blue-500',
    },
    {
      year: '18th Century',
      title: 'Era Pustaha',
      description: 'Masa kejayaan naskah pustaha dengan berbagai teks keagamaan, sejarah, dan ilmu pengetahuan.',
      icon: <Users className="w-6 h-6" />,
      color: 'bg-green-500',
    },
    {
      year: '19th Century',
      title: 'Pengaruh Kolonial',
      description: 'Kedatangan misionaris dan penjajah membawa perubahan dalam penggunaan aksara Batak.',
      icon: <Calendar className="w-6 h-6" />,
      color: 'bg-red-500',
    },
    {
      year: '20th Century',
      title: 'Standardisasi Modern',
      description: 'Upaya standardisasi dan pelestarian aksara Batak di era modern.',
      icon: <Scroll className="w-6 h-6" />,
      color: 'bg-yellow-500',
    },
    {
      year: '21st Century',
      title: 'Digitalisasi',
      description: 'Era digital membawa aksara Batak ke platform modern dengan Unicode dan aplikasi pembelajaran.',
      icon: <MapPin className="w-6 h-6" />,
      color: 'bg-primary-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Sejarah Aksara Batak
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Jelajahi perjalanan panjang aksara Batak dari masa lampau hingga era digital
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-600 transform md:-translate-x-0.5" />

          {timelineEvents.map((event, index) => (
            <div
              key={index}
              className={`relative flex items-center mb-12 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline Dot */}
              <div className={`absolute left-4 md:left-1/2 w-8 h-8 ${event.color} rounded-full flex items-center justify-center text-white transform md:-translate-x-4 z-10`}>
                {event.icon}
              </div>

              {/* Content */}
              <div className={`ml-16 md:ml-0 md:w-1/2 ${
                index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
              }`}>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-3 ${
                    event.color.replace('bg-', 'bg-') + ' bg-opacity-10 text-' + event.color.replace('bg-', '').replace('-500', '-600')
                  }`}>
                    {event.year}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {event.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cultural Impact */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Dampak Budaya
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Scroll className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Literatur Pustaha
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Ribuan naskah pustaha berisi pengetahuan tradisional, cerita rakyat, dan ajaran spiritual.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-accent-100 dark:bg-accent-900/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-accent-600 dark:text-accent-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Identitas Budaya
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Aksara Batak menjadi simbol identitas dan kebanggaan masyarakat Batak di seluruh dunia.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Warisan Dunia
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                UNESCO mengakui aksara Batak sebagai bagian dari warisan budaya takbenda dunia.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;