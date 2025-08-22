import axios from 'axios';
import 'dotenv/config';

const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY;
const NEWS_API_KEY = process.env.NEWS_API_KEY;
const AV_BASE_URL = 'https://www.alphavantage.co/query';
const NEWS_BASE_URL = 'https://newsapi.org/v2/everything';

/**
 * Fetches company overview data (including financials) from Alpha Vantage.
 * @param {string} ticker - The company stock ticker.
 * @returns {Promise<object>} - A promise that resolves to the company's overview data.
 */
async function getCompanyOverview(ticker) {
  try {
    const response = await axios.get(AV_BASE_URL, {
      params: {
        function: 'OVERVIEW',
        symbol: ticker,
        apikey: ALPHA_VANTAGE_API_KEY,
      },
    });
    if (response.data.Note) {
        throw new Error('Alpha Vantage API limit reached. Please try again later.');
    }
    if (!response.data.Symbol) {
        throw new Error(`No company overview data found for ticker: ${ticker}. Please enter a valid stock ticker.`);
    }
    return response.data;
  } catch (error) {
    console.error(`Error fetching company overview for ${ticker}:`, error.message);
    throw new Error('Failed to fetch financial data.');
  }
}

/**
 * Fetches recent news articles for a company from NewsAPI.
 * @param {string} companyName - The name of the company.
 * @returns {Promise<Array<object>>} - A promise that resolves to an array of news articles.
 */
async function getRecentNews(companyName) {
  try {
    const response = await axios.get(NEWS_BASE_URL, {
      params: {
        q: `"${companyName}"`,
        language: 'en',
        sortBy: 'publishedAt',
        pageSize: 10,
        apiKey: NEWS_API_KEY,
      },
    });
    return response.data.articles || [];
  } catch (error) {
    console.error(`Error fetching news for ${companyName}:`, error.message);
    throw new Error('Failed to fetch news data.');
  }
}

export { getCompanyOverview, getRecentNews };
