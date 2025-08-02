import React, { useState } from 'react';
import SharedEditableSection from './SharedEditableSection';

const LOCAL_STORAGE_KEY_FIXTURE = 'olimpiadas_fixture';

const OlimpiadasFixture = () => {
  const [matches, setMatches] = useState(() => {
    const savedMatches = localStorage.getItem(LOCAL_STORAGE_KEY_FIXTURE);
    if (savedMatches) {
      return JSON.parse(savedMatches);
    }
    return [
      { id: 1, team1: 'WHITE HOUSE', team2: 'GREEN HOUSE', discipline: 'Fútbol', date: '2025-07-10', time: '10:00' },
      { id: 2, team1: 'BLUE HOUSE', team2: 'ORANGE HOUSE', discipline: 'Baloncesto', date: '2025-07-10', time: '11:30' },
    ];
  });
  const [newMatch, setNewMatch] = useState({ team1: '', team2: '', discipline: '', date: '', time: '' });

  const handleSave = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY_FIXTURE, JSON.stringify(matches));
    console.log('Fixture guardado en localStorage:', matches);
  };

  const handleAddMatch = () => {
    if (newMatch.team1 && newMatch.team2 && newMatch.discipline && newMatch.date && newMatch.time) {
      setMatches([...matches, { ...newMatch, id: matches.length + 1 }]);
      setNewMatch({ team1: '', team2: '', discipline: '', date: '', time: '' });
    }
  };

  const handleRemoveMatch = (id = 0) => {
    setMatches(matches.filter(match => match.id !== id));
  };

  const handleMatchChange = (id = 0, field = '', value = '') => {
    setMatches(matches.map(match =>
      match.id === id ? { ...match, [field]: value } : match
    ));
  };

  return (
    <SharedEditableSection title="Fixture" onSave={handleSave}>
      <div className="space-y-4">
        {matches.map((match) => (
          <div key={match.id} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
              <input
                type="text"
                value={match.team1}
                onChange={(e) => handleMatchChange(match.id, 'team1', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition text-sm"
                placeholder="Equipo 1"
              />
              <input
                type="text"
                value={match.team2}
                onChange={(e) => handleMatchChange(match.id, 'team2', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition text-sm"
                placeholder="Equipo 2"
              />
              <input
                type="text"
                value={match.discipline}
                onChange={(e) => handleMatchChange(match.id, 'discipline', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition text-sm"
                placeholder="Disciplina"
              />
              <input
                type="date"
                value={match.date}
                onChange={(e) => handleMatchChange(match.id, 'date', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition text-sm"
              />
              <input
                type="time"
                value={match.time}
                onChange={(e) => handleMatchChange(match.id, 'time', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition text-sm"
              />
            </div>
            <button
              onClick={() => handleRemoveMatch(match.id)}
              className="mt-2 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-xs"
            >
              Eliminar Partido
            </button>
          </div>
        ))}
        <div className="mt-6 p-4 bg-gray-100 rounded-lg border border-gray-200">
          <h4 className="font-semibold mb-3 text-gray-800">Agregar Nuevo Partido</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
            <input
              type="text"
              value={newMatch.team1}
              onChange={(e) => setNewMatch({ ...newMatch, team1: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition text-sm"
              placeholder="Equipo 1"
            />
            <input
              type="text"
              value={newMatch.team2}
              onChange={(e) => setNewMatch({ ...newMatch, team2: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition text-sm"
              placeholder="Equipo 2"
            />
            <input
              type="text"
              value={newMatch.discipline}
              onChange={(e) => setNewMatch({ ...newMatch, discipline: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition text-sm"
              placeholder="Disciplina"
            />
            <input
              type="date"
              value={newMatch.date}
              onChange={(e) => setNewMatch({ ...newMatch, date: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition text-sm"
            />
            <input
              type="time"
              value={newMatch.time}
              onChange={(e) => setNewMatch({ ...newMatch, time: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition text-sm"
            />
          </div>
          <button
            onClick={handleAddMatch}
            className="w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm"
          >
            Agregar Partido
          </button>
        </div>
      </div>
    </SharedEditableSection>
  );
};

export default OlimpiadasFixture;