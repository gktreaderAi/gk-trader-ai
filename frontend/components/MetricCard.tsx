'use client';

import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string;
  subtitle?: string;
  icon?: LucideIcon;
  variant?: 'default' | 'success' | 'warning' | 'danger';
}

export const MetricCard = ({
  label,
  value,
  subtitle,
  icon: Icon,
  variant = 'default',
}: MetricCardProps) => {
  const variantClasses = {
    default: 'bg-gray-900 border-gray-800 text-white',
    success: 'bg-emerald-950 border-emerald-800 text-emerald-400',
    warning: 'bg-amber-950 border-amber-800 text-amber-400',
    danger: 'bg-rose-950 border-rose-800 text-rose-400',
  };

  return (
    <div className={`border rounded-3xl p-6 shadow-sm ${variantClasses[variant]}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-gray-400">{label}</p>
          <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
        </div>
        {Icon ? (
          <div className="rounded-2xl bg-white/5 p-3 text-blue-400">
            <Icon size={24} />
          </div>
        ) : null}
      </div>
      {subtitle ? <p className="mt-4 text-sm text-gray-400">{subtitle}</p> : null}
    </div>
  );
};
