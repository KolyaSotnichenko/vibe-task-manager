export type ApiClientConfig = {
  baseUrl: string;
};

export function createApiClient(config: ApiClientConfig) {
  async function getTasks() {
    const res = await fetch(`${config.baseUrl}/tasks`);
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || 'Failed to load tasks');
    }
    return (await res.json()) as unknown;
  }

  return {
    config,
    getTasks,
  };
}
