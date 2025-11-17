/**
 * Overview Cards Component
 * KPI cards for dashboard overview
 */

import { useSelector } from 'react-redux';
import { TrendingUp, MessageSquare, ThumbsUp, Share2 } from 'lucide-react';

function OverviewCards() {
  const { overviewStats } = useSelector((state) => state.dashboard);

  if (!overviewStats) {
    return <div className="text-gray-500">Loading stats...</div>;
  }

  const cards = [
    {
      title: 'Total Posts',
      value: overviewStats.totalPosts || 0,
      icon: MessageSquare,
      color: 'blue',
      description: 'Across all platforms'
    },
    {
      title: 'Avg Likes',
      value: Math.round(overviewStats.engagement?.avgLikes || 0),
      icon: ThumbsUp,
      color: 'green',
      description: 'Per post'
    },
    {
      title: 'Avg Shares',
      value: Math.round(overviewStats.engagement?.avgShares || 0),
      icon: Share2,
      color: 'purple',
      description: 'Per post'
    },
    {
      title: 'Avg Comments',
      value: Math.round(overviewStats.engagement?.avgComments || 0),
      icon: TrendingUp,
      color: 'orange',
      description: 'Per post'
    },
  ];

  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500',
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => (
        <div key={card.title} className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{card.title}</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{card.value.toLocaleString()}</p>
              <p className="mt-1 text-sm text-gray-500">{card.description}</p>
            </div>
            <div className={`p-3 rounded-full ${colorClasses[card.color]}`}>
              <card.icon className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OverviewCards;
