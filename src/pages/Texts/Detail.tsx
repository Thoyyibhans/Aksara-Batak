import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Volume2 } from 'lucide-react';
import StoryViewer from '../../components/StoryViewer';
import storiesData from '../../data/stories.json';

const TextDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const story = storiesData.find(s => s.slug === slug);

  if (!story) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Cerita tidak ditemukan
          </h1>
          <Link
            to="/teks"
            className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
          >
            Kembali ke daftar cerita
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Link
                to="/teks"
                className="inline-flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 mb-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali ke Pustaha
              </Link>
              
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {story.title}
              </h1>
              
              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{story.origin}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>Abad ke-{story.century}</span>
                </div>
                {story.audio && (
                  <div className="flex items-center">
                    <Volume2 className="w-4 h-4 mr-1" />
                    <span>Audio tersedia</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Story Content */}
      <StoryViewer story={story} />
    </div>
  );
};

export default TextDetail;