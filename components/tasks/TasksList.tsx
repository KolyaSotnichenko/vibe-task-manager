'use client';

import { Task } from '@/lib/api/tasks';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function TasksList({ tasks }: { tasks: Task[] }) {
  if (tasks.length === 0) {
    return <div className="text-sm text-muted-foreground">No tasks found.</div>;
  }

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <Card key={task.id} className="p-4 flex items-center justify-between">
          <div>{task.title}</div>
          <Badge>{task.status}</Badge>
        </Card>
      ))}
    </div>
  );
}
