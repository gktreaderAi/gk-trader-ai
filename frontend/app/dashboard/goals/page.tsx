'use client';

const goals = [
  { id: '1', name: 'Build trading reserve', target: 50000, current: 32000, status: 'In Progress' },
  { id: '2', name: 'Improve win rate', target: 70, current: 72, status: 'On Track' },
  { id: '3', name: 'Reduce drawdown', target: 10, current: 12.1, status: 'Review' },
];

export default function GoalsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Goals</h1>
        <p className="mt-2 text-gray-400">Set and review your trading milestones to stay aligned with your plan.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {goals.map((goal) => (
          <div key={goal.id} className="rounded-3xl border border-gray-800 bg-gray-900 p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-white">{goal.name}</h2>
                <p className="mt-2 text-gray-400">Status: {goal.status}</p>
              </div>
              <span className="rounded-full bg-blue-500/15 px-3 py-1 text-sm text-blue-200">{goal.status}</span>
            </div>
            <div className="mt-6 space-y-2 text-gray-300">
              <p>Target Value: ${goal.target.toLocaleString()}</p>
              <p>Current Value: ${goal.current.toLocaleString()}</p>
            </div>
            <div className="mt-5 h-2 overflow-hidden rounded-full bg-gray-800">
              <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500" style={{ width: `${Math.min(100, (goal.current / goal.target) * 100)}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
