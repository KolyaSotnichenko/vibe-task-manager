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
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Title</label>
        <Input
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isLoading}
          aria-invalid={Boolean(errors.title)}
        />
        {errors.title && (
          <span className="text-xs text-destructive">{errors.title}</span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Description</label>
        <Textarea
          placeholder="Optional description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isLoading}
          rows={3}
        />
      </div>

      {formError && <div className="text-sm text-destructive">{formError}</div>}

      <div className="flex justify-end">
        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading
            ? 'Saving…'
            : mode === 'create'
              ? 'Create task'
              : 'Update task'}
        </Button>
      </div>
    </div>
  );
}
