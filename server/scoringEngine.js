/**
 * Calculates a creditworthiness score based on a set of financial and sentiment features.
 * This is a transparent, rule-based model as required by the hackathon.
 * @param {object} features - An object containing the calculated features.
 * @returns {{score: number, reasoning: Array<string>}} - An object with the final score and an array of strings explaining the adjustments.
 */
function calculateCreditScore(features) {
  let score = 70; // Start with a neutral base score
  const reasoning = [`Base score started at ${score}.`];

  // Rule 1: Debt-to-Equity Ratio (Lower is better)
  if (features.debtToEquityRatio > 2.0) {
    score -= 20;
    reasoning.push(`-20 points: High Debt-to-Equity ratio of ${features.debtToEquityRatio.toFixed(2)} indicates high leverage.`);
  } else if (features.debtToEquityRatio > 1.0) {
    score -= 10;
    reasoning.push(`-10 points: Moderate Debt-to-Equity ratio of ${features.debtToEquityRatio.toFixed(2)}.`);
  } else if (features.debtToEquityRatio < 0.5 && features.debtToEquityRatio > 0) {
    score += 10;
    reasoning.push(`+10 points: Low Debt-to-Equity ratio of ${features.debtToEquityRatio.toFixed(2)} indicates strong financial stability.`);
  }

  // Rule 2: Profit Margin (Higher is better)
  if (features.profitMargin > 0.2) {
    score += 15;
    reasoning.push(`+15 points: Excellent Profit Margin of ${(features.profitMargin * 100).toFixed(2)}%.`);
  } else if (features.profitMargin > 0.1) {
    score += 5;
    reasoning.push(`+5 points: Healthy Profit Margin of ${(features.profitMargin * 100).toFixed(2)}%.`);
  } else if (features.profitMargin < 0.05) {
    score -= 15;
    reasoning.push(`-15 points: Low Profit Margin of ${(features.profitMargin * 100).toFixed(2)}% indicates potential profitability issues.`);
  }

  // Rule 3: News Sentiment (Higher is better)
  if (features.avgNewsSentiment > 0.2) {
    score += 15;
    reasoning.push(`+15 points: Strong positive market sentiment detected in news headlines.`);
  } else if (features.avgNewsSentiment < -0.2) {
    score -= 15;
    reasoning.push(`-15 points: Significant negative market sentiment detected in news headlines.`);
  }

  // Rule 4: P/E Ratio (Valuation Risk)
  if (features.peRatio > 50) {
      score -= 10;
      reasoning.push(`-10 points: High P/E Ratio of ${features.peRatio.toFixed(2)} may indicate overvaluation risk.`);
  } else if (features.peRatio < 25 && features.peRatio > 0) {
      score += 5;
      reasoning.push(`+5 points: Healthy P/E Ratio of ${features.peRatio.toFixed(2)} suggests a reasonable valuation.`);
  }

  // NEW Rule 5: Return On Equity (Profitability Efficiency)
  // ROE > 15% is generally considered good.
  if (features.returnOnEquity > 0.15) {
      score += 10;
      reasoning.push(`+10 points: Strong Return on Equity of ${(features.returnOnEquity * 100).toFixed(2)}% shows efficient use of shareholder equity.`);
  } else if (features.returnOnEquity < 0.05) {
      score -= 10;
      reasoning.push(`-10 points: Weak Return on Equity of ${(features.returnOnEquity * 100).toFixed(2)}% suggests inefficiency.`);
  }

  // Clamp the score between 1 and 100.
  const finalScore = Math.max(1, Math.min(100, Math.round(score)));
  reasoning.push(`Final score clamped to ${finalScore}.`);

  return { score: finalScore, reasoning };
}

export { calculateCreditScore };
