import React, { useState, useCallback } from 'react';
import type { AnalysisResult } from './types';
import { SearchBar } from './components/SearchBar';
import { Dashboard } from './components/Dashboard';
import { Loader } from './components/Loader';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Financials } from './components/Financials';
import { AgencyRatings } from './components/AgencyRatings';

// This is the initial data shown on page load.
const initialData: AnalysisResult = {
  companyName: "Example Corp (Sample Data)",
  creditScore: 78,
  shortTermTrend: "Stable",
  longTermTrend: "Improving",
  summary: "This is sample data. Enter a company stock ticker (e.g., AAPL, MSFT, GOOG) to perform a real-time credit analysis using our rule-based model.",
  positiveFactors: ["Consistent revenue growth.", "Strong free cash flow.", "Low debt-to-equity ratio."],
  negativeFactors: ["Increasing competition.", "Dependency on suppliers.", "Regulatory headwinds."],
  recentNews: [{
    headline: "Example Corp Launches New AI-Powered Platform",
    sentiment: "Positive",
    impact: "Opens new revenue streams and enhances competitive advantage."
  }],
  scoreHistory: [
    { date: '-11 mo', score: 72 }, { date: '-9 mo', score: 73 }, { date: '-6 mo', score: 76 },
    { date: '-3 mo', score: 78 }, { date: 'Current', score: 78 }
  ],
  // THIS IS THE FIX: Add placeholder data for the new sections
  financials: {
      marketCap: 2800000000000,
      peRatio: 28,
      profitMargin: 0.25,
      debtToEquityRatio: 1.20
  },
  agencyRatings: {
      moodys: "Aa1",
      sp: "AA+",
      fitch: "AA+"
  }
};

const App: React.FC = () => {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(initialData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const handleSearch = useCallback(async (ticker: string) => {
    if (!ticker) return;
    setIsLoading(true);
    setError(null);
    setHasSearched(true);
    setAnalysisResult(null);

    try {
      const response = await fetch(`http://localhost:3001/api/analyze/${ticker}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
      
      const result: AnalysisResult = await response.json();
      setAnalysisResult(result);

    } catch (err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Analysis Failed: ${errorMessage}`);
      setAnalysisResult(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#111111] text-gray-100 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-gray-400 mb-6">
            Enter a company stock ticker to generate a real-time, explainable credit analysis.
          </p>
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
          
          <div className="mt-8">
            {isLoading && <Loader />}
            {error && (
              <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center">
                <h3 className="font-bold">Error</h3>
                <p>{error}</p>
              </div>
            )}
            {analysisResult && (
              <Dashboard data={analysisResult} />
            )}
            {!isLoading && !error && !analysisResult && hasSearched && (
                 <div className="bg-[#1C1C1C] border border-gray-800 text-gray-400 px-4 py-8 rounded-lg text-center">
                    <h3 className="text-xl font-bold text-white">No Results</h3>
                    <p>The analysis did not return any data. Please try another ticker or check the backend console for errors.</p>
                </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
