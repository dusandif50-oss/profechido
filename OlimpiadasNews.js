import React, { useState } from 'react';
import SharedEditableSection from './SharedEditableSection';

const LOCAL_STORAGE_KEY_NEWS = 'olimpiadas_news';

const OlimpiadasNews = () => {
  const [news, setNews] = useState(() => {
    const savedNews = localStorage.getItem(LOCAL_STORAGE_KEY_NEWS);
    if (savedNews) {
      return JSON.parse(savedNews);
    }
    return [
      { id: 1, title: '¡Inauguración espectacular!', content: 'Las Olimpiadas 360° 2025 comenzaron con una ceremonia inolvidable.', date: '2025-07-09' },
      { id: 2, title: 'Resultados del primer día de fútbol', content: 'WHITE HOUSE vence a GREEN HOUSE en un emocionante partido.', date: '2025-07-10' },
    ];
  });
  const [newArticle, setNewArticle] = useState({ title: '', content: '', date: '' });

  const handleSave = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY_NEWS, JSON.stringify(news));
    console.log('Noticias guardadas en localStorage:', news);
  };

  const handleAddArticle = () => {
    if (newArticle.title.trim() !== '' && newArticle.content.trim() !== '' && newArticle.date.trim() !== '') {
      setNews([...news, { ...newArticle, id: news.length + 1 }]);
      setNewArticle({ title: '', content: '', date: '' });
    }
  };

  const handleRemoveArticle = (id = 0) => {
    setNews(news.filter(article => article.id !== id));
  };

  const handleArticleChange = (id = 0, field = '', value = '') => {
    setNews(news.map(article =>
      article.id === id ? { ...article, [field]: value } : article
    ));
  };

  return (
    <SharedEditableSection title="Noticias" onSave={handleSave}>
      <div className="space-y-6">
        {news.map((article) => (
          <div key={article.id} className="bg-gray-50 p-5 rounded-lg shadow-sm border border-gray-200">
            <input
              type="text"
              value={article.title}
              onChange={(e) => handleArticleChange(article.id, 'title', e.target.value)}
              className="w-full text-xl font-semibold text-gray-800 mb-2 px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition"
            />
            <input
              type="date"
              value={article.date}
              onChange={(e) => handleArticleChange(article.id, 'date', e.target.value)}
              className="w-full text-sm text-gray-500 mb-3 px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition"
            />
            <textarea
              value={article.content}
              onChange={(e) => handleArticleChange(article.id, 'content', e.target.value)}
              className="w-full text-gray-700 mb-4 px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition resize-y min-h-[80px]"
            ></textarea>
            <button
              onClick={() => handleRemoveArticle(article.id)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
            >
              Eliminar Noticia
            </button>
          </div>
        ))}
        <div className="mt-6 p-5 bg-gray-100 rounded-lg border border-gray-200">
          <h4 className="font-semibold mb-3 text-gray-800">Agregar Nueva Noticia</h4>
          <input
            type="text"
            value={newArticle.title}
            onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition text-sm mb-2"
            placeholder="Título de la noticia"
          />
          <input
            type="date"
            value={newArticle.date}
            onChange={(e) => setNewArticle({ ...newArticle, date: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition text-sm mb-2"
          />
          <textarea
            value={newArticle.content}
            onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition text-sm resize-y min-h-[60px] mb-3"
            placeholder="Contenido de la noticia"
          ></textarea>
          <button
            onClick={handleAddArticle}
            className="w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm"
          >
            Agregar Noticia
          </button>
        </div>
      </div>
    </SharedEditableSection>
  );
};

export default OlimpiadasNews;