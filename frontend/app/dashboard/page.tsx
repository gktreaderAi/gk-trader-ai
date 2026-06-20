'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { StatCard } from '@/components/StatCard';
import { Chart } from '@/components/Chart';
import { PortfolioCard } from '@/components/PortfolioCard';
import { StockCard } from '@/components/StockCard';
import { TradeHistoryTable } from '@/components/TradeHistoryTable';
import { Portfolio, Stock, TradeHistory } from '@/types';
import { formatCurrency, formatPercent } from '@/lib/utils';
import api from '@/lib/api';
import { getToken, removeToken } from '@/lib/auth';

const portfolioData: Portfolio[] = [
  {
    id: '1',
    userId: 'user1',
    symbol: 'AAPL',
    quantity: 100,
    averagePrice: 150.5,
    currentPrice: 175.25,
    totalValue: 17525,
    gainLoss: 2475,
    gainLossPercent: 16.42,
  },
  {
    id: '2',
    userId: 'user1',
    symbol: 'GOOGL',
    quantity: 50,
    averagePrice: 100,
    currentPrice: 125.5,
    totalValue: 6275,
    gainLoss: 1275,
    gainLossPercent: 25.5,
  },
];

const stocksData: Stock[] = [
  {
    id: '1',
    symbol: 'TSLA',
    name: 'Tesla Inc',
    price: 245.3,
    change: 5.2,
    changePercent: 2.17,
    volume: 45000000,
    marketCap: 770000000000,
  },
  {
    id: '2',
    symbol: 'NVDA',
    name: 'NVIDIA Corp',
    price: 880.5,
    change: -12.3,
    changePercent: -1.37,
    volume: 32000000,
    marketCap: 2170000000000,
  },
];

const tradesData: TradeHistory[] = [
  {
    id: '1',
    symbol: 'AAPL',
    type: 'BUY',
    quantity: 100,
    price: 150.5,
    date: new Date().toISOString(),
    status: 'COMPLETED',
  },
  {
    id: '2',
    symbol: 'GOOGL',
    type: 'BUY',
    quantity: 50,
    price: 100,
    date: new Date('2025-01-01T12:00:00.000Z').toISOString(),
    status: 'COMPLETED',
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.replace('/login');
      return;
    }

    api
      .get('/api/auth/profile')
      .then((response) => {
        setUserEmail(response.data.email);
      })
      .catch(() => {
        removeToken();
        router.replace('/login');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [router]);

  const handleLogout = () => {
    removeToken();
    router.push('/login');
  };

  const portfolio = portfolioData;
  const stocks = stocksData;
  const trades = tradesData;

  const stats = useMemo(() => {
    const totalValue = portfolio.reduce((sum, p) => sum + p.totalValue, 0);
    const totalGain = portfolio.reduce((sum, p) => sum + p.gainLoss, 0);
    const totalGainPercent = totalValue > 0 ? (totalGain / (totalValue - totalGain)) * 100 : 0;

    return {
      portfolioValue: formatCurrency(totalValue),
      portfolioChange: `${formatPercent(totalGainPercent)}`,
      dayChange: '+$1,250.00',
      buyingPower: formatCurrency(50000),
    };
  }, [portfolio]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">
        Loading dashboard…
      </div>
    );
  }

  return (
    <main className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Welcome back,</h1>
          <p className="text-gray-400">{userEmail || 'Trader'}</p>
        </div>
        <button
          onClick={handleLogout}
          className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Portfolio Value"
          value={stats.portfolioValue}
          change={stats.portfolioChange}
          icon="wallet"
        />
        <StatCard
          label="Today's Change"
          value={stats.dayChange}
          change="+3.42%"
          icon="trending"
        />
        <StatCard
          label="Buying Power"
          value={stats.buyingPower}
          change="Available"
          icon="dollar"
        />
        <StatCard
          label="Total Trades"
          value={trades.length.toString()}
          change="This month"
          icon="activity"
        />
      </div>

      <Chart />

      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Your Portfolio</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {portfolio.map((item) => (
            <PortfolioCard key={item.id} portfolio={item} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Trending Stocks</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stocks.map((stock) => (
            <StockCard key={stock.id} stock={stock} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Trade History</h2>
        <TradeHistoryTable trades={trades} />
      </section>
    </main>
  );
}
