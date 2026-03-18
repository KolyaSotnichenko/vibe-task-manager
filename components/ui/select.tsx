'use client';

import * as React from 'react';

export function Select(
  props: React.PropsWithChildren<{
    value?: string;
    onValueChange?: (v: string) => void;
  }>,
) {
  return <div>{props.children}</div>;
}

export function SelectTrigger(
  props: React.PropsWithChildren<{ className?: string }>,
) {
  return <button className={props.className}>{props.children}</button>;
}

export function SelectValue(props: { placeholder?: string }) {
  return <span>{props.placeholder}</span>;
}

export function SelectContent(props: React.PropsWithChildren) {
  return <div>{props.children}</div>;
}

export function SelectItem(props: React.PropsWithChildren<{ value: string }>) {
  return <div>{props.children}</div>;
}
