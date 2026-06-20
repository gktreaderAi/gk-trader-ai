'use client';

import { useEffect, useMemo, useState } from 'react';
import api from '@/lib/api';
import { TradeJournal, TradeAnalytics } from '@/types';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { formatCurrency, formatPercent } from '@/lib/utils';
import { Trash2, Edit2, Plus, TrendingUp, TrendingDown } from 'lucide-react';

export default function TradeJournalPage() {
  const [trades, setTrades] = useState<TradeJournal[]>([]);
  const [analytics, setAnalytics] = useState<TradeAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    symbol: '',
    side: 'BUY' as 'BUY' | 'SELL',
    entry_price: '',
    exit_price: '',
    quantity: '1',
    stop_loss: '',
    take_profit: '',
    profit_loss: '',
    notes: '',
    emotion: 'Neutral',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [tradesRes, analyticsRes] = await Promise.all([
        api.get('/api/journal/trades'),
        api.get('/api/journal/analytics'),
      ]);
      setTrades(tradesRes.data);
      setAnalytics(analyticsRes.data);
    } catch (error) {
      console.error('Failed to load trade journal data', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTrade = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const tradePayload = {
        user_id: 1,
        symbol: formData.symbol,
        side: formData.side,
        entry_price: parseFloat(formData.entry_price),
        exit_price: formData.exit_price ? parseFloat(formData.exit_price) : null,
        quantity: parseInt(formData.quantity),
        stop_loss: formData.stop_loss ? parseFloat(formData.stop_loss) : null,
        take_profit: formData.take_profit ? parseFloat(formData.take_profit) : null,
        profit_loss: formData.profit_loss ? parseFloat(formData.profit_loss) : null,
        notes: formData.notes,
        emotion: formData.emotion,
      };

      if (editingId) {
        const response = await api.patch(`/api/journal/trades/${editingId}`, tradePayload);
        setTrades((prev) => prev.map((t) => (t.id === editingId ? response.data : t)));
        setEditingId(null);
      } else {
        const response = await api.post('/api/journal/trades', tradePayload);
        setTrades((prev) => [response.data, ...prev]);
      }

      setFormData({
        symbol: '',
        side: 'BUY',
        entry_price: '',
        exit_price: '',
        quantity: '1',
        stop_loss: '',
        take_profit: '',
        profit_loss: '',
        notes: '',
        emotion: 'Neutral',
      });
      setShowForm(false);
      loadData();
    } catch (error) {
      console.error('Failed to save trade', error);
    }
  };

  const handleDeleteTrade = async (tradeId: number) => {
    if (!confirm('Are you sure you want to delete this trade?')) return;
    try {
      await api.delete(`/api/journal/trades/${tradeId}`);
      setTrades((prev) => prev.filter((t) => t.id !== tradeId));
      loadData();
    } catch (error) {
      console.error('Failed to delete trade', error);
    }
  };

  const handleEditTrade = (trade: TradeJournal) => {
    setEditingId(trade.id);
    setFormData({
      symbol: trade.symbol,
      side: trade.side,
      entry_price: trade.entry_price.toString(),
      exit_price: trade.exit_price?.toString() || '',
      quantity: trade.quantity.toString(),
      stop_loss: trade.stop_loss?.toString() || '',
      take_profit: trade.take_profit?.toString() || '',
      profit_loss: trade.profit_loss?.toString() || '',
      notes: trade.notes || '',
      emotion: trade.emotion || 'Neutral',
    });
    setShowForm(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        Loading trade journal…
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Trade Journal</h1>
          <p className="mt-2 text-gray-400">Track, analyze, and learn from every trade.</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus size={20} className="mr-2" />
          {showForm ? 'Cancel' : 'Add Trade'}
        </Button>
      </div>

      {analytics && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border border-gray-800 bg-gray-900 p-6 shadow-sm">
            <p className="text-sm uppercase tracking-[0.24em] text-gray-400">Total Trades</p>
            <p className="mt-3 text-3xl font-semibold text-white">{analytics.total_trades}</p>
            <p className="mt-2 text-sm text-gray-400">{analytics.winning_trades}W / {analytics.losing_trades}L</p>
          </div>
          <div className="rounded-3xl border border-gray-800 bg-gray-900 p-6 shadow-sm">
            <p className="text-sm uppercase tracking-[0.24em] text-gray-400">Win Rate</p>
            <p className="mt-3 text-3xl font-semibold text-emerald-400">{formatPercent(analytics.win_rate)}</p>
            <p className="mt-2 text-sm text-gray-400">Last 100 trades</p>
          </div>
          <div className="rounded-3xl border border-gray-800 bg-gray-900 p-6 shadow-sm">
            <p className="text-sm uppercase tracking-[0.24em] text-gray-400">Avg Reward/Risk</p>
            <p className="mt-3 text-3xl font-semibold text-blue-400">{analytics.average_rr.toFixed(2)}</p>
            <p className="mt-2 text-sm text-gray-400">RR Ratio</p>
          </div>
          <div className="rounded-3xl border border-gray-800 bg-gray-900 p-6 shadow-sm">
            <p className="text-sm uppercase tracking-[0.24em] text-gray-400">Total P&L</p>
            <p className={`mt-3 text-3xl font-semibold ${analytics.total_profit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {formatCurrency(analytics.total_profit)}
            </p>
            <p className="mt-2 text-sm text-gray-400">Cumulative</p>
          </div>
        </div>
      )}

      {showForm && (
        <div className="rounded-3xl border border-gray-800 bg-gray-900 p-6 shadow-sm">
          <h2 className="mb-6 text-2xl font-semibold text-white">{editingId ? 'Edit Trade' : 'Add New Trade'}</h2>
          <form onSubmit={handleAddTrade} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Input
              label="Symbol"
              placeholder="AAPL"
              value={formData.symbol}
              onChange={(e) => setFormData({ ...formData, symbol: e.target.value.toUpperCase() })}
              required
            />
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Side</label>
              <select
                value={formData.side}
                onChange={(e) => setFormData({ ...formData, side: e.target.value as 'BUY' | 'SELL' })}
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white"
              >
                <option>BUY</option>
                <option>SELL</option>
              </select>
            </div>
            <Input
              label="Entry Price"
              type="number"
              step="0.01"
              placeholder="150.50"
              value={formData.entry_price}
              onChange={(e) => setFormData({ ...formData, entry_price: e.target.value })}
              required
            />
            <Input
              label="Exit Price"
              type="number"
              step="0.01"
              placeholder="175.25"
              value={formData.exit_price}
              onChange={(e) => setFormData({ ...formData, exit_price: e.target.value })}
            />
            <Input
              label="Quantity"
              type="number"
              placeholder="1"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              required
            />
            <Input
              label="Stop Loss"
              type="number"
              step="0.01"
              placeholder="145.00"
              value={formData.stop_loss}
              onChange={(e) => setFormData({ ...formData, stop_loss: e.target.value })}
            />
            <Input
              label="Take Profit"
              type="number"
              step="0.01"
              placeholder="180.00"
              value={formData.take_profit}
              onChange={(e) => setFormData({ ...formData, take_profit: e.target.value })}
            />
            <Input
              label="P/L"
              type="number"
              step="0.01"
              placeholder="500.00"
              value={formData.profit_loss}
              onChange={(e) => setFormData({ ...formData, profit_loss: e.target.value })}
            />
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Emotion</label>
              <select
                value={formData.emotion}
                onChange={(e) => setFormData({ ...formData, emotion: e.target.value })}
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white"
              >
                <option>Neutral</option>
                <option>Confident</option>
                <option>Anxious</option>
                <option>Frustrated</option>
                <option>Excited</option>
              </select>
            </div>
            <div className="sm:col-span-2 lg:col-span-3">
              <label className="block text-sm font-medium text-gray-300 mb-2">Notes</label>
              <textarea
                placeholder="Trade notes and observations..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white"
                rows={3}
              />
            </div>
            <Button type="submit">{editingId ? 'Update Trade' : 'Save Trade'}</Button>
            <Button
              variant="secondary"
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
              }}
            >
              Cancel
            </Button>
          </form>
        </div>
      )}

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">Recent Trades</h2>
        {trades.length === 0 ? (
          <div className="rounded-3xl border border-gray-800 bg-gray-900 p-6 text-center text-gray-400">
            No trades recorded yet. Add your first trade to get started!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800 text-left text-gray-400">
                  <th className="px-4 py-3">Symbol</th>
                  <th className="px-4 py-3">Side</th>
                  <th className="px-4 py-3">Entry</th>
                  <th className="px-4 py-3">Exit</th>
                  <th className="px-4 py-3">P/L</th>
                  <th className="px-4 py-3">Emotion</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {trades.map((trade) => (
                  <tr key={trade.id} className="border-b border-gray-800 hover:bg-gray-900/50">
                    <td className="px-4 py-3 font-semibold text-white">{trade.symbol}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2 py-1 text-xs font-semibold ${trade.side === 'BUY' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                        {trade.side}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-300">{formatCurrency(trade.entry_price)}</td>
                    <td className="px-4 py-3 text-gray-300">{trade.exit_price ? formatCurrency(trade.exit_price) : '—'}</td>
                    <td className="px-4 py-3">
                      {trade.profit_loss !== undefined && (
                        <span className={trade.profit_loss >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                          {trade.profit_loss >= 0 ? '+' : ''}{formatCurrency(trade.profit_loss)}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-300">{trade.emotion || '—'}</td>
                    <td className="px-4 py-3 flex gap-2">
                      <button
                        onClick={() => handleEditTrade(trade)}
                        className="rounded-lg p-2 hover:bg-gray-800 text-gray-400 hover:text-white"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteTrade(trade.id)}
                        className="rounded-lg p-2 hover:bg-gray-800 text-gray-400 hover:text-rose-400"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
