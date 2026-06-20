'use client';

import { DollarSign, TrendingUp, Wallet, Activity } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  change?: string;
  icon: 'wallet' | 'trending' | 'dollar' | 'activity';
}

export const StatCard = ({ label, value, change, icon }: StatCardProps) => {
  const iconMap = {
    wallet: Wallet,
    trending: TrendingUp,
    dollar: DollarSign,
    activity: Activity,
  };

  const Icon = iconMap[icon];
  const isPositive = change && !change.startsWith('-');

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-gray-400 text-sm font-medium mb-2">{label}</p>
          <h3 className="text-3xl font-bold text-white mb-2">{value}</h3>
          {change && (
            <p className={`text-sm font-semibold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {change}
            </p>
          )}
        </div>
        <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg">
          <Icon size={24} className="text-blue-500" />
        </div>
      </div>
    </div>
  );
};
