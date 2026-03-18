import { createApiClient } from './client';
import { env } from '@/lib/config/env';

export type TaskStatus = 'todo' | 'in_progress' | 'done';

export type Task = {
  id: string;
  title: string;
  status: TaskStatus;
};

const api = createApiClient({ baseUrl: env.NEXT_PUBLIC_API_URL });

export async function getTasks(status?: TaskStatus): Promise<Task[]> {
  const params = status ? { status } : undefined;
  return api.request<Task[]>('/tasks', params);
}
