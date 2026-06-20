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
