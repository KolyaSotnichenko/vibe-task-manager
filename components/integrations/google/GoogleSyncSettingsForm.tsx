'use client';

import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

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
    <Card>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(syncEnabled);
        }}
      >
        <CardHeader className="pb-3">
          <CardTitle>Sync settings</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Switch
              checked={syncEnabled}
              onCheckedChange={(v) => setSyncEnabled(v)}
            />
            <span className="text-sm">Enable task sync</span>
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          <Button type="submit">Save changes</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
