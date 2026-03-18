'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createTaskSchema } from '@/lib/validation/task.schema';
import {
  useCreateTask,
  useUpdateTask,
  type Task,
} from '@/lib/api/queries/tasks';
import type { ZodIssue } from 'zod';

interface Props {
  mode: 'create' | 'edit';
  initialValues?: Task;
  onSuccess?: () => void;
}

export function TaskForm({ mode, initialValues, onSuccess }: Props) {
  const [title, setTitle] = useState<string>(initialValues?.title ?? '');
  const [description, setDescription] = useState<string>(
    initialValues?.description ?? '',
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);

  const createMutation = useCreateTask();
  const updateMutation = useUpdateTask(initialValues?.id ?? '');

  const isLoading = createMutation.isPending || updateMutation.isPending;

  const handleSubmit = async () => {
    setErrors({});
    setFormError(null);

    const parsed = createTaskSchema.safeParse({ title, description });
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((issue: ZodIssue) => {
        const key = issue.path[0];
        if (typeof key === 'string') fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      if (mode === 'create') {
        await createMutation.mutateAsync(parsed.data);
      } else if (initialValues) {
        await updateMutation.mutateAsync(parsed.data);
      }
      onSuccess?.();
      setTitle('');
      setDescription('');
    } catch {
      setFormError('Failed to submit form');
    }
  };

  return (
    <div className="border rounded p-4 flex flex-col gap-3">
      <div>
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isLoading}
          aria-invalid={Boolean(errors.title)}
        />
        {errors.title && (
          <div className="text-sm text-red-500">{errors.title}</div>
        )}
      </div>
      <div>
        <Textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isLoading}
        />
      </div>
      {formError && <div className="text-sm text-red-500">{formError}</div>}
      <Button onClick={handleSubmit} disabled={isLoading}>
        {isLoading
          ? 'Saving...'
          : mode === 'create'
            ? 'Create task'
            : 'Update task'}
      </Button>
    </div>
  );
}
