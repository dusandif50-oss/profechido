import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-600">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            ¡Bienvenido a tu App!
          </h1>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
            <p className="text-xl text-white/90 mb-8">
              Tu aplicación React con Tailwind CSS está funcionando perfectamente.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/20 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-2">React 18</h3>
                <p className="text-white/80">Framework moderno y reactivo</p>
              </div>
              <div className="bg-white/20 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Tailwind CSS</h3>
                <p className="text-white/80">Estilos utility-first</p>
              </div>
              <div className="bg-white/20 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Netlify</h3>
                <p className="text-white/80">Deploy automático</p>
              </div>
            </div>
            <button className="mt-8 bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              ¡Empezar a construir!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;