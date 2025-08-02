import React, { useState } from 'react';
import { validatePassword } from '../utils/passwordValidator';

const SharedEditableSection = ({ title = 'Sección Editable', children = null, onSave = () => {} }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
    setError('');
    setPassword('');
    setShowConfirmation(false); // Ocultar confirmación al empezar a editar
  };

  const handleSaveClick = () => {
    if (validatePassword(password)) {
      onSave(); // Llama a la función onSave del componente padre
      setIsEditing(false);
      setError('');
      setShowConfirmation(true); // Mostrar confirmación
      setTimeout(() => setShowConfirmation(false), 3000); // Ocultar después de 3 segundos
    } else {
      setError('Contraseña incorrecta. Inténtalo de nuevo.');
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setError('');
    setPassword('');
    setShowConfirmation(false); // Ocultar confirmación al cancelar
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg mb-8 border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
        {!isEditing ? (
          <button
            onClick={handleEditClick}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm"
          >
            Editar
          </button>
        ) : (
          <div className="flex items-center space-x-2">
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition text-sm"
            />
            <button
              onClick={handleSaveClick}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
            >
              Guardar
            </button>
            <button
              onClick={handleCancelClick}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
            >
              Cancelar
            </button>
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      {showConfirmation && (
        <p className="text-green-600 text-sm mb-4">¡Cambios guardados con éxito!</p>
      )}
      <div className={`${isEditing ? 'block' : 'hidden'}`}>
        {children}
      </div>
      {!isEditing && (
        <div className="text-gray-700">
          {children}
        </div>
      )}
    </div>
  );
};

export default SharedEditableSection;