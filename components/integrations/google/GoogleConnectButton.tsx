'use client';

import { Button } from '@/components/ui/button';

export type GoogleConnectButtonProps = {
  onClick: () => void;
};

import React from 'react';

export function GoogleConnectButton({
  onClick,
}: GoogleConnectButtonProps): React.ReactElement {
  return <Button onClick={onClick}>Connect Google Calendar</Button>;
}
