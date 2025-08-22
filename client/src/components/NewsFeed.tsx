import React from 'react';
import type { NewsArticle } from '../types';

const sentimentStyles = { Positive: 'bg-green-900/50 border-green-700 text-green-300', Negative: 'bg-red-900/50 border-red-700 text-red-300', Neutral: 'bg-gray-700/50 border-gray-600 text-gray-300' };
const sentimentBadgeStyles = { Positive: 'bg-green-500/20 text-green-300', Negative: 'bg-red-500/20 text-red-300', Neutral: 'bg-gray-500/20 text-gray-300' };

export const NewsFeed: React.FC<{ articles: NewsArticle[] }> = ({ articles }) => (
  <div className="bg-[#1C1C1C] p-6 rounded-xl border border-gray-800">
    <h3 className="text-xl font-semibold text-gray-300 mb-4">Unstructured Data Insights (Recent Events)</h3>
    <div className="space-y-4">
      {articles.map((article, index) => (
        <div key={index} className={`p-4 rounded-lg border ${sentimentStyles[article.sentiment]}`}>
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-semibold text-white pr-4">{article.headline}</h4>
            <span className={`text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap ${sentimentBadgeStyles[article.sentiment]}`}>{article.sentiment}</span>
          </div>
          <p className="text-sm text-gray-400"><span className="font-semibold text-gray-300">Impact: </span>{article.impact}</p>
        </div>
      ))}
    </div>
  </div>
);