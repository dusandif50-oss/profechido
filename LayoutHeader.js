import React from 'react';

const LayoutHeader = ({ title = 'OLIMPIADAS 360° 2025' }) => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50 w-full">
      <div className="container mx-auto px-4 py-4 flex justify-center items-center">
        <img src="https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0kTTUvCE7fYZlcpNaeLVjJvm95wniIQo8GFd7" alt="Olimpiadas 360° 2025 Logo" className="h-16 mr-4" />
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
      </div>
    </header>
  );
};

export default LayoutHeader;