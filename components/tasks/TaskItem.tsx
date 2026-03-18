import { useState } from 'react';
import type { Task } from '@/lib/api/queries/tasks';
import { TaskForm } from './TaskForm';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';

interface Props {
  task: Task;
}

export function TaskItem({ task }: Props) {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  if (isEditing) {
    return (
      <Card>
        <CardContent className="pt-6">
          <TaskForm
            mode="edit"
            initialValues={task}
            onSuccess={() => setIsEditing(false)}
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="font-medium leading-tight">{task.title}</div>
          <span className="text-xs uppercase text-muted-foreground">
            {task.status}
          </span>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {task.description && (
          <p className="text-sm text-muted-foreground">{task.description}</p>
        )}
      </CardContent>
      <CardFooter className="justify-end">
        <Button onClick={() => setIsEditing(true)}>Edit</Button>
      </CardFooter>
    </Card>
  );
}
