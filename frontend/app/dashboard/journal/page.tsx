'use client';

import { useMemo } from 'react';
import { formatDate } from '@/lib/utils';

const journalEntries = [
  {
    id: '1',
    title: 'Improved discipline on morning setup',
    content: 'Stayed patient during the rush and only entered after the breakout confirmed.',
    emotion: 'Focused',
    created_at: '2026-06-18T08:30:00Z',
  },
  {
    id: '2',
    title: 'Missed exit on GOOGL',
    content: 'Hesitated before taking profits and lost momentum on the trade.',
    emotion: 'Frustrated',
    created_at: '2026-06-17T14:15:00Z',
  },
];

export default function TradeJournalPage() {
  const entries = useMemo(() => journalEntries, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Trade Journal</h1>
        <p className="mt-2 text-gray-400">Track your daily market observations, lessons, and emotional state.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {entries.map((entry) => (
          <article key={entry.id} className="rounded-3xl border border-gray-800 bg-gray-900 p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-white">{entry.title}</h2>
                <p className="mt-2 text-sm text-gray-400">{formatDate(entry.created_at)}</p>
              </div>
              <span className="rounded-full bg-blue-500/15 px-4 py-2 text-sm text-blue-200">{entry.emotion}</span>
            </div>
            <p className="mt-5 text-gray-300 leading-7">{entry.content}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
