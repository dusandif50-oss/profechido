import React, { useState } from 'react';
import SharedEditableSection from './SharedEditableSection';

const LOCAL_STORAGE_KEY_PHOTOS = 'olimpiadas_photos';

const OlimpiadasPhotos = () => {
  const [photos, setPhotos] = useState(() => {
    const savedPhotos = localStorage.getItem(LOCAL_STORAGE_KEY_PHOTOS);
    if (savedPhotos) {
      return JSON.parse(savedPhotos);
    }
    return [
      '/placeholder-photo1.jpg',
      '/placeholder-photo2.jpg',
    ];
  });
  const [newPhotoUrl, setNewPhotoUrl] = useState('');

  const handleSave = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY_PHOTOS, JSON.stringify(photos));
    console.log('Fotos guardadas en localStorage:', photos);
  };

  const handleAddPhoto = () => {
    if (newPhotoUrl.trim() !== '') {
      setPhotos([...photos, newPhotoUrl.trim()]);
      setNewPhotoUrl('');
    }
  };

  const handleRemovePhoto = (index = 0) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  return (
    <SharedEditableSection title="Fotos" onSave={handleSave}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {photos.map((photo, index) => (
          <div key={index} className="relative group rounded-lg overflow-hidden shadow-md border border-gray-200">
            <img src={photo} alt={`Olimpiadas ${index + 1}`} className="w-full h-48 object-cover" />
            <button
              onClick={() => handleRemovePhoto(index)}
              className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-xs"
              aria-label="Eliminar foto"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>
      <div className="flex space-x-2 mt-4">
        <input
          type="text"
          value={newPhotoUrl}
          onChange={(e) => setNewPhotoUrl(e.target.value)}
          className="flex-grow px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition text-sm"
          placeholder="URL de la nueva foto"
        />
        <button
          onClick={handleAddPhoto}
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm"
        >
          Agregar Foto
        </button>
      </div>
    </SharedEditableSection>
  );
};

export default OlimpiadasPhotos;