'use client';

import { useState } from 'react';
import { useTasks } from '@/hooks/useTasks';
import { TaskStatus } from '@/lib/api/tasks';
import { TasksFilter, TasksFilterValue } from '@/components/tasks/TasksFilter';
import { TasksList } from '@/components/tasks/TasksList';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function TasksPage() {
  const [status, setStatus] = useState<TasksFilterValue>('all');
  const queryStatus = status === 'all' ? undefined : (status as TaskStatus);
  const { data, isLoading, isError, error } = useTasks(queryStatus);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-semibold">Tasks</h1>
      <TasksFilter value={status} onChange={setStatus} />

      {isLoading && <div>Loading...</div>}

      {isError && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      )}

      {data && <TasksList tasks={data} />}
    </div>
  );
}
