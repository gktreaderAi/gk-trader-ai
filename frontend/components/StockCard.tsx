'use client';

import { Stock } from '@/types';
import { TrendingUp, TrendingDown, Star } from 'lucide-react';
import { formatCurrency, formatPercent, formatNumber } from '@/lib/utils';

export const StockCard = ({ stock }: { stock: Stock }) => {
  const isUp = stock.change >= 0;

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition cursor-pointer">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white">{stock.symbol}</h3>
          <p className="text-xs text-gray-400">{stock.name}</p>
        </div>
        <button className="p-2 hover:bg-gray-800 rounded-lg">
          <Star size={18} className="text-gray-400 hover:text-yellow-500" />
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-white">{formatCurrency(stock.price)}</span>
          <span className={`text-sm font-semibold flex items-center gap-1 ${isUp ? 'text-green-500' : 'text-red-500'}`}>
            {isUp ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            {formatPercent(stock.changePercent)}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-gray-800/50 rounded p-2">
            <p className="text-gray-400">Volume</p>
            <p className="text-white font-semibold">{formatNumber(stock.volume)}</p>
          </div>
          <div className="bg-gray-800/50 rounded p-2">
            <p className="text-gray-400">Market Cap</p>
            <p className="text-white font-semibold">{formatNumber(stock.marketCap)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
