import React from 'react';
import { PlusCircleIcon, MinusCircleIcon } from './icons';

export const KeyFactors: React.FC<{ positive: string[], negative: string[] }> = ({ positive, negative }) => (
  <div className="bg-[#1C1C1C] p-6 rounded-xl border border-gray-800">
    <h3 className="text-xl font-semibold text-gray-300 mb-4 text-center">Key Score Drivers (from Model)</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h4 className="flex items-center gap-2 text-lg font-semibold text-green-400 mb-3"><PlusCircleIcon className="w-6 h-6" />Positive Factors</h4>
        <ul className="space-y-2">
          {positive.map((factor, index) => (<li key={index} className="flex items-start"><span className="text-green-500 mr-2 mt-1">&#10003;</span><span className="text-gray-300">{factor}</span></li>))}
        </ul>
      </div>
      <div>
        <h4 className="flex items-center gap-2 text-lg font-semibold text-red-400 mb-3"><MinusCircleIcon className="w-6 h-6" />Negative Factors</h4>
        <ul className="space-y-2">
          {negative.map((factor, index) => (<li key={index} className="flex items-start"><span className="text-red-500 mr-2 mt-1">&#10007;</span><span className="text-gray-300">{factor}</span></li>))}
        </ul>
      </div>
    </div>
  </div>
);