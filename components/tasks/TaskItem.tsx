import { useState } from 'react';
import type { Task } from '@/lib/api/queries/tasks';
import { TaskForm } from './TaskForm';
import { Button } from '@/components/ui/button';

interface Props {
  task: Task;
}

export function TaskItem({ task }: Props) {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  if (isEditing) {
    return (
      <TaskForm
        mode="edit"
        initialValues={task}
        onSuccess={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div className="rounded border p-3">
      <div className="font-medium">{task.title}</div>
      {task.description && (
        <div className="text-sm text-muted-foreground">{task.description}</div>
      )}
      <div className="mt-1 text-xs uppercase text-muted-foreground">
        {task.status}
      </div>
      <div className="mt-2">
        <Button onClick={() => setIsEditing(true)}>Edit</Button>
      </div>
    </div>
  );
}
