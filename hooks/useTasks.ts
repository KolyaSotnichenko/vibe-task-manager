import { useQuery } from '@tanstack/react-query';
import { getTasks, Task, TaskStatus } from '@/lib/api/tasks';

export function useTasks(status?: TaskStatus) {
  return useQuery<Task[], Error>({
    queryKey: ['tasks', status ?? 'all'],
    queryFn: () => getTasks(status),
  });
}
