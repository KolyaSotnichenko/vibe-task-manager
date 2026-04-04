'use client';

import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';

type TaskStatus = 'pending' | 'in_progress' | 'done';

type Task = {
  id?: string;
  title?: string;
  description?: string;
  status?: TaskStatus;
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [statusFilter, setStatusFilter] = useState<'all' | TaskStatus>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch('/tasks')
      .then(async (res) => {
        if (!res.ok) throw new Error('Failed to load tasks');
        return res.json();
      })
      .then((data: Task[]) => {
        if (!cancelled) setTasks(data);
      })
      .catch((e: Error) => {
        if (!cancelled) setError(e.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredTasks = useMemo(() => {
    if (statusFilter === 'all') return tasks;
    return tasks.filter((t) => t.status === statusFilter);
  }, [tasks, statusFilter]);

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-xl font-semibold">Tasks</h1>

      <div className="flex gap-2">
        <Button
          variant={statusFilter === 'all' ? 'default' : 'outline'}
          onClick={() => setStatusFilter('all')}
        >
          All
        </Button>
        <Button
          variant={statusFilter === 'pending' ? 'default' : 'outline'}
          onClick={() => setStatusFilter('pending')}
        >
          Pending
        </Button>
        <Button
          variant={statusFilter === 'in_progress' ? 'default' : 'outline'}
          onClick={() => setStatusFilter('in_progress')}
        >
          In progress
        </Button>
        <Button
          variant={statusFilter === 'done' ? 'default' : 'outline'}
          onClick={() => setStatusFilter('done')}
        >
          Done
        </Button>
      </div>

      {loading && <p>Loading tasks...</p>}

      {error && (
        <div className="text-red-600">
          <p>{error}</p>
          <Button onClick={() => location.reload()}>Retry</Button>
        </div>
      )}

      {!loading && !error && filteredTasks.length === 0 && (
        <p>No tasks with selected status.</p>
      )}

      {!loading && !error && filteredTasks.length > 0 && (
        <ul className="space-y-2">
          {filteredTasks.map((task, idx) => (
            <li key={task.id ?? idx} className="border rounded p-3">
              <div className="font-medium">{task.title ?? 'Untitled'}</div>
              {task.description && (
                <div className="text-sm text-muted-foreground">
                  {task.description}
                </div>
              )}
              {task.status && (
                <div className="text-xs mt-1">Status: {task.status}</div>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
