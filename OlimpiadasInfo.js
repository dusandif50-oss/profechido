import React, { useState } from 'react';
import SharedEditableSection from './SharedEditableSection';

const LOCAL_STORAGE_KEY_INFO = 'olimpiadas_info';

const OlimpiadasInfo = () => {
  const [info, setInfo] = useState(() => {
    const savedInfo = localStorage.getItem(LOCAL_STORAGE_KEY_INFO);
    if (savedInfo) {
      return savedInfo;
    }
    return 'Bienvenido a las Olimpiadas 360° 2025. Prepárense para la competencia, la amistad y la diversión. ¡Que gane el mejor equipo!';
  });

  const handleSave = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY_INFO, info);
    console.log('Información guardada en localStorage:', info);
  };

  return (
    <SharedEditableSection title="Información" onSave={handleSave}>
      <textarea
        value={info}
        onChange={(e) => setInfo(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition text-base resize-y min-h-[150px]"
        placeholder="Escribe aquí la información general de las olimpiadas..."
      ></textarea>
    </SharedEditableSection>
  );
};

export default OlimpiadasInfo;