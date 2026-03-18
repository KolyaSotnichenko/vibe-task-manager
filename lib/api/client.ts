export type ApiClientConfig = {
  baseUrl: string;
};

export function createApiClient(config: ApiClientConfig) {
  async function request<T>(
    path: string,
    params?: Record<string, string>,
  ): Promise<T> {
    const url = new URL(path, config.baseUrl);
    if (params) {
      Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
    }
    const res = await fetch(url.toString(), { credentials: 'include' });
    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }
    return (await res.json()) as T;
  }

  return { config, request };
}
