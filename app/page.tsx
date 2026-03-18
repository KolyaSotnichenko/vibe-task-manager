'use client';

import { useState } from 'react';
import { useTasks } from '@/lib/api/hooks/useTasks';
import { TaskList } from '@/components/tasks/TaskList';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  const [status, setStatus] = useState<
    'pending' | 'in_progress' | 'done' | undefined
  >();
  const { data, isLoading, isError, refetch } = useTasks(status);

  return (
    <main className="mx-auto max-w-xl space-y-4 p-6">
      <h1 className="text-xl font-semibold">Tasks</h1>

      <Select onValueChange={(v) => setStatus(v as any)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="in_progress">In Progress</SelectItem>
          <SelectItem value="done">Done</SelectItem>
        </SelectContent>
      </Select>

      {isLoading && (
        <div className="space-y-2">
          <Skeleton className="h-12" />
          <Skeleton className="h-12" />
          <Skeleton className="h-12" />
        </div>
      )}

      {isError && (
        <Alert>
          Failed to load tasks
          <div className="mt-2">
            <Button onClick={() => refetch()}>Retry</Button>
          </div>
        </Alert>
      )}

      {data && <TaskList tasks={data} />}
    </main>
  );
}
