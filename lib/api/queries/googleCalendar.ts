import { useQuery, useMutation } from '@tanstack/react-query';
// apiClient will be used once Google integration endpoints are available

export type GoogleIntegrationStatus = {
  connected: boolean;
  syncEnabled?: boolean;
  lastSyncAt?: string | null;
};

export function useGoogleIntegrationStatus() {
  return useQuery<GoogleIntegrationStatus>({
    queryKey: ['googleIntegrationStatus'],
    queryFn: async () => {
      // Placeholder until backend exposes endpoint
      return { connected: false };
    },
  });
}

export function useConnectGoogle() {
  return useMutation({
    mutationFn: async () => {
      // OAuth redirect handled by backend
      window.location.href = '/api/auth/google';
    },
  });
}

export function useDisconnectGoogle() {
  return useMutation({
    mutationFn: async () => {
      return;
    },
  });
}

export function useUpdateGoogleSyncSettings() {
  return useMutation({
    mutationFn: async (enabled: boolean) => {
      return enabled;
    },
  });
}
