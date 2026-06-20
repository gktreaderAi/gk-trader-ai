'use client';

import { useEffect, useMemo, useState } from 'react';
import api from '@/lib/api';
import { Lesson, QuizResponse, LessonProgress } from '@/types';
import { formatDate } from '@/lib/utils';
import { Button } from '@/components/Button';

export default function TradingTeacherPage() {
  const [dailyLesson, setDailyLesson] = useState<Lesson | null>(null);
  const [quiz, setQuiz] = useState<QuizResponse | null>(null);
  const [progress, setProgress] = useState<LessonProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.get('/api/teacher/daily'), api.get('/api/teacher/progress')])
      .then(([lessonRes, progressRes]) => {
        setDailyLesson(lessonRes.data);
        setProgress(progressRes.data);
        return api.get(`/api/teacher/quiz?lesson_id=${lessonRes.data.id}`);
      })
      .then((quizRes) => setQuiz(quizRes.data))
      .catch(() => {
        setDailyLesson(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleProgressUpdate = async (lessonId: number, completed: boolean) => {
    if (!dailyLesson) return;

    const update = {
      user_id: 1,
      lesson_id: lessonId,
      progress: completed ? 100 : 50,
      completed,
    };

    const response = await api.post('/api/teacher/progress', update);
    setProgress((prev) => {
      const existing = prev.find((entry) => entry.lesson_id === lessonId);
      if (existing) {
        return prev.map((entry) =>
          entry.lesson_id === lessonId ? response.data : entry
        );
      }
      return [...prev, response.data];
    });
  };

  const lessonProgress = useMemo(() => {
    if (!dailyLesson) return null;
    return progress.find((entry) => entry.lesson_id === dailyLesson.id) ?? null;
  }, [dailyLesson, progress]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">
        Loading Trading Teacher…
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="rounded-3xl border border-gray-800 bg-gray-900 p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-white">Trading Teacher AI</h1>
        <p className="mt-2 text-gray-400">Daily lessons, quizzes, and progress tracking for smarter trading.</p>
      </header>

      {dailyLesson ? (
        <section className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="rounded-3xl border border-gray-800 bg-gray-900 p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-blue-400">Daily Lesson</p>
                <h2 className="mt-3 text-2xl font-semibold text-white">{dailyLesson.title}</h2>
                <p className="mt-3 text-gray-400">{dailyLesson.description}</p>
              </div>
              <div className="rounded-2xl bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
                {dailyLesson.category.replace('_', ' ').toUpperCase()}
              </div>
            </div>
            <article className="mt-6 space-y-4 text-gray-300 leading-7">{dailyLesson.content}</article>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button onClick={() => handleProgressUpdate(dailyLesson.id, true)}>
                Mark Completed
              </Button>
              <Button variant="secondary" onClick={() => handleProgressUpdate(dailyLesson.id, false)}>
                Save Progress
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl border border-gray-800 bg-gray-900 p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-white">Lesson Progress</h3>
              <p className="mt-3 text-gray-400">Track completion and review your latest progress.</p>
              <div className="mt-6 space-y-3">
                <div className="rounded-2xl bg-gray-950 p-4 text-sm text-gray-300">
                  Progress: {lessonProgress ? `${lessonProgress.progress}%` : 'Not started'}
                </div>
                <div className="rounded-2xl bg-gray-950 p-4 text-sm text-gray-300">
                  Status: {lessonProgress?.completed ? 'Completed' : 'In progress'}
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-gray-800 bg-gray-900 p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-white">Quick Quiz</h3>
              <p className="mt-3 text-gray-400">Test your knowledge with a short quiz.</p>
              <div className="mt-6 space-y-4">
                {quiz?.questions.map((question, index) => (
                  <div key={index} className="rounded-2xl bg-gray-950 p-4">
                    <p className="font-medium text-white">{index + 1}. {question.question}</p>
                    <ul className="mt-3 space-y-2 text-gray-300">
                      {question.options.map((option) => (
                        <li key={option} className="rounded-xl bg-gray-900 px-3 py-2">
                          {option}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className="rounded-3xl border border-gray-800 bg-gray-900 p-6 shadow-sm text-gray-300">
          No lesson available for today.
        </div>
      )}
    </div>
  );
}
