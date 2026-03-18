import { useQuery } from '@tanstack/react-query';
import { createApiClient } from '../client';
import { env } from '../../config/env';

export type TaskStatus = 'todo' | 'in_progress' | 'done';

const api = createApiClient({ baseUrl: env.API_URL });

export function useTasks(status?: TaskStatus) {
  return useQuery({
    queryKey: ['tasks', status],
    queryFn: () => api.getTasks(status),
  });
}
