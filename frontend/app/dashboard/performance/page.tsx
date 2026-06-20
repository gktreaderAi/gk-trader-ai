'use client';

import { useMemo } from 'react';
import { MetricCard } from '@/components/MetricCard';
import { formatPercent, formatCurrency } from '@/lib/utils';
import { Activity, TrendingUp, Star } from 'lucide-react';

const performance = {
  win_rate: 72.4,
  profit_factor: 1.84,
  drawdown: 12.1,
  total_profit: 23540.0,
};

export default function PerformanceAnalyticsPage() {
  const summary = useMemo(
    () => [
      { label: 'Win Rate', value: formatPercent(performance.win_rate / 100), icon: Star, variant: 'success' },
      { label: 'Profit Factor', value: performance.profit_factor.toFixed(2), icon: TrendingUp, variant: 'success' },
      { label: 'Max Drawdown', value: formatPercent(-performance.drawdown), icon: Activity, variant: 'danger' },
      { label: 'Total Profit', value: formatCurrency(performance.total_profit), icon: TrendingUp, variant: 'success' },
    ],
    []
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Performance Analytics</h1>
        <p className="mt-2 text-gray-400">Analyze your trading edge and keep track of your historic returns.</p>
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
