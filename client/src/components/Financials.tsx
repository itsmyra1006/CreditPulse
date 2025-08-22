import React from 'react';
import type { Financials as FinancialsData } from '../types';

// Helper to format large numbers into billions/trillions
const formatMarketCap = (value: number) => {
    if (value >= 1_000_000_000_000) {
        return `${(value / 1_000_000_000_000).toFixed(2)}T`;
    }
    if (value >= 1_000_000_000) {
        return `${(value / 1_000_000_000).toFixed(2)}B`;
    }
    if (value >= 1_000_000) {
        return `${(value / 1_000_000).toFixed(2)}M`;
    }
    return value.toString();
};

const FinancialRow: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
    <div className="flex justify-between items-center py-3 border-b border-gray-700/50">
        <span className="text-gray-400">{label}</span>
        <span className="font-semibold text-white">{value}</span>
    </div>
);

export const Financials: React.FC<{ data: FinancialsData }> = ({ data }) => {
  return (
    <div className="bg-[#1C1C1C] p-6 rounded-xl border border-gray-800">
      <h3 className="text-xl font-semibold text-gray-300 mb-2">Financials</h3>
      <div>
        <FinancialRow label="Market Cap" value={formatMarketCap(data.marketCap)} />
        <FinancialRow label="P/E Ratio" value={data.peRatio.toFixed(2)} />
        <FinancialRow label="Profit Margin" value={`${(data.profitMargin * 100).toFixed(2)}%`} />
        <FinancialRow label="Debt-to-Equity Ratio" value={data.debtToEquityRatio.toFixed(2)} />
      </div>
    </div>
  );
};
