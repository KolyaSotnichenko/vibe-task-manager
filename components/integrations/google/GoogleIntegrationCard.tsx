'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
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
      <CardHeader className="pb-3">
        <CardTitle>Google Calendar</CardTitle>
        <CardDescription>Sync your tasks with Google Calendar</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground">
          {status.connected
            ? 'Your account is connected and events can be synced.'
            : 'Connect your Google account to enable calendar sync.'}
        </p>
      </CardContent>
      <CardFooter className="justify-end">
        {status.connected ? (
          <Button onClick={onDisconnect}>Disconnect</Button>
        ) : (
          <Button onClick={onConnect}>Connect Google</Button>
        )}
      </CardFooter>
    </Card>
  );
}
