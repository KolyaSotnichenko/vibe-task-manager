'use client';

import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export type GoogleSyncSettingsFormProps = {
  enabled: boolean;
  onSubmit: (enabled: boolean) => void;
};

import React from 'react';

export function GoogleSyncSettingsForm({
  enabled,
  onSubmit,
}: GoogleSyncSettingsFormProps): React.ReactElement {
  const [syncEnabled, setSyncEnabled] = useState<boolean>(enabled);

  return (
    <form
      className="flex items-center justify-between gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(syncEnabled);
      }}
    >
      <div className="flex items-center gap-2">
        <Switch
          checked={syncEnabled}
          onCheckedChange={(v) => setSyncEnabled(v)}
        />
        <span>Enable task sync</span>
      </div>
      <Button type="submit">Save</Button>
    </form>
  );
}
