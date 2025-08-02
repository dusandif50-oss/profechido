import React from 'react';

const LayoutFooter = ({ text = '© 2025 Olimpiadas 360°. Todos los derechos reservados.' }) => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-12">
      <div className="container mx-auto px-4 text-center text-sm">
        <p>{text}</p>
      </div>
    </footer>
  );
};

export default LayoutFooter;