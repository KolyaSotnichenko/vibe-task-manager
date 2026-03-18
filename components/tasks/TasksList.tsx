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
    return <div>Loading tasks...</div>;
  }

  if (isError) {
    return <div className="text-red-500">Failed to load tasks</div>;
  }

  return (
    <div className="space-y-4">
      <TaskStatusFilter value={status} onChange={setStatus} />
      <div className="space-y-2">
        {data && data.length > 0 ? (
          data.map((task) => <TaskItem key={task.id} task={task} />)
        ) : (
          <div className="text-muted-foreground">No tasks</div>
        )}
      </div>
    </div>
  );
}
