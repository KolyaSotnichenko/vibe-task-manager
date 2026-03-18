'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GoogleIntegrationStatus } from '@/lib/api/queries/googleCalendar';

export type GoogleIntegrationCardProps = {
  status: GoogleIntegrationStatus;
  onConnect: () => void;
  onDisconnect: () => void;
};

import React from 'react';

export function GoogleIntegrationCard({
  status,
  onConnect,
  onDisconnect,
}: GoogleIntegrationCardProps): React.ReactElement {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Google Calendar</CardTitle>
        <CardDescription>Sync your tasks with Google Calendar</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {status.connected ? (
          <Button onClick={onDisconnect}>Disconnect</Button>
        ) : (
          <Button onClick={onConnect}>Connect Google</Button>
        )}
      </CardContent>
    </Card>
  );
}
