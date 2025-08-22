import React from 'react';
import type { AgencyRatings as AgencyRatingsData } from '../types';

const RatingRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <div className="flex justify-between items-center py-3 border-b border-gray-700/50">
        <span className="text-gray-400">{label}</span>
        <span className="font-semibold text-white font-mono">{value}</span>
    </div>
);

export const AgencyRatings: React.FC<{ data: AgencyRatingsData }> = ({ data }) => {
  return (
    <div className="bg-[#1C1C1C] p-6 rounded-xl border border-gray-800">
      <h3 className="text-xl font-semibold text-gray-300 mb-2">Agency Ratings (Simulated)</h3>
      <div>
        <RatingRow label="Moody's" value={data.moodys} />
        <RatingRow label="S&P" value={data.sp} />
        <RatingRow label="Fitch" value={data.fitch} />
      </div>
    </div>
  );
};
