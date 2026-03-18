'use client';

import { useState } from 'react';
import { useTasks, type TaskStatus } from '@/lib/api/queries/useTasks';
import { StatusFilter } from '@/components/tasks/StatusFilter';
import { TaskList } from '@/components/tasks/TaskList';

export default function HomePage() {
  const [status, setStatus] = useState<TaskStatus | 'all'>('all');
  const { data, isLoading, isError } = useTasks(
    status === 'all' ? undefined : status,
  );

  return (
    <main className="p-6 flex flex-col gap-4 max-w-xl mx-auto">
      <h1 className="text-xl font-semibold">Vibe Task Manager</h1>
      <StatusFilter value={status} onChange={setStatus} />
      <TaskList tasks={data} isLoading={isLoading} isError={isError} />
    </main>
  );
}
