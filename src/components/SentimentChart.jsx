/**
 * Sentiment Chart Component
 * Displays sentiment distribution with Recharts
 */

import { useSelector } from 'react-redux';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

function SentimentChart({ detailed = false }) {
  const { sentimentDistribution } = useSelector((state) => state.dashboard);

  if (!sentimentDistribution || sentimentDistribution.length === 0) {
    return <div className="text-gray-500 text-center py-8">No sentiment data available</div>;
  }

  // Transform data for pie chart
  const chartData = sentimentDistribution.map((item) => ({
    name: item._id.charAt(0).toUpperCase() + item._id.slice(1),
    value: item.count,
    confidence: item.avgConfidence
  }));

  const COLORS = {
    Positive: '#10b981',
    Neutral: '#6b7280',
    Negative: '#ef4444',
  };

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={detailed ? 120 : 100}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[entry.name] || '#6b7280'} />
            ))}
          </Pie>
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-200">
                    <p className="font-semibold">{payload[0].name}</p>
                    <p className="text-sm text-gray-600">Count: {payload[0].value}</p>
                    {payload[0].payload.confidence && (
                      <p className="text-sm text-gray-600">
                        Avg Confidence: {(payload[0].payload.confidence * 100).toFixed(1)}%
                      </p>
                    )}
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      {detailed && (
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          {chartData.map((item) => (
            <div key={item.name} className="p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold" style={{ color: COLORS[item.name] }}>
                {item.value}
              </div>
              <div className="text-sm text-gray-600">{item.name}</div>
              {item.confidence && (
                <div className="text-xs text-gray-500 mt-1">
                  {(item.confidence * 100).toFixed(1)}% confidence
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SentimentChart;
