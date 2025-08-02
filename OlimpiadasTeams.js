import React, { useState } from 'react';
import SharedEditableSection from './SharedEditableSection';

const LOCAL_STORAGE_KEY_TEAMS = 'olimpiadas_teams';

const OlimpiadasTeams = () => {
  const [teams, setTeams] = useState(() => {
    const savedTeams = localStorage.getItem(LOCAL_STORAGE_KEY_TEAMS);
    if (savedTeams) {
      return JSON.parse(savedTeams);
    }
    return [
      { 
        name: 'WHITE HOUSE', 
        color: 'bg-white text-gray-900 border border-gray-300', 
        textColor: 'text-gray-900', 
        logo: 'https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0ABW4lArjBTv6ks7D2p0aEUqiwPFcNd9VLHQ8', // Logo actualizado
        representatives: [],
        showDetails: false
      },
      { 
        name: 'GREEN HOUSE', 
        color: 'bg-green-500 text-white', 
        textColor: 'text-white', 
        logo: '/placeholder-green.png', 
        representatives: [],
        showDetails: false
      },
      { 
        name: 'BLUE HOUSE', 
        color: 'bg-blue-500 text-white', 
        textColor: 'text-white', 
        logo: '/placeholder-blue.png', 
        representatives: [],
        showDetails: false
      },
      { 
        name: 'ORANGE HOUSE', 
        color: 'bg-orange-500 text-white', 
        textColor: 'text-white', 
        logo: '/placeholder-orange.png', 
        representatives: [],
        showDetails: false
      },
    ];
  });

  const handleSave = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY_TEAMS, JSON.stringify(teams));
    console.log('Equipos guardados en localStorage:', teams);
  };

  const handleTeamNameChange = (index = 0, newName = '') => {
    const updatedTeams = teams.map((team, i) =>
      i === index ? { ...team, name: newName } : team
    );
    setTeams(updatedTeams);
  };

  const handleTeamColorChange = (index = 0, newColor = '') => {
    const updatedTeams = teams.map((team, i) =>
      i === index ? { ...team, color: newColor } : team
    );
    setTeams(updatedTeams);
  };

  const handleTeamLogoChange = (index = 0, newLogo = '') => {
    const updatedTeams = teams.map((team, i) =>
      i === index ? { ...team, logo: newLogo } : team
    );
    setTeams(updatedTeams);
  };

  const handleRepresentativeChange = (teamIndex = 0, repIndex = 0, field = '', value = '') => {
    const updatedTeams = teams.map((team, tIdx) => {
      if (tIdx === teamIndex) {
        const updatedReps = team.representatives.map((rep, rIdx) =>
          rIdx === repIndex ? { ...rep, [field]: value } : rep
        );
        return { ...team, representatives: updatedReps };
      }
      return team;
    });
    setTeams(updatedTeams);
  };

  const handleAddRepresentative = (teamIndex = 0) => {
    const updatedTeams = teams.map((team, tIdx) => {
      if (tIdx === teamIndex && team.representatives.length < 5) { // Limitar a 5 representantes
        return {
          ...team,
          representatives: [...team.representatives, { name: '', role: '' }]
        };
      }
      return team;
    });
    setTeams(updatedTeams);
  };

  const handleRemoveRepresentative = (teamIndex = 0, repIndex = 0) => {
    const updatedTeams = teams.map((team, tIdx) => {
      if (tIdx === teamIndex) {
        return {
          ...team,
          representatives: team.representatives.filter((_, rIdx) => rIdx !== repIndex)
        };
      }
      return team;
    });
    setTeams(updatedTeams);
  };

  const toggleTeamDetails = (index = 0) => {
    const updatedTeams = teams.map((team, i) =>
      i === index ? { ...team, showDetails: !team.showDetails } : team
    );
    setTeams(updatedTeams);
  };

  return (
    <SharedEditableSection title="Equipos" onSave={handleSave}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {teams.map((team, index) => (
          <div key={index} className={`p-4 rounded-lg shadow-sm ${team.color}`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                {team.logo && <img src={team.logo} alt={`${team.name} logo`} className="w-12 h-12 mr-3 object-contain" />}
                <h3 className={`font-bold text-lg ${team.textColor}`}>{team.name}</h3>
              </div>
              <button
                onClick={() => toggleTeamDetails(index)}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm"
              >
                {team.showDetails ? 'Ocultar Detalles' : 'Mostrar Detalles'}
              </button>
            </div>
            {/* Campos de edición condicionalmente visibles */}
            <div className={`space-y-2 mb-4 ${team.showDetails ? 'block' : 'hidden'}`}>
              <input
                type="text"
                value={team.name}
                onChange={(e) => handleTeamNameChange(index, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition text-sm"
                placeholder="Nombre del equipo"
              />
              <input
                type="text"
                value={team.color}
                onChange={(e) => handleTeamColorChange(index, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition text-sm"
                placeholder="Clase de color Tailwind (ej: bg-red-500 text-white)"
              />
              <input
                type="text"
                value={team.logo}
                onChange={(e) => handleTeamLogoChange(index, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition text-sm"
                placeholder="URL del logo del equipo"
              />
            </div>

            <h4 className={`font-semibold text-md mb-2 ${team.textColor}`}>Representantes ({team.representatives.length}/5)</h4>
            <div className="space-y-2">
              {team.representatives.map((rep, repIndex) => (
                <div key={repIndex} className="flex items-center space-x-2 bg-gray-100 p-2 rounded-lg">
                  <input
                    type="text"
                    value={rep.name}
                    onChange={(e) => handleRepresentativeChange(index, repIndex, 'name', e.target.value)}
                    className="flex-1 px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black text-xs"
                    placeholder="Nombre"
                  />
                  <input
                    type="text"
                    value={rep.role}
                    onChange={(e) => handleRepresentativeChange(index, repIndex, 'role', e.target.value)}
                    className="flex-1 px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black text-xs"
                    placeholder="Cargo"
                  />
                  <button
                    onClick={() => handleRemoveRepresentative(index, repIndex)}
                    className="text-red-500 hover:text-red-700 transition-colors text-xs"
                  >
                    Eliminar
                  </button>
                </div>
              ))}
              {team.representatives.length < 5 && (
                <button
                  onClick={() => handleAddRepresentative(index)}
                  className="w-full px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm"
                >
                  Agregar Representante
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </SharedEditableSection>
  );
};

export default OlimpiadasTeams;