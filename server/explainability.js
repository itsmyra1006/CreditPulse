/**
 * Generates user-friendly explanations (positive/negative factors) based on the scoring engine's reasoning.
 * @param {Array<string>} reasoning - The array of reasoning strings from the scoring engine.
 * @param {Array<object>} analyzedArticles - The articles with sentiment data.
 * @returns {{positiveFactors: Array<string>, negativeFactors: Array<string>, explainedNews: Array<object>}} - An object with lists of positive and negative factors and news with impact statements.
 */
function generateExplanation(reasoning, analyzedArticles) {
  const positiveFactors = [];
  const negativeFactors = [];

  reasoning.forEach(reason => {
    if (reason.startsWith('+')) {
      // Example: "+10 points: Low Debt-to-Equity ratio..." -> "Low Debt-to-Equity ratio..."
      positiveFactors.push(reason.split(': ')[1]);
    } else if (reason.startsWith('-')) {
      negativeFactors.push(reason.split(': ')[1]);
    }
  });

  // Add impact statements to news articles
  const explainedNews = analyzedArticles.map(article => {
      let impact = "This event provides a neutral signal regarding the company's credit risk.";
      if (article.sentiment === 'Positive') {
          impact = "This news is likely to boost investor confidence and suggests positive operational performance, lowering perceived credit risk.";
      } else if (article.sentiment === 'Negative') {
          impact = "This event could signal potential operational challenges or market headwinds, increasing perceived credit risk.";
      }
      return { ...article, impact };
  });

  return { positiveFactors, negativeFactors, explainedNews };
}

export { generateExplanation };
