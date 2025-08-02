import React, { useState } from 'react';
import SharedEditableSection from './SharedEditableSection';

const LOCAL_STORAGE_KEY_RESULTS = 'olimpiadas_results';

const OlimpiadasResultsTable = () => {
  const [results, setResults] = useState(() => {
    const savedResults = localStorage.getItem(LOCAL_STORAGE_KEY_RESULTS);
    if (savedResults) {
      return JSON.parse(savedResults);
    }
    return [
      { id: 1, category: 'Juvenil', discipline: 'Fútbol', team1: 'WHITE HOUSE', score1: 2, team2: 'GREEN HOUSE', score2: 1 },
      { id: 2, category: 'Adultos', discipline: 'Baloncesto', team1: 'BLUE HOUSE', score1: 55, team2: 'ORANGE HOUSE', score2: 60 },
    ];
  });
  const [newResult, setNewResult] = useState({ category: '', discipline: '', team1: '', score1: '', team2: '', score2: '' });

  const handleSave = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY_RESULTS, JSON.stringify(results));
    console.log('Tabla de resultados guardada en localStorage:', results);
  };

  const handleAddResult = () => {
    if (newResult.category && newResult.discipline && newResult.team1 && newResult.score1 !== '' && newResult.team2 && newResult.score2 !== '') {
      setResults([...results, { ...newResult, id: results.length + 1, score1: parseInt(newResult.score1), score2: parseInt(newResult.score2) }]);
      setNewResult({ category: '', discipline: '', team1: '', score1: '', team2: '', score2: '' });
    }
  };

  const handleRemoveResult = (id = 0) => {
    setResults(results.filter(result => result.id !== id));
  };

  const handleResultChange = (id = 0, field = '', value = '') => {
    setResults(results.map(result =>
      result.id === id ? { ...result, [field]: field.includes('score') ? parseInt(value) : value } : result
    ));
  };

  return (
    <SharedEditableSection title="Tabla de Resultados" onSave={handleSave}>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-sm border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Categoría</th> {/* Nueva columna */}
              <th className="py-3 px-6 text-left">Disciplina</th>
              <th className="py-3 px-6 text-left">Equipo 1</th>
              <th className="py-3 px-6 text-center">Score</th>
              <th className="py-3 px-6 text-left">Equipo 2</th>
              <th className="py-3 px-6 text-center">Score</th>
              <th className="py-3 px-6 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {results.map((result) => (
              <tr key={result.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <input
                    type="text"
                    value={result.category}
                    onChange={(e) => handleResultChange(result.id, 'category', e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black text-sm"
                  />
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <input
                    type="text"
                    value={result.discipline}
                    onChange={(e) => handleResultChange(result.id, 'discipline', e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black text-sm"
                  />
                </td>
                <td className="py-3 px-6 text-left">
                  <input
                    type="text"
                    value={result.team1}
                    onChange={(e) => handleResultChange(result.id, 'team1', e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black text-sm"
                  />
                </td>
                <td className="py-3 px-6 text-center">
                  <input
                    type="number"
                    value={result.score1}
                    onChange={(e) => handleResultChange(result.id, 'score1', e.target.value)}
                    className="w-20 px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black text-sm text-center"
                  />
                </td>
                <td className="py-3 px-6 text-left">
                  <input
                    type="text"
                    value={result.team2}
                    onChange={(e) => handleResultChange(result.id, 'team2', e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black text-sm"
                  />
                </td>
                <td className="py-3 px-6 text-center">
                  <input
                    type="number"
                    value={result.score2}
                    onChange={(e) => handleResultChange(result.id, 'score2', e.target.value)}
                    className="w-20 px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black text-sm text-center"
                  />
                </td>
                <td className="py-3 px-6 text-center">
                  <button
                    onClick={() => handleRemoveResult(result.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-xs"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            <tr className="bg-gray-100">
              <td className="py-3 px-6">
                <input
                  type="text"
                  value={newResult.category}
                  onChange={(e) => setNewResult({ ...newResult, category: e.target.value })}
                  className="w-full px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black text-sm"
                  placeholder="Categoría"
                />
              </td>
              <td className="py-3 px-6">
                <input
                  type="text"
                  value={newResult.discipline}
                  onChange={(e) => setNewResult({ ...newResult, discipline: e.target.value })}
                  className="w-full px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black text-sm"
                  placeholder="Disciplina"
                />
              </td>
              <td className="py-3 px-6">
                <input
                  type="text"
                  value={newResult.team1}
                  onChange={(e) => setNewResult({ ...newResult, team1: e.target.value })}
                  className="w-full px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black text-sm"
                  placeholder="Equipo 1"
                />
              </td>
              <td className="py-3 px-6 text-center">
                <input
                  type="number"
                  value={newResult.score1}
                  onChange={(e) => setNewResult({ ...newResult, score1: e.target.value })}
                  className="w-20 px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black text-sm text-center"
                  placeholder="Score"
                />
              </td>
              <td className="py-3 px-6">
                <input
                  type="text"
                  value={newResult.team2}
                  onChange={(e) => setNewResult({ ...newResult, team2: e.target.value })}
                  className="w-full px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black text-sm"
                  placeholder="Equipo 2"
                />
              </td>
              <td className="py-3 px-6 text-center">
                <input
                  type="number"
                  value={newResult.score2}
                  onChange={(e) => setNewResult({ ...newResult, score2: e.target.value })}
                  className="w-20 px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black text-sm text-center"
                  placeholder="Score"
                />
              </td>
              <td className="py-3 px-6 text-center">
                <button
                  onClick={handleAddResult}
                  className="px-3 py-1 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-xs"
                >
                  Agregar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </SharedEditableSection>
  );
};

export default OlimpiadasResultsTable;