import { apiClient } from '../client';

export type TaskStatus = 'pending' | 'in_progress' | 'done';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
}

export const tasksQueryKey = (status?: TaskStatus) =>
  ['tasks', status] as const;

export async function getTasks(status?: TaskStatus): Promise<Task[]> {
  const response = await apiClient.tasks.tasksControllerFindAll({ status });
  return response as unknown as Task[];
}
