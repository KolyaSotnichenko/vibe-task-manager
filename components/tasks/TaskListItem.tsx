type Task = {
  id?: string;
  title?: string;
  description?: string;
  status?: string;
};

export function TaskListItem({ task }: { task: Task }) {
  return (
    <li className="rounded border p-3">
      <div className="font-medium">{task.title}</div>
      {task.description && (
        <div className="text-sm text-gray-600">{task.description}</div>
      )}
      {task.status && (
        <div className="mt-1 text-xs uppercase text-gray-500">
          {task.status}
        </div>
      )}
    </li>
  );
}
