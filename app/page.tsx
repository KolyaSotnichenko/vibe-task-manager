'use client';

import { TasksList } from '@/components/tasks/TasksList';
import { TaskForm } from '@/components/tasks/TaskForm';
import { useState } from 'react';

export default function HomePage() {
  const [showForm, setShowForm] = useState<boolean>(false);

  return (
    <main className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Vibe Task Manager</h1>
      <button
        className="border rounded px-3 py-1"
        onClick={() => setShowForm((v) => !v)}
      >
        Create task
      </button>
      {showForm && (
        <TaskForm mode="create" onSuccess={() => setShowForm(false)} />
      )}
      <TasksList />
    </main>
  );
}
