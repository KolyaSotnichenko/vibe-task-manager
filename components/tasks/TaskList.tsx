import { TaskListItem } from './TaskListItem';

type Task = {
  id?: string;
  title?: string;
  description?: string;
  status?: string;
};

export function TaskList({ tasks }: { tasks: Task[] }) {
  if (tasks.length === 0) {
    return (
      <div className="text-gray-500">No tasks found for selected status</div>
    );
  }

  return (
    <ul className="space-y-2">
      {tasks.map((task, idx) => (
        <TaskListItem key={task.id ?? idx} task={task} />
      ))}
    </ul>
  );
}
