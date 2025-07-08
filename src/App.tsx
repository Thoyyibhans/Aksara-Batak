import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import Layout from './components/Layout';
import Home from './pages/Home';
import Learn from './pages/Learn';
import Quiz from './pages/Quiz';
import TextsPage from './pages/Texts';
import TextDetail from './pages/Texts/Detail';
import TransliteratorPage from './pages/TransliteratorPage';
import History from './pages/History';
import About from './pages/About';
import i18n from './i18n';
import './index.css';

function App() {
  useEffect(() => {
    // Load Google Fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+Batak:wght@400;500;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="belajar" element={<Learn />} />
              <Route path="belajar/kuis" element={<Quiz />} />
              <Route path="teks" element={<TextsPage />} />
              <Route path="teks/:slug" element={<TextDetail />} />
              <Route path="transliterator" element={<TransliteratorPage />} />
              <Route path="sejarah" element={<History />} />
              <Route path="tentang" element={<About />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </I18nextProvider>
  );
}

export default App;