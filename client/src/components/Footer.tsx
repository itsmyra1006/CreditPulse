import React from 'react';

export const Footer: React.FC = () => (
  <footer className="bg-gray-900 border-t border-gray-700/50 mt-12">
    <div className="container mx-auto px-4 md:px-8 py-6 text-center text-gray-500">
      <p className="font-semibold text-gray-400">Disclaimer</p>
      <p className="text-sm max-w-3xl mx-auto">This analysis is for informational and demonstrative purposes only and is not financial advice. The data is sourced from public APIs and may contain inaccuracies. Always consult with a qualified professional before making any financial decisions.</p>
      <p className="text-sm mt-4">&copy; 2025 CredTech Hackathon Submission. All rights reserved.</p>
    </div>
  </footer>
);
