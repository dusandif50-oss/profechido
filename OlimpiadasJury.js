import React, { useState } from 'react';
import SharedEditableSection from './SharedEditableSection';

const LOCAL_STORAGE_KEY_JURY = 'olimpiadas_jury';

const OlimpiadasJury = () => {
  const [juryInfo, setJuryInfo] = useState(() => {
    const savedJury = localStorage.getItem(LOCAL_STORAGE_KEY_JURY);
    if (savedJury) {
      const parsedJury = JSON.parse(savedJury);
      return parsedJury.info;
    }
    return 'El Jurado de Paz está disponible para resolver cualquier reclamo o disputa durante las Olimpiadas. Por favor, contacte a los miembros designados para presentar su caso.';
  });
  const [claims, setClaims] = useState(() => {
    const savedJury = localStorage.getItem(LOCAL_STORAGE_KEY_JURY);
    if (savedJury) {
      const parsedJury = JSON.parse(savedJury);
      return parsedJury.claims;
    }
    return [
      { id: 1, match: 'Fútbol: WHITE HOUSE vs GREEN HOUSE', teams: 'WHITE HOUSE, GREEN HOUSE', complaint: 'Falta no marcada en el minuto 80.', evidenceUrl: 'https://ejemplo.com/evidencia1.mp4', status: 'Pendiente' },
    ];
  });
  const [newClaim, setNewClaim] = useState({ match: '', teams: '', complaint: '', evidenceUrl: '', status: 'Pendiente' });

  const handleSave = () => {
    const dataToSave = { info: juryInfo, claims: claims };
    localStorage.setItem(LOCAL_STORAGE_KEY_JURY, JSON.stringify(dataToSave));
    console.log('Información del Jurado de Paz y reclamos guardados en localStorage:', dataToSave);
  };

  const handleAddClaim = () => {
    if (newClaim.match.trim() !== '' && newClaim.teams.trim() !== '' && newClaim.complaint.trim() !== '') {
      setClaims([...claims, { ...newClaim, id: claims.length + 1 }]);
      setNewClaim({ match: '', teams: '', complaint: '', evidenceUrl: '', status: 'Pendiente' });
    }
  };

  const handleRemoveClaim = (id = 0) => {
    setClaims(claims.filter(claim => claim.id !== id));
  };

  const handleClaimChange = (id = 0, field = '', value = '') => {
    setClaims(claims.map(claim =>
      claim.id === id ? { ...claim, [field]: value } : claim
    ));
  };

  const getStatusColor = (status = '') => {
    switch (status) {
      case 'Pendiente':
        return 'bg-yellow-100 text-yellow-800';
      case 'En Revisión':
        return 'bg-blue-100 text-blue-800';
      case 'Resuelto':
        return 'bg-green-100 text-green-800';
      case 'Rechazado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <SharedEditableSection title="Jurado de Paz" onSave={handleSave}>
      <textarea
        value={juryInfo}
        onChange={(e) => setJuryInfo(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition text-base resize-y min-h-[150px] mb-6"
        placeholder="Escribe aquí la información sobre el Jurado de Paz y cómo reportar reclamos..."
      ></textarea>

      <h3 className="text-xl font-semibold text-gray-800 mb-4">Reclamos Presentados</h3>
      <div className="space-y-4">
        {claims.map((claim) => (
          <div key={claim.id} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="grid grid-cols-1 gap-2 mb-2">
              <input
                type="text"
                value={claim.match}
                onChange={(e) => handleClaimChange(claim.id, 'match', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition text-sm"
                placeholder="Encuentro disputado (ej: Fútbol: Equipo A vs Equipo B)"
              />
              <input
                type="text"
                value={claim.teams}
                onChange={(e) => handleClaimChange(claim.id, 'teams', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition text-sm"
                placeholder="Equipos involucrados (ej: Equipo A, Equipo B)"
              />
              <textarea
                value={claim.complaint}
                onChange={(e) => handleClaimChange(claim.id, 'complaint', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition text-sm resize-y min-h-[60px]"
                placeholder="Descripción del reclamo"
              ></textarea>
              <input
                type="text"
                value={claim.evidenceUrl}
                onChange={(e) => handleClaimChange(claim.id, 'evidenceUrl', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition text-sm"
                placeholder="URL de la evidencia (opcional)"
              />
              {claim.evidenceUrl && (
                <a href={claim.evidenceUrl} target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-xs text-center">
                  Ver Evidencia
                </a>
              )}
              <select
                value={claim.status}
                onChange={(e) => handleClaimChange(claim.id, 'status', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition text-sm"
              >
                <option value="Pendiente">Pendiente</option>
                <option value="En Revisión">En Revisión</option>
                <option value="Resuelto">Resuelto</option>
                <option value="Rechazado">Rechazado</option>
              </select>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(claim.status)}`}>
                {claim.status}
              </span>
            </div>
            <button
              onClick={() => handleRemoveClaim(claim.id)}
              className="mt-2 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-xs"
            >
              Eliminar Reclamo
            </button>
          </div>
        ))}
        <div className="mt-6 p-4 bg-gray-100 rounded-lg border border-gray-200">
          <h4 className="font-semibold mb-3 text-gray-800">Agregar Nuevo Reclamo</h4>
          <div className="grid grid-cols-1 gap-2 mb-3">
            <input
              type="text"
              value={newClaim.match}
              onChange={(e) => setNewClaim({ ...newClaim, match: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition text-sm"
              placeholder="Encuentro disputado (ej: Fútbol: Equipo A vs Equipo B)"
            />
            <input
              type="text"
              value={newClaim.teams}
              onChange={(e) => setNewClaim({ ...newClaim, teams: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition text-sm"
              placeholder="Equipos involucrados (ej: Equipo A, Equipo B)"
            />
            <textarea
              value={newClaim.complaint}
              onChange={(e) => setNewClaim({ ...newClaim, complaint: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition text-sm resize-y min-h-[60px]"
              placeholder="Descripción del reclamo"
            ></textarea>
            <input
              type="text"
              value={newClaim.evidenceUrl}
              onChange={(e) => setNewClaim({ ...newClaim, evidenceUrl: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition text-sm"
              placeholder="URL de la evidencia (opcional)"
            />
            <select
              value={newClaim.status}
              onChange={(e) => setNewClaim({ ...newClaim, status: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition text-sm"
            >
              <option value="Pendiente">Pendiente</option>
              <option value="En Revisión">En Revisión</option>
              <option value="Resuelto">Resuelto</option>
              <option value="Rechazado">Rechazado</option>
            </select>
          </div>
          <button
            onClick={handleAddClaim}
            className="w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm"
          >
            Agregar Reclamo
          </button>
        </div>
      </div>
    </SharedEditableSection>
  );
};

export default OlimpiadasJury;