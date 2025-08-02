import React, { useState } from 'react';
import SharedEditableSection from './SharedEditableSection';

const LOCAL_STORAGE_KEY_DISCIPLINES = 'olimpiadas_disciplines';

const OlimpiadasDisciplines = () => {
  const [disciplines, setDisciplines] = useState(() => {
    const savedDisciplines = localStorage.getItem(LOCAL_STORAGE_KEY_DISCIPLINES);
    if (savedDisciplines) {
      return JSON.parse(savedDisciplines);
    }
    return [
      { name: 'Fútbol', rulesUrl: '' },
      { name: 'Baloncesto', rulesUrl: '' },
      { name: 'Voleibol', rulesUrl: '' },
      { name: 'Atletismo', rulesUrl: '' },
      { name: 'Natación', rulesUrl: '' },
    ];
  });
  const [newDisciplineName, setNewDisciplineName] = useState('');
  const [newDisciplineRulesUrl, setNewDisciplineRulesUrl] = useState('');

  const handleSave = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY_DISCIPLINES, JSON.stringify(disciplines));
    console.log('Disciplinas guardadas en localStorage:', disciplines);
  };

  const handleAddDiscipline = () => {
    if (newDisciplineName.trim() !== '') {
      setDisciplines([...disciplines, { name: newDisciplineName.trim(), rulesUrl: newDisciplineRulesUrl.trim() }]);
      setNewDisciplineName('');
      setNewDisciplineRulesUrl('');
    }
  };

  const handleRemoveDiscipline = (index = 0) => {
    setDisciplines(disciplines.filter((_, i) => i !== index));
  };

  const handleDisciplineNameChange = (index = 0, newName = '') => {
    const updatedDisciplines = disciplines.map((discipline, i) =>
      i === index ? { ...discipline, name: newName } : discipline
    );
    setDisciplines(updatedDisciplines);
  };

  const handleDisciplineRulesChange = (index = 0, newUrl = '') => {
    const updatedDisciplines = disciplines.map((discipline, i) =>
      i === index ? { ...discipline, rulesUrl: newUrl } : discipline
    );
    setDisciplines(updatedDisciplines);
  };

  return (
    <SharedEditableSection title="Disciplinas Deportivas" onSave={handleSave}>
      <div className="space-y-3">
        {disciplines.map((discipline, index) => (
          <div key={index} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <input
                type="text"
                value={discipline.name}
                onChange={(e) => handleDisciplineNameChange(index, e.target.value)}
                className="flex-grow px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition text-sm mr-2"
                placeholder="Nombre de la disciplina"
              />
              <button
                onClick={() => handleRemoveDiscipline(index)}
                className="text-red-500 hover:text-red-700 transition-colors text-sm"
              >
                Eliminar
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={discipline.rulesUrl}
                onChange={(e) => handleDisciplineRulesChange(index, e.target.value)}
                className="flex-grow px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition text-sm"
                placeholder="URL del reglamento (PDF, DOC, etc.)"
              />
              {discipline.rulesUrl && (
                <a href={discipline.rulesUrl} target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-xs">
                  Ver Reglamento
                </a>
              )}
            </div>
          </div>
        ))}
        <div className="mt-4 p-3 bg-gray-100 rounded-lg border border-gray-200">
          <h4 className="font-semibold mb-2 text-gray-800">Agregar Nueva Disciplina</h4>
          <input
            type="text"
            value={newDisciplineName}
            onChange={(e) => setNewDisciplineName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition text-sm mb-2"
            placeholder="Nombre de la disciplina"
          />
          <input
            type="text"
            value={newDisciplineRulesUrl}
            onChange={(e) => setNewDisciplineRulesUrl(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition text-sm mb-3"
            placeholder="URL del reglamento (opcional)"
          />
          <button
            onClick={handleAddDiscipline}
            className="w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm"
          >
            Agregar Disciplina
          </button>
        </div>
      </div>
    </SharedEditableSection>
  );
};

export default OlimpiadasDisciplines;