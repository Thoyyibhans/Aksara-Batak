import React from 'react';
import { Heart, Code, Book, Users, Mail, Github, ExternalLink } from 'lucide-react';

const About: React.FC = () => {
  const team = [
    {
      name: 'Thoyyib Hasonangan',
      role: 'Lead Developer',
      description: 'Full-stack developer dengan passion untuk teknologi pendidikan.',
      avatar: 'https://avatars.githubusercontent.com/u/182060803?v=4',
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Tentang BatakScript
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Platform pembelajaran aksara Batak yang menggabungkan tradisi dan teknologi modern
          </p>
        </div>

        {/* Mission */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900/20 rounded-2xl mb-4">
              <Heart className="w-8 h-8 text-primary-600 dark:text-primary-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Misi Kami
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Book className="w-12 h-12 text-accent-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Pelestarian Budaya
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Melestarikan aksara Batak untuk generasi mendatang melalui teknologi digital.
              </p>
            </div>

            <div className="text-center">
              <Code className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Inovasi Pembelajaran
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Menciptakan metode pembelajaran yang menarik dan efektif dengan teknologi modern.
              </p>
            </div>

            <div className="text-center">
              <Users className="w-12 h-12 text-purple-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Komunitas Global
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Menghubungkan pembelajar aksara Batak di seluruh dunia dalam satu platform.
              </p>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Tim Kami
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member) => (
              <div key={member.name} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-primary-600 dark:text-primary-400 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Pengguna Aktif', value: '5,000+', color: 'text-blue-600' },
            { label: 'Huruf Dipelajari', value: '19', color: 'text-green-600' },
            { label: 'Teks Pustaha', value: '50+', color: 'text-purple-600' },
            { label: 'Rating App Store', value: '4.8', color: 'text-yellow-600' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
              <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                {stat.value}
              </div>
              <div className="text-gray-600 dark:text-gray-300 text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Hubungi Kami
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Punya pertanyaan atau saran? Kami senang mendengar dari Anda!
          </p>
          <div className="flex justify-center space-x-6">
            <a
              href="mailto:hello@batakscript.com"
              className="flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </a>
            <a
              href="https://github.com/batakscript"
              className="flex items-center space-x-2 px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 px-6 py-3 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Website</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
