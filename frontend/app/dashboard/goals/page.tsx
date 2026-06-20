'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import api from '@/lib/api';

interface Goal {
  id: number;
  user_id: number;
  goal_name: string;
  target_value: number;
  current_value: number;
  status: string;
}

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    goal_name: '',
    target_value: 0,
    current_value: 0,
    status: 'active',
  });

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const response = await api.get('/api/goal/');
      setGoals(response.data);
    } catch (error) {
      console.error('Error fetching goals:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/api/goal/', formData);
      setFormData({ goal_name: '', target_value: 0, current_value: 0, status: 'active' });
      setShowForm(false);
      await fetchGoals();
    } catch (error) {
      console.error('Error adding goal:', error);
    }
  };

  const handleDeleteGoal = async (goalId: number) => {
    if (!confirm('Are you sure?')) return;
    try {
      await api.delete(`/api/goal/${goalId}`);
      await fetchGoals();
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
  };

  if (loading) return <div className="text-white">Loading...</div>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Goals</h1>
          <p className="mt-2 text-gray-400">Set and review your trading milestones to stay aligned with your plan.</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} variant="primary">
          {showForm ? 'Cancel' : 'Add Goal'}
        </Button>
      </div>

      {showForm && (
        <div className="rounded-3xl border border-gray-800 bg-gray-900 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-white mb-4">Create New Goal</h2>
          <form onSubmit={handleAddGoal} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300">Goal Name</label>
              <Input
                type="text"
                value={formData.goal_name}
                onChange={(e) => setFormData({ ...formData, goal_name: e.target.value })}
                placeholder="e.g., Build trading reserve"
                className="mt-1"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300">Target Value ($)</label>
                <Input
                  type="number"
                  value={formData.target_value}
                  onChange={(e) => setFormData({ ...formData, target_value: parseFloat(e.target.value) })}
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Current Value ($)</label>
                <Input
                  type="number"
                  value={formData.current_value}
                  onChange={(e) => setFormData({ ...formData, current_value: parseFloat(e.target.value) })}
                  className="mt-1"
                />
              </div>
            </div>
            <Button type="submit" variant="primary">
              Create Goal
            </Button>
          </form>
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-3">
        {goals.map((goal) => {
          const progress = (goal.current_value / goal.target_value) * 100;
          const status = progress >= 100 ? 'Complete' : progress >= 50 ? 'On Track' : 'In Progress';

          return (
            <div key={goal.id} className="rounded-3xl border border-gray-800 bg-gray-900 p-6 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-white">{goal.goal_name}</h2>
                  <p className="mt-2 text-gray-400">Status: {status}</p>
                </div>
                <button
                  onClick={() => handleDeleteGoal(goal.id)}
                  className="text-red-400 hover:text-red-300 text-sm"
                >
                  ✕
                </button>
              </div>
              <div className="mt-6 space-y-2 text-gray-300">
                <p>Target Value: ${goal.target_value.toLocaleString()}</p>
                <p>Current Value: ${goal.current_value.toLocaleString()}</p>
                <div className="mt-4 w-full bg-gray-800 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  ></div>
                </div>
                <p className="text-sm">{progress.toFixed(1)}% Complete</p>
              </div>
            </div>
          );
        })}
      </div>

      {goals.length === 0 && !showForm && (
        <div className="rounded-3xl border border-gray-800 bg-gray-900 p-6 shadow-sm text-center">
          <p className="text-gray-400">No goals yet. Create one to get started!</p>
        </div>
      )}
    </div>
  );
}
            <div className="mt-5 h-2 overflow-hidden rounded-full bg-gray-800">
              <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500" style={{ width: `${Math.min(100, (goal.current / goal.target) * 100)}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
