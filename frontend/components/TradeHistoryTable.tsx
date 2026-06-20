'use client';

import { TradeHistory } from '@/types';
import { formatCurrency, formatDate } from '@/lib/utils';

export const TradeHistoryTable = ({ trades }: { trades: TradeHistory[] }) => {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-800 border-b border-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300">Symbol</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300">Type</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300">Qty</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300">Price</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300">Date</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300">Status</th>
            </tr>
          </thead>
          <tbody>
            {trades.map((trade) => (
              <tr
                key={trade.id}
                className="border-b border-gray-800 hover:bg-gray-800/50 transition"
              >
                <td className="px-6 py-3 font-semibold text-white">{trade.symbol}</td>
                <td className="px-6 py-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      trade.type === 'BUY'
                        ? 'bg-green-500/20 text-green-500'
                        : 'bg-red-500/20 text-red-500'
                    }`}
                  >
                    {trade.type}
                  </span>
                </td>
                <td className="px-6 py-3 text-gray-300">{trade.quantity}</td>
                <td className="px-6 py-3 text-gray-300">{formatCurrency(trade.price)}</td>
                <td className="px-6 py-3 text-gray-400 text-sm">{formatDate(trade.date)}</td>
                <td className="px-6 py-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      trade.status === 'COMPLETED'
                        ? 'bg-blue-500/20 text-blue-500'
                        : trade.status === 'PENDING'
                          ? 'bg-yellow-500/20 text-yellow-500'
                          : 'bg-gray-500/20 text-gray-500'
                    }`}
                  >
                    {trade.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
