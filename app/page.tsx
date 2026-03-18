'use client';

import { TasksList } from '@/components/tasks/TasksList';
import { TaskForm } from '@/components/tasks/TaskForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';

export default function HomePage() {
  const [showForm, setShowForm] = useState<boolean>(false);

  return (
    <main className="flex flex-col gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Vibe Task Manager</CardTitle>
          <Button onClick={() => setShowForm((v) => !v)}>
            {showForm ? 'Close' : 'New task'}
          </Button>
        </CardHeader>
        {showForm && (
          <CardContent>
            <TaskForm mode="create" onSuccess={() => setShowForm(false)} />
          </CardContent>
        )}
      </Card>

      <TasksList />
    </main>
  );
}
