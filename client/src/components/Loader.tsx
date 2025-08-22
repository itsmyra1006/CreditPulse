import React from 'react';

export const Loader: React.FC = () => (
  <div className="flex flex-col items-center justify-center space-y-4 py-16">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-amber-500"></div>
    <p className="text-amber-400 font-semibold">Performing Real-Time Analysis...</p>
  </div>
);