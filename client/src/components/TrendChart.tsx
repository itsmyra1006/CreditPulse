import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { ScoreHistoryPoint } from '../types';

const getTrendColor = (trend: 'Improving' | 'Stable' | 'Declining') => {
  switch (trend) { case 'Improving': return '#22c55e'; case 'Declining': return '#ef4444'; case 'Stable': default: return '#f59e0b'; }
}

export const TrendChart: React.FC<{ data: ScoreHistoryPoint[], trend: 'Improving' | 'Stable' | 'Declining' }> = ({ data, trend }) => (
  <div style={{ width: '100%', height: 250 }}>
    <ResponsiveContainer>
      <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
        <XAxis dataKey="date" stroke="#A0AEC0" />
        <YAxis domain={[0, 100]} stroke="#A0AEC0" />
        <Tooltip contentStyle={{ backgroundColor: '#1C1C1C', border: '1px solid #333' }} />
        <Legend />
        <Line type="monotone" dataKey="score" stroke={getTrendColor(trend)} strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} name="Credit Score"/>
      </LineChart>
    </ResponsiveContainer>
  </div>
);