import express from 'express';
import cors from 'cors';
import 'dotenv/config';

// Import our custom modules
import { getCompanyOverview, getRecentNews } from './dataIngestion.js';
import { analyzeNewsSentiment } from './nlpService.js';
import { calculateCreditScore } from './scoringEngine.js';
import { generateExplanation } from './explainability.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// --- Main API Endpoint ---
app.get('/api/analyze/:ticker', async (req, res) => {
  const { ticker } = req.params;

  try {
    console.log(`[1/5] Starting analysis for ${ticker}...`);

    // 1. Data Ingestion
    console.log(`[2/5] Fetching financial and news data...`);
    const overviewData = await getCompanyOverview(ticker);
    const companyName = overviewData.Name;
    const recentNews = await getRecentNews(companyName);

    // 2. Feature Engineering & NLP
    console.log(`[3/5] Processing data and analyzing sentiment...`);
    const { avgNewsSentiment, analyzedArticles } = analyzeNewsSentiment(recentNews);
    
    // Extract financial metrics. Use parseFloat to ensure they are numbers. Handle 'None' or missing values.
    const debtToEquityRatio = parseFloat(overviewData.DebtToEquityRatio) || 2.0;
    const profitMargin = parseFloat(overviewData.ProfitMargin) || 0.0;
    const peRatio = parseFloat(overviewData.PERatio) || 51.0;
    const marketCap = parseInt(overviewData.MarketCapitalization, 10);
    const returnOnEquity = parseFloat(overviewData.ReturnOnEquityTTM) || 0.0; // <-- NEW METRIC

    const features = {
        debtToEquityRatio,
        profitMargin,
        avgNewsSentiment,
        peRatio,
        returnOnEquity // <-- PASS NEW METRIC
    };

    // 3. Scoring Engine
    console.log(`[4/5] Calculating credit score...`);
    const { score, reasoning } = calculateCreditScore(features);

    // 4. Explainability Layer
    console.log(`[5/5] Generating explanations...`);
    const { positiveFactors, negativeFactors, explainedNews } = generateExplanation(reasoning, analyzedArticles);

    // 5. Assemble Final Response
    const response = {
      companyName: `${companyName} (${ticker})`,
      creditScore: score,
      shortTermTrend: "Stable",
      longTermTrend: "Improving",
      summary: `Based on our rule-based model, ${companyName} has a credit score of ${score}. This is primarily driven by factors such as its Return on Equity of ${(returnOnEquity * 100).toFixed(2)}%, a profit margin of ${(profitMargin * 100).toFixed(2)}%, and recent market sentiment.`,
      positiveFactors,
      negativeFactors,
      recentNews: explainedNews,
      scoreHistory: [
        { date: '-11 mo', score: score - 5 }, { date: '-9 mo', score: score - 2 },
        { date: '-6 mo', score: score + 1 }, { date: '-3 mo', score: score - 1 },
        { date: 'Current', score: score },
      ],
      financials: {
        marketCap: marketCap,
        peRatio: peRatio,
        profitMargin: profitMargin,
        debtToEquityRatio: debtToEquityRatio
      },
      agencyRatings: {
          moodys: "Aa1",
          sp: "AA+",
          fitch: "AA+"
      }
    };

    console.log(`Analysis for ${ticker} complete.`);
    res.json(response);

  } catch (error) {
    console.error(`Analysis failed for ${ticker}:`, error.message);
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
