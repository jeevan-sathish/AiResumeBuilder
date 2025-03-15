
import { useEffect, useRef } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface ResumeStrengthProps {
  scores: {
    category: string;
    score: number;
  }[];
}

const ResumeStrength: React.FC<ResumeStrengthProps> = ({ scores }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  const getBarColor = (score: number) => {
    if (score >= 80) return "#10b981"; // green
    if (score >= 60) return "#6366f1"; // indigo
    if (score >= 40) return "#f59e0b"; // amber
    return "#ef4444"; // red
  };

  const totalScore = Math.round(
    scores.reduce((sum, item) => sum + item.score, 0) / scores.length
  );

  return (
    <div className="glass-card p-6 rounded-xl">
      <div className="mb-6 text-center">
        <h3 className="text-2xl font-bold mb-2">Resume Strength</h3>
        <div className="flex justify-center items-center">
          <div className="relative w-28 h-28">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                className="text-gray-200 dark:text-gray-700"
                strokeWidth="10"
                stroke="currentColor"
                fill="transparent"
                r="40"
                cx="50"
                cy="50"
              />
              {/* Progress circle */}
              <circle
                className="text-primary"
                strokeWidth="10"
                strokeDasharray={2 * Math.PI * 40}
                strokeDashoffset={
                  2 * Math.PI * 40 * (1 - totalScore / 100)
                }
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="40"
                cx="50"
                cy="50"
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold">{totalScore}%</span>
            </div>
          </div>
        </div>
      </div>

      <div ref={chartRef} className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={scores}
            margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis 
              dataKey="category" 
              angle={-45} 
              textAnchor="end" 
              height={60} 
              tick={{ fontSize: 12 }}
            />
            <YAxis domain={[0, 100]} />
            <Tooltip 
              formatter={(value: number) => [`${value}%`, 'Score']}
              contentStyle={{ 
                borderRadius: '0.5rem', 
                backgroundColor: 'var(--color-background)',
                border: '1px solid var(--color-border)'
              }} 
            />
            <Bar dataKey="score" radius={[4, 4, 0, 0]}>
              {scores.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.score)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ResumeStrength;
