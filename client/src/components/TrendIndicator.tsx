import React from 'react';
import { TrendUpIcon, TrendDownIcon, TrendStableIcon } from './icons';

const trendConfig = {
  Improving: { Icon: TrendUpIcon, color: 'text-green-400', text: 'Improving' },
  Stable: { Icon: TrendStableIcon, color: 'text-yellow-400', text: 'Stable' },
  Declining: { Icon: TrendDownIcon, color: 'text-red-400', text: 'Declining' }
}

export const TrendIndicator: React.FC<{ label: string, trend: 'Improving' | 'Stable' | 'Declining' }> = ({ label, trend }) => {
  const config = trendConfig[trend] || trendConfig.Stable;
  return (
    <div>
      <p className="text-sm text-gray-400">{label}</p>
      <div className={`flex items-center gap-2 ${config.color}`}>
        <config.Icon className="w-6 h-6"/>
        <span className="font-semibold text-lg">{config.text}</span>
      </div>
    </div>
  );
};
