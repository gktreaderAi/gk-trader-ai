'use client';

import { useEffect, useMemo, useState } from 'react';
import { MetricCard } from '@/components/MetricCard';
import { formatPercent, formatCurrency } from '@/lib/utils';
import { Activity, TrendingUp, Star } from 'lucide-react';
import api from '@/lib/api';

interface Performance {
  id: number;
  user_id: number;
  win_rate: number;
  profit_factor: number;
  drawdown: number;
  total_profit: number;
}

export default function PerformanceAnalyticsPage() {
  const [performance, setPerformance] = useState<Performance | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPerformance();
  }, []);

  const fetchPerformance = async () => {
    try {
      const response = await api.get('/api/performance/');
      setPerformance(response.data);
    } catch (error) {
      console.error('Error fetching performance:', error);
    } finally {
      setLoading(false);
    }
  };

  const summary = useMemo(
    () => [
      { label: 'Win Rate', value: performance ? formatPercent(performance.win_rate / 100) : '0%', icon: Star, variant: 'success' as const },
      { label: 'Profit Factor', value: performance ? performance.profit_factor.toFixed(2) : '0', icon: TrendingUp, variant: 'success' as const },
      { label: 'Max Drawdown', value: performance ? formatPercent(-performance.drawdown) : '0%', icon: Activity, variant: 'danger' as const },
      { label: 'Total Profit', value: performance ? formatCurrency(performance.total_profit) : '$0', icon: TrendingUp, variant: performance?.total_profit ?? 0 > 0 ? ('success' as const) : ('danger' as const) },
    ],
    [performance]
  );

  if (loading) return <div className="text-white">Loading...</div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Performance Analytics</h1>
        <p className="mt-2 text-gray-400">Analyze your trading edge and keep track of your historic returns.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summary.map((item) => (
          <MetricCard
            key={item.label}
            label={item.label}
            value={item.value}
            icon={item.icon}
            variant={item.variant}
          />
        ))}
      </div>

      {performance ? (
        <div className="rounded-3xl border border-gray-800 bg-gray-900 p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-white">Detailed Metrics</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 text-gray-300">
            <div>
              <p className="text-sm text-gray-400">Win Rate</p>
              <p className="text-2xl font-bold text-white">{performance.win_rate.toFixed(1)}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Profit Factor</p>
              <p className="text-2xl font-bold text-white">{performance.profit_factor.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Max Drawdown</p>
              <p className="text-2xl font-bold text-white">{performance.drawdown.toFixed(2)}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Profit</p>
              <p className={`text-2xl font-bold ${performance.total_profit > 0 ? 'text-green-400' : 'text-red-400'}`}>
                ${performance.total_profit.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-3xl border border-gray-800 bg-gray-900 p-6 shadow-sm text-center">
          <p className="text-gray-400">No performance data available yet.</p>
        </div>
      )}
    </div>
  );
}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summary.map((item) => (
          <MetricCard key={item.label} label={item.label} value={item.value} icon={item.icon} variant={item.variant as any} />
        ))}
      </div>

      <div className="rounded-3xl border border-gray-800 bg-gray-900 p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-white">Performance Notes</h2>
        <p className="mt-4 text-gray-300 leading-7">
          You are maintaining a strong win rate while protecting capital with a controlled drawdown. Keep adjusting risk exposure if market volatility increases.
        </p>
      </div>
    </div>
  );
}
