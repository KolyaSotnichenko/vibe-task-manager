'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  getTasks,
  tasksQueryKey,
  type TaskStatus,
} from '@/lib/api/queries/tasks';
import { TaskItem } from './TaskItem';
import { TaskStatusFilter } from './TaskStatusFilter';

export function TasksList() {
  const [status, setStatus] = useState<TaskStatus | undefined>(undefined);

  const { data, isLoading, isError } = useQuery({
    queryKey: tasksQueryKey(status),
    queryFn: () => getTasks(status),
  });

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        <div className="h-10 rounded-md bg-muted" />
        <div className="h-24 rounded-md bg-muted" />
        <div className="h-24 rounded-md bg-muted" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-md border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm">
        Failed to load tasks
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <TaskStatusFilter value={status} onChange={setStatus} />

      {data && data.length > 0 ? (
        <div className="flex flex-col gap-2">
          {data.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      ) : (
        <div className="rounded-md border bg-card px-4 py-8 text-center text-sm text-muted-foreground">
          No tasks yet
        </div>
      )}
    </div>
  );
}
