import { useQuery } from '@tanstack/react-query';
import { createApiClient } from '../client';
import { env } from '@/lib/config/env';

type TaskStatus = 'pending' | 'in_progress' | 'done';

const api = createApiClient({ baseUrl: env.NEXT_PUBLIC_API_BASE_URL });

export function useTasks(status?: TaskStatus) {
  return useQuery({
    queryKey: ['tasks', status],
    queryFn: () => api.tasks.getTasks(status),
  });
}
