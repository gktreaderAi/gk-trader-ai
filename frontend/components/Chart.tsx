'use client';

const chartValues = Array.from({ length: 24 }, () => Math.random() * 100);

export const Chart = () => {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-white">Price Chart</h2>
        <div className="flex gap-2">
          {['1D', '1W', '1M', '3M', '1Y'].map((period) => (
            <button
              key={period}
              className={`px-3 py-1 text-sm rounded ${
                period === '1D'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      <div className="h-64 flex items-end justify-between gap-1 px-4">
        {chartValues.map((value, i) => (
          <div
            key={i}
            className="flex-1 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t opacity-80 hover:opacity-100 transition"
            style={{ height: `${value}%` }}
          ></div>
        ))}
      </div>

      <div className="flex justify-between mt-4 px-4 text-xs text-gray-400">
        <span>00:00</span>
        <span>06:00</span>
        <span>12:00</span>
        <span>18:00</span>
        <span>24:00</span>
      </div>
    </div>
  );
};
