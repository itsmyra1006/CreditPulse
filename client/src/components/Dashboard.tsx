import React from 'react';
import type { AnalysisResult } from '../types';
import { ScoreGauge } from './ScoreGauge';
import { TrendChart } from './TrendChart';
import { KeyFactors } from './KeyFactors';
import { NewsFeed } from './NewsFeed';
import { TrendIndicator } from './TrendIndicator';
import { Financials } from './Financials'; // Import new component
import { AgencyRatings } from './AgencyRatings'; // Import new component

export const Dashboard: React.FC<{ data: AnalysisResult }> = ({ data }) => (
  <div className="space-y-6 animate-fade-in">
    <h2 className="text-3xl font-bold text-white text-center">{data.companyName} - Credit Analysis</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1 bg-[#1C1C1C] p-6 rounded-xl border border-gray-800 flex flex-col items-center justify-center">
        <h3 className="text-lg font-semibold text-gray-300 mb-4">Creditworthiness Score</h3>
        <ScoreGauge score={data.creditScore} />
      </div>
      <div className="md:col-span-2 bg-[#1C1C1C] p-6 rounded-xl border border-gray-800">
        <h3 className="text-lg font-semibold text-gray-300 mb-2">Score Trend (Generated)</h3>
        <TrendChart data={data.scoreHistory} trend={data.longTermTrend} />
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 bg-[#1C1C1C] p-6 rounded-xl border border-gray-800">
        <h3 className="text-lg font-semibold text-gray-300 mb-2">Analyst Summary</h3>
        <p className="text-gray-400 leading-relaxed">{data.summary}</p>
      </div>
      <div className="bg-[#1C1C1C] p-6 rounded-xl border border-gray-800 space-y-4">
        <h3 className="text-lg font-semibold text-gray-300">Outlook</h3>
        <TrendIndicator label="Short-Term Trend" trend={data.shortTermTrend} />
        <TrendIndicator label="Long-Term Trend" trend={data.longTermTrend} />
      </div>
    </div>

    {/* NEW Financials and Ratings Section */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Financials data={data.financials} />
        <AgencyRatings data={data.agencyRatings} />
    </div>

    <KeyFactors positive={data.positiveFactors} negative={data.negativeFactors} />
    <NewsFeed articles={data.recentNews} />
  </div>
);
