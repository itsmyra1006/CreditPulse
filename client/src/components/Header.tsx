import React from 'react';

export const Header: React.FC = () => (
  <header className="bg-[#181818]/80 backdrop-blur-sm border-b border-gray-800/50 sticky top-0 z-10">
    <div className="container mx-auto px-4 md:px-8 py-4">
      <h1 className="text-2xl md:text-3xl font-bold text-amber-400 font-orbitron tracking-wider">CreditPulse</h1>
      <p className="text-sm text-gray-400">Rule-Based Model & Real-Time Data</p>
    </div>
  </header>
);
