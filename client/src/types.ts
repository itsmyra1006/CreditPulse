export interface ScoreHistoryPoint {
  date: string;
  score: number;
}

export interface NewsArticle {
  headline: string;
  sentiment: 'Positive' | 'Negative' | 'Neutral';
  impact: string;
}

export interface Financials {
    marketCap: number;
    peRatio: number;
    profitMargin: number;
    debtToEquityRatio: number;
}

export interface AgencyRatings {
    moodys: string;
    sp: string;
    fitch: string;
}

export interface AnalysisResult {
  companyName: string;
  creditScore: number;
  shortTermTrend: 'Improving' | 'Stable' | 'Declining';
  longTermTrend: 'Improving' | 'Stable' | 'Declining';
  summary: string;
  positiveFactors: string[];
  negativeFactors: string[];
  recentNews: NewsArticle[];
  scoreHistory: ScoreHistoryPoint[];
  financials: Financials;
  agencyRatings: AgencyRatings;
}
