import React, { useState } from 'react';

export const SearchBar: React.FC<{ onSearch: (query: string) => void; isLoading: boolean; }> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');
  const handleSearch = (e: React.FormEvent) => { e.preventDefault(); if (query.trim()) { onSearch(query.trim().toUpperCase()); } };
  return (
    <form onSubmit={handleSearch} className="flex gap-2">
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="e.g., AAPL or MSFT" disabled={isLoading}
        className="flex-grow bg-[#222222] border border-gray-700 rounded-md px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition duration-200 disabled:opacity-50" />
      <button type="submit" disabled={isLoading || !query.trim()}
        className="bg-amber-600 text-black font-semibold px-6 py-3 rounded-md hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#111111] focus:ring-amber-500 transition duration-200 disabled:bg-gray-700 disabled:cursor-not-allowed">
        {isLoading ? 'Analyzing...' : 'Analyze'}
      </button>
    </form>
  );
};