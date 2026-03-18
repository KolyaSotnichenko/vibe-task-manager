export type ApiClientConfig = {
  baseUrl: string;
};

export function createApiClient(config: ApiClientConfig) {
  type TaskStatus = 'todo' | 'in_progress' | 'done';
  type Task = {
    id: string;
    title: string;
    status: TaskStatus;
  };

  const mockTasks: Task[] = [
    { id: '1', title: 'First task', status: 'todo' },
    { id: '2', title: 'Second task', status: 'in_progress' },
    { id: '3', title: 'Done task', status: 'done' },
  ];

  async function getTasks(status?: TaskStatus): Promise<Task[]> {
    await new Promise((r) => setTimeout(r, 500));
    if (!status) return mockTasks;
    return mockTasks.filter((t) => t.status === status);
  }

  return {
    config,
    getTasks,
  };
}
