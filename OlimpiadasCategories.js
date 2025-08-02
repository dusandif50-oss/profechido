import React, { useState } from 'react';
import SharedEditableSection from './SharedEditableSection';

const LOCAL_STORAGE_KEY_CATEGORIES = 'olimpiadas_categories';

const OlimpiadasCategories = () => {
  const [categories, setCategories] = useState(() => {
    const savedCategories = localStorage.getItem(LOCAL_STORAGE_KEY_CATEGORIES);
    if (savedCategories) {
      return JSON.parse(savedCategories);
    }
    return [
      { name: 'Infantil', grades: '1° - 3° Primaria' },
      { name: 'Juvenil', grades: '4° - 6° Primaria' },
      { name: 'Adultos', grades: '1° - 3° Secundaria' },
    ];
  });
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryGrades, setNewCategoryGrades] = useState('');

  const handleSave = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY_CATEGORIES, JSON.stringify(categories));
    console.log('Categorías guardadas en localStorage:', categories);
  };

  const handleAddCategory = () => {
    if (newCategoryName.trim() !== '') {
      setCategories([...categories, { name: newCategoryName.trim(), grades: newCategoryGrades.trim() }]);
      setNewCategoryName('');
      setNewCategoryGrades('');
    }
  };

  const handleRemoveCategory = (index = 0) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

  const handleCategoryNameChange = (index = 0, newName = '') => {
    const updatedCategories = categories.map((category, i) =>
      i === index ? { ...category, name: newName } : category
    );
    setCategories(updatedCategories);
  };

  const handleCategoryGradesChange = (index = 0, newGrades = '') => {
    const updatedCategories = categories.map((category, i) =>
      i === index ? { ...category, grades: newGrades } : category
    );
    setCategories(updatedCategories);
  };

  return (
    <SharedEditableSection title="Categorías" onSave={handleSave}>
      <div className="space-y-3">
        {categories.map((category, index) => (
          <div key={index} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <input
                type="text"
                value={category.name}
                onChange={(e) => handleCategoryNameChange(index, e.target.value)}
                className="flex-grow px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition text-sm mr-2"
                placeholder="Nombre de la categoría"
              />
              <button
                onClick={() => handleRemoveCategory(index)}
                className="text-red-500 hover:text-red-700 transition-colors text-sm"
              >
                Eliminar
              </button>
            </div>
            <input
              type="text"
              value={category.grades}
              onChange={(e) => handleCategoryGradesChange(index, e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition text-sm"
              placeholder="Grados que abarca (ej: 1° - 3° Primaria)"
            />
          </div>
        ))}
        <div className="mt-4 p-3 bg-gray-100 rounded-lg border border-gray-200">
          <h4 className="font-semibold mb-2 text-gray-800">Agregar Nueva Categoría</h4>
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition text-sm mb-2"
            placeholder="Nombre de la categoría"
          />
          <input
            type="text"
            value={newCategoryGrades}
            onChange={(e) => setNewCategoryGrades(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition text-sm mb-3"
            placeholder="Grados que abarca (ej: 1° - 3° Primaria)"
          />
          <button
            onClick={handleAddCategory}
            className="w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm"
          >
            Agregar Categoría
          </button>
        </div>
      </div>
    </SharedEditableSection>
  );
};

export default OlimpiadasCategories;