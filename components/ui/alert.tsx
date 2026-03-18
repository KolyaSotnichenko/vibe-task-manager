'use client';

import * as React from 'react';

export function Alert(
  props: React.PropsWithChildren<{ variant?: 'destructive' }>,
) {
  return <div>{props.children}</div>;
}

export function AlertDescription(props: React.PropsWithChildren) {
  return <div>{props.children}</div>;
}
