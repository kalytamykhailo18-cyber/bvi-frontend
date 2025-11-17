/**
 * Topics Chart Component
 */

import { useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

function TopicsChart({ detailed = false }) {
  const { topicDistribution } = useSelector((state) => state.dashboard);

  if (!topicDistribution || topicDistribution.length === 0) {
    return <div className="text-gray-500 text-center py-8">No topic data available</div>;
  }

  const chartData = topicDistribution.map((item) => ({
    topic: item._id.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
    posts: item.count,
    engagement: Math.round(item.avgEngagement || 0)
  }));

  return (
    <div className={detailed ? 'h-96' : 'h-80'}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="topic"
            angle={-45}
            textAnchor="end"
            height={100}
            interval={0}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="posts" fill="#3b82f6" name="Posts" />
          {detailed && <Bar dataKey="engagement" fill="#10b981" name="Avg Engagement" />}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TopicsChart;
