'use client';

import { useEffect, useState } from 'react';
import { createApiClient } from '@/lib/api/client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';

type TaskStatus = 'todo' | 'in_progress' | 'done';

type Task = {
  id: string;
  title: string;
  status: TaskStatus;
};

const api = createApiClient({ baseUrl: '' });

export default function TasksList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [status, setStatus] = useState<'all' | TaskStatus>('all');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    api
      .getTasks()
      .then((data) => {
        if (!mounted) return;
        setTasks(data as Task[]);
        setError(null);
      })
      .catch((e: unknown) => {
        if (!mounted) return;
        setError(e instanceof Error ? e.message : 'Unknown error');
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const filtered =
    status === 'all' ? tasks : tasks.filter((t) => t.status === status);

  if (loading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      <Select
        value={status}
        onValueChange={(v) => setStatus(v as 'all' | TaskStatus)}
      >
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Filter status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="todo">Todo</SelectItem>
          <SelectItem value="in_progress">In progress</SelectItem>
          <SelectItem value="done">Done</SelectItem>
        </SelectContent>
      </Select>

      <ul className="space-y-2">
        {filtered.map((task) => (
          <li key={task.id} className="rounded border p-2">
            <div className="flex justify-between">
              <span>{task.title}</span>
              <span className="text-sm text-muted-foreground">
                {task.status}
              </span>
            </div>
          </li>
        ))}
        {filtered.length === 0 && (
          <li className="text-sm text-muted-foreground">No tasks</li>
        )}
      </ul>
    </div>
  );
}
