'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';
import { Portfolio } from '@/types';
import { formatCurrency, formatPercent } from '@/lib/utils';

export const PortfolioCard = ({ portfolio }: { portfolio: Portfolio }) => {
  const isGain = portfolio.gainLoss >= 0;

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white">{portfolio.symbol}</h3>
          <p className="text-sm text-gray-400">{portfolio.quantity} shares</p>
        </div>
        <div className={`p-2 rounded-lg ${isGain ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
          {isGain ? (
            <TrendingUp size={20} className="text-green-500" />
          ) : (
            <TrendingDown size={20} className="text-red-500" />
          )}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Current Value</span>
          <span className="text-white font-semibold">{formatCurrency(portfolio.totalValue)}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-400">Avg Price</span>
          <span className="text-gray-300">{formatCurrency(portfolio.averagePrice)}</span>
        </div>

        <div className="flex justify-between items-center pt-3 border-t border-gray-800">
          <span className={isGain ? 'text-green-500' : 'text-red-500'}>
            Gain/Loss
          </span>
          <span className={`font-semibold ${isGain ? 'text-green-500' : 'text-red-500'}`}>
            {formatCurrency(portfolio.gainLoss)} {formatPercent(portfolio.gainLossPercent)}
          </span>
        </div>
      </div>
    </div>
  );
};
