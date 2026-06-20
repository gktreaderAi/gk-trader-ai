export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface Stock {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
}

export interface Portfolio {
  id: string;
  userId: string;
  symbol: string;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  totalValue: number;
  gainLoss: number;
  gainLossPercent: number;
}

export interface ChartData {
  timestamp: string;
  price: number;
  volume: number;
}

export interface TradeHistory {
  id: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  quantity: number;
  price: number;
  date: string;
  status: 'COMPLETED' | 'PENDING' | 'CANCELLED';
}

export interface Lesson {
  id: number;
  title: string;
  category: string;
  description: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface LessonProgress {
  id: number;
  user_id: number;
  lesson_id: number;
  progress: number;
  completed: boolean;
  updated_at: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answer?: string | null;
}

export interface QuizResponse {
  lesson_id: number;
  questions: QuizQuestion[];
}

export interface TradeJournal {
  id: number;
  user_id: number;
  symbol: string;
  side: 'BUY' | 'SELL';
  entry_price: number;
  exit_price?: number;
  quantity: number;
  stop_loss?: number;
  take_profit?: number;
  profit_loss?: number;
  rr_ratio?: number;
  notes?: string;
  emotion?: string;
  screenshot_url?: string;
  trade_date?: string;
  created_at: string;
  updated_at: string;
}

export interface TradeAnalytics {
  total_trades: number;
  winning_trades: number;
  losing_trades: number;
  win_rate: number;
  average_rr: number;
  best_trade: number;
  worst_trade: number;
  total_profit: number;
}
