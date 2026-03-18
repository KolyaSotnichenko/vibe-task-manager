import { TasksList } from '@/components/tasks/TasksList';

export default function HomePage() {
  return (
    <main className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Vibe Task Manager</h1>
      <TasksList />
    </main>
  );
}
