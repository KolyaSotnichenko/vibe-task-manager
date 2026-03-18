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

import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { components } from '../../../src/shared/api/generated/types';
type CreateTaskDto = components['schemas']['CreateTaskDto'];
type UpdateTaskDto = components['schemas']['UpdateTaskDto'];

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateTaskDto) => {
      return apiClient.tasks.tasksControllerCreate({ requestBody: data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
}

export function useUpdateTask(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateTaskDto) => {
      return apiClient.tasks.tasksControllerUpdate({ id, requestBody: data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
}
