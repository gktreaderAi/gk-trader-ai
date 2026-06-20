import Link from 'next/link';
import { ArrowRight, BarChart3, Zap, Shield } from 'lucide-react';
import { Button } from '@/components/Button';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      {/* Navigation */}
      <nav className="border-b border-gray-800 sticky top-0 z-50 bg-gray-950/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            GK Trader
          </h1>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-gray-300 hover:text-white">
              Sign In
            </Link>
            <Link href="/register">
              <Button variant="primary">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-6xl font-bold mb-6">
            Trade with <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Confidence</span>
          </h2>
          <p className="text-xl text-gray-400 mb-12">
            Professional trading platform with real-time analytics, advanced charting tools, and a portfolio management system designed for modern traders.
          </p>

          <div className="flex items-center justify-center gap-4 mb-20">
            <Link href="/register">
              <Button variant="primary" size="lg" className="flex items-center gap-2">
                Start Trading <ArrowRight size={20} />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="secondary" size="lg">
                Sign In
              </Button>
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-24">
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-8">
              <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg w-fit mx-auto mb-4">
                <BarChart3 size={32} className="text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Advanced Analytics</h3>
              <p className="text-gray-400">
                Real-time market data and advanced charting tools to make informed trading decisions.
              </p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-lg p-8">
              <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg w-fit mx-auto mb-4">
                <Zap size={32} className="text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Lightning Fast</h3>
              <p className="text-gray-400">
                Ultra-low latency execution and instant updates to keep you ahead of the market.
              </p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-lg p-8">
              <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg w-fit mx-auto mb-4">
                <Shield size={32} className="text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Secure Trading</h3>
              <p className="text-gray-400">
                Bank-level security with encrypted transactions and multi-factor authentication.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gray-950 px-6 py-8">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>&copy; 2024 GK Trader. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
