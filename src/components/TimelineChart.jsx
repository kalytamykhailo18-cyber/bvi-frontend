/**
 * Timeline Chart Component
 */

import { useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

function TimelineChart() {
  const { timeline } = useSelector((state) => state.dashboard);

  if (!timeline || timeline.length === 0) {
    return <div className="text-gray-500 text-center py-8">No timeline data available</div>;
  }

  // Group by date
  const groupedData = timeline.reduce((acc, item) => {
    const date = item._id.date;
    if (!acc[date]) {
      acc[date] = { date, positive: 0, neutral: 0, negative: 0 };
    }
    acc[date][item._id.sentiment] = item.count;
    return acc;
  }, {});

  const chartData = Object.values(groupedData).sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="positive" stroke="#10b981" name="Positive" strokeWidth={2} />
          <Line type="monotone" dataKey="neutral" stroke="#6b7280" name="Neutral" strokeWidth={2} />
          <Line type="monotone" dataKey="negative" stroke="#ef4444" name="Negative" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TimelineChart;
