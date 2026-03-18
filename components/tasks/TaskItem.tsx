import type { Task } from '@/lib/api/queries/tasks';

interface Props {
  task: Task;
}

export function TaskItem({ task }: Props) {
  return (
    <div className="rounded border p-3">
      <div className="font-medium">{task.title}</div>
      {task.description && (
        <div className="text-sm text-muted-foreground">{task.description}</div>
      )}
      <div className="mt-1 text-xs uppercase text-muted-foreground">
        {task.status}
      </div>
    </div>
  );
}
