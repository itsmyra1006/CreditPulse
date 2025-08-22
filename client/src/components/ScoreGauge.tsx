import React from 'react';

const getScoreColor = (score: number) => {
  if (score >= 80) return 'text-green-400'; if (score >= 60) return 'text-yellow-400';
  if (score >= 40) return 'text-orange-400'; return 'text-red-500';
};
const getGlowColor = (score: number) => {
  if (score >= 80) return 'shadow-[0_0_20px_rgba(74,222,128,0.5)]'; if (score >= 60) return 'shadow-[0_0_20px_rgba(250,204,21,0.5)]';
  if (score >= 40) return 'shadow-[0_0_20px_rgba(251,146,60,0.5)]'; return 'shadow-[0_0_20px_rgba(239,68,68,0.5)]';
}

export const ScoreGauge: React.FC<{ score: number }> = ({ score }) => {
  const color = getScoreColor(score); const glow = getGlowColor(score);
  const circumference = 2 * Math.PI * 52; const offset = circumference - (score / 100) * circumference;
  return (
    <div className="relative w-48 h-48">
      <svg className="w-full h-full" viewBox="0 0 120 120">
        <circle className="text-gray-700" strokeWidth="10" stroke="currentColor" fill="transparent" r="52" cx="60" cy="60" />
        <circle className={`${color} transition-all duration-1000 ease-out`} strokeWidth="10" strokeDasharray={circumference}
          strokeDashoffset={offset} strokeLinecap="round" stroke="currentColor" fill="transparent"
          r="52" cx="60" cy="60" transform="rotate(-90 60 60)" />
      </svg>
      <div className={`absolute inset-0 flex items-center justify-center font-orbitron text-5xl font-bold ${color} ${glow}`}>{score}</div>
    </div>
  );
};