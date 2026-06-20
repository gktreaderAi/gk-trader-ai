'use client';

import { MetricCard } from '@/components/MetricCard';
import { ShieldCheck, TrendingUp, TrendingDown } from 'lucide-react';

const riskProfile = {
  daily_risk: '1.2%',
  weekly_risk: '4.8%',
  max_drawdown: '12.5%',
  exposure: 'Moderate',
  recommendations: 'Keep position sizing under 2.5% per trade.',
};

export default function RiskManagerPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Risk Manager</h1>
        <p className="mt-2 text-gray-400">Monitor risk limits and preserve capital with defined risk controls.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <MetricCard label="Daily Risk" value={riskProfile.daily_risk} subtitle="Approved risk per day" icon={ShieldCheck} variant="warning" />
        <MetricCard label="Weekly Risk" value={riskProfile.weekly_risk} subtitle="Approved risk per week" icon={TrendingDown} variant="warning" />
        <MetricCard label="Max Drawdown" value={riskProfile.max_drawdown} subtitle="Capital preservation threshold" icon={TrendingUp} variant="danger" />
      </div>

      <div className="rounded-3xl border border-gray-800 bg-gray-900 p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-white">Risk Summary</h2>
        <p className="mt-4 text-gray-300 leading-7">{riskProfile.recommendations}</p>
      </div>
    </div>
  );
}
