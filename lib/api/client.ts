export type ApiClientConfig = {
  baseUrl: string;
};

export function createApiClient(config: ApiClientConfig) {
  return {
    tasks: {
      tasksControllerFindAll: async (params: { status?: string }) => {
        const query = params.status ? `?status=${params.status}` : '';
        const res = await fetch(`${config.baseUrl}/tasks${query}`);
        if (!res.ok) {
          throw new Error('Failed to fetch tasks');
        }
        return (await res.json()) as unknown;
      },
    },
  };
}

export const apiClient = createApiClient({ baseUrl: '' });
