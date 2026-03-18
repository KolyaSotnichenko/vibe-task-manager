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
      tasksControllerCreate: async (params: { requestBody: unknown }) => {
        const res = await fetch(`${config.baseUrl}/tasks`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(params.requestBody),
        });
        if (!res.ok) {
          throw new Error('Failed to create task');
        }
        return (await res.json()) as unknown;
      },
      tasksControllerUpdate: async (params: {
        id: string;
        requestBody: unknown;
      }) => {
        const res = await fetch(`${config.baseUrl}/tasks/${params.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(params.requestBody),
        });
        if (!res.ok) {
          throw new Error('Failed to update task');
        }
        return (await res.json()) as unknown;
      },
    },
  };
}

export const apiClient = createApiClient({ baseUrl: '' });
