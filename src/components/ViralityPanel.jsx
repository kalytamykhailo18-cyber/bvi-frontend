/**
 * Virality Panel Component
 * Early-signal virality detection (Client requirement)
 */

import { useSelector } from 'react-redux';
import { TrendingUp, Clock, Flame } from 'lucide-react';

function ViralityPanel() {
  const { viralitySignals } = useSelector((state) => state.dashboard);

  if (!viralitySignals || viralitySignals.length === 0) {
    return (
      <div className="text-gray-500 text-center py-8">
        No viral signals detected in the last 24 hours
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {viralitySignals.slice(0, 5).map((post, index) => (
        <div
          key={post.postId}
          className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start space-x-4 flex-1">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                <Flame className="w-5 h-5 text-white" />
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="font-semibold text-gray-900">{post.sourceId}</span>
                <span className="text-xs px-2 py-1 bg-white rounded-full text-gray-600">
                  {post.platform}
                </span>
                {post.sentiment && (
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    post.sentiment === 'positive'
                      ? 'bg-green-100 text-green-700'
                      : post.sentiment === 'negative'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {post.sentiment}
                  </span>
                )}
              </div>

              <p className="text-sm text-gray-700 line-clamp-2">
                {post.text || post.combinedText || 'No text available'}
              </p>

              <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                <span className="flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {post.hoursSincePost}h ago
                </span>
                <span>👍 {post.likes || 0}</span>
                <span>💬 {post.comments || 0}</span>
                <span>🔄 {post.shares || 0}</span>
              </div>
            </div>
          </div>

          <div className="flex-shrink-0 text-right ml-4">
            <div className="flex items-center text-orange-600 font-bold">
              <TrendingUp className="w-4 h-4 mr-1" />
              {post.velocity.toFixed(1)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              eng/hour
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ViralityPanel;
