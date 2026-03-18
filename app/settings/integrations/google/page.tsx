'use client';

import { GoogleIntegrationCard } from 'components/integrations/google/GoogleIntegrationCard';
import { GoogleSyncSettingsForm } from 'components/integrations/google/GoogleSyncSettingsForm';
import {
  useGoogleIntegrationStatus,
  useConnectGoogle,
  useDisconnectGoogle,
  useUpdateGoogleSyncSettings,
} from '@/lib/api/queries/googleCalendar';

import React from 'react';

export default function GoogleIntegrationPage(): React.ReactElement {
  const statusQuery = useGoogleIntegrationStatus();
  const connectMutation = useConnectGoogle();
  const disconnectMutation = useDisconnectGoogle();
  const updateSyncMutation = useUpdateGoogleSyncSettings();

  if (statusQuery.isLoading) {
    return <div className="p-8">Loading...</div>;
  }

  if (statusQuery.isError || !statusQuery.data) {
    return <div className="p-8">Failed to load integration status</div>;
  }

  const status = statusQuery.data;

  return (
    <div className="container mx-auto max-w-2xl py-8 flex flex-col gap-6">
      <GoogleIntegrationCard
        status={status}
        onConnect={() => connectMutation.mutate()}
        onDisconnect={() => disconnectMutation.mutate()}
      />

      {status.connected && (
        <GoogleSyncSettingsForm
          enabled={Boolean(status.syncEnabled)}
          onSubmit={(enabled) => updateSyncMutation.mutate(enabled)}
        />
      )}
    </div>
  );
}
