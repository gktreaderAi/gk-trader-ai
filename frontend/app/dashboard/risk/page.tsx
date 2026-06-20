'use client';

import { useEffect, useState } from 'react';
import { MetricCard } from '@/components/MetricCard';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { ShieldCheck, TrendingUp, TrendingDown } from 'lucide-react';
import api from '@/lib/api';

interface RiskSetting {
  id: number;
  user_id: number;
  daily_risk: number;
  weekly_risk: number;
  max_drawdown: number;
}

export default function RiskManagerPage() {
  const [riskSetting, setRiskSetting] = useState<RiskSetting | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    daily_risk: 0,
    weekly_risk: 0,
    max_drawdown: 0,
  });

  useEffect(() => {
    fetchRiskSettings();
  }, []);

  const fetchRiskSettings = async () => {
    try {
      const response = await api.get('/api/risk/');
      setRiskSetting(response.data);
      setFormData({
        daily_risk: response.data.daily_risk,
        weekly_risk: response.data.weekly_risk,
        max_drawdown: response.data.max_drawdown,
      });
    } catch {
      setRiskSetting(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveRisk = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/api/risk/', formData);
      await fetchRiskSettings();
      setEditing(false);
    } catch (error) {
      console.error('Error saving risk settings:', error);
    }
  };

  if (loading) return <div className="text-white">Loading...</div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Risk Manager</h1>
        <p className="mt-2 text-gray-400">Monitor risk limits and preserve capital with defined risk controls.</p>
      </div>

      {riskSetting ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <MetricCard label="Daily Risk" value={`${riskSetting.daily_risk.toFixed(2)}%`} subtitle="Approved risk per day" icon={ShieldCheck} variant="warning" />
            <MetricCard label="Weekly Risk" value={`${riskSetting.weekly_risk.toFixed(2)}%`} subtitle="Approved risk per week" icon={TrendingDown} variant="warning" />
            <MetricCard label="Max Drawdown" value={`${riskSetting.max_drawdown.toFixed(2)}%`} subtitle="Capital preservation threshold" icon={TrendingUp} variant="danger" />
          </div>

          <div className="rounded-3xl border border-gray-800 bg-gray-900 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-white">Risk Summary</h2>
              <Button onClick={() => setEditing(!editing)} variant="secondary">
                {editing ? 'Cancel' : 'Edit'}
              </Button>
            </div>

            {editing ? (
              <form onSubmit={handleSaveRisk} className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300">Daily Risk (%)</label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.daily_risk}
                    onChange={(e) => setFormData({ ...formData, daily_risk: parseFloat(e.target.value) })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">Weekly Risk (%)</label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.weekly_risk}
                    onChange={(e) => setFormData({ ...formData, weekly_risk: parseFloat(e.target.value) })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">Max Drawdown (%)</label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.max_drawdown}
                    onChange={(e) => setFormData({ ...formData, max_drawdown: parseFloat(e.target.value) })}
                    className="mt-1"
                  />
                </div>
                <Button type="submit" variant="primary">
                  Save Changes
                </Button>
              </form>
            ) : (
              <p className="mt-4 text-gray-300 leading-7">Keep position sizing under 2.5% per trade. Daily risk: {riskSetting.daily_risk}%, Weekly risk: {riskSetting.weekly_risk}%</p>
            )}
          </div>
        </>
      ) : (
        <div className="rounded-3xl border border-gray-800 bg-gray-900 p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-white">No Risk Settings</h2>
          <p className="mt-2 text-gray-300">Create your first risk settings to get started.</p>
          <Button onClick={() => setEditing(true)} className="mt-4" variant="primary">
            Create Risk Settings
          </Button>
        </div>
      )}
    </div>
  );
}
