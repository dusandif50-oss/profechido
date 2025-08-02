import React, { useState } from 'react';
import SharedEditableSection from './SharedEditableSection';

const LOCAL_STORAGE_KEY_GLOBAL_SCORE = 'olimpiadas_global_score';

const OlimpiadasGlobalScore = () => {
  const [scores, setScores] = useState(() => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY_GLOBAL_SCORE);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      // Asegurarse de que 'scores' sea siempre un array
      return Array.isArray(parsedData.scores) ? parsedData.scores : [
        { team: 'WHITE HOUSE', points: 0 },
        { team: 'GREEN HOUSE', points: 0 },
        { team: 'BLUE HOUSE', points: 0 },
        { team: 'ORANGE HOUSE', points: 0 },
      ];
    }
    return [
      { team: 'WHITE HOUSE', points: 0 },
      { team: 'GREEN HOUSE', points: 0 },
      { team: 'BLUE HOUSE', points: 0 },
      { team: 'ORANGE HOUSE', points: 0 },
    ];
  });

  const [detailedScoreLink, setDetailedScoreLink] = useState(() => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY_GLOBAL_SCORE);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      return parsedData.detailedLink || '';
    }
    return '';
  });

  const handleSave = () => {
    const dataToSave = { scores: scores, detailedLink: detailedScoreLink };
    localStorage.setItem(LOCAL_STORAGE_KEY_GLOBAL_SCORE, JSON.stringify(dataToSave));
    console.log('Puntuación global y enlace detallado guardados en localStorage:', dataToSave);
  };

  const handleScoreChange = (index = 0, newPoints = 0) => {
    const updatedScores = scores.map((score, i) =>
      i === index ? { ...score, points: parseInt(newPoints) || 0 } : score
    );
    setScores(updatedScores.sort((a, b) => b.points - a.points)); // Ordenar por puntos descendente
  };

  return (
    <SharedEditableSection title="Puntuación Global por Equipos" onSave={handleSave}>
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full bg-white rounded-lg shadow-sm border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Equipo</th>
              <th className="py-3 px-6 text-right">Puntos</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {scores.map((score, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-6 text-left font-medium">{score.team}</td>
                <td className="py-3 px-6 text-right">
                  <input
                    type="number"
                    value={score.points}
                    onChange={(e) => handleScoreChange(index, e.target.value)}
                    className="w-24 px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black text-sm text-right"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 p-4 bg-gray-100 rounded-lg border border-gray-200">
        <h4 className="font-semibold mb-2 text-gray-800">Enlace a Puntuación Detallada</h4>
        <input
          type="text"
          value={detailedScoreLink}
          onChange={(e) => setDetailedScoreLink(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition text-sm mb-3"
          placeholder="URL de la puntuación detallada (ej: hoja de cálculo, otro sitio)"
        />
        {detailedScoreLink && (
          <a 
            href={detailedScoreLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            Ver Puntuación Detallada
          </a>
        )}
      </div>
    </SharedEditableSection>
  );
};

export default OlimpiadasGlobalScore;