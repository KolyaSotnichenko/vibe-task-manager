export type ApiClientConfig = {
  baseUrl: string;
};

export function createApiClient(config: ApiClientConfig) {
  async function getTasks(status?: 'pending' | 'in_progress' | 'done') {
    const url = new URL('/tasks', config.baseUrl);
    if (status) url.searchParams.set('status', status);
    const res = await fetch(url.toString());
    if (!res.ok) throw new Error('Failed to load tasks');
    return (await res.json()) as Array<{
      id?: string;
      title?: string;
      description?: string;
      status?: string;
    }>;
  }

  return {
    config,
    tasks: {
      getTasks,
    },
  };
}
