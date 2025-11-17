/**
 * Keywords Cloud Component
 */

import { useSelector } from 'react-redux';

function KeywordsCloud() {
  const { keywords } = useSelector((state) => state.dashboard);

  if (!keywords || keywords.length === 0) {
    return <div className="text-gray-500 text-center py-8">No keyword data available</div>;
  }

  const maxCount = Math.max(...keywords.map((k) => k.count));

  const getFontSize = (count) => {
    const ratio = count / maxCount;
    return 12 + ratio * 32; // 12px to 44px
  };

  const getColor = (index) => {
    const colors = [
      'text-blue-600',
      'text-green-600',
      'text-purple-600',
      'text-orange-600',
      'text-red-600',
      'text-indigo-600',
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 p-6">
      {keywords.map((keyword, index) => (
        <span
          key={keyword.word}
          className={`font-semibold cursor-pointer hover:underline transition-all ${getColor(index)}`}
          style={{ fontSize: `${getFontSize(keyword.count)}px` }}
          title={`${keyword.word}: ${keyword.count} mentions`}
        >
          {keyword.word}
        </span>
      ))}
    </div>
  );
}

export default KeywordsCloud;
