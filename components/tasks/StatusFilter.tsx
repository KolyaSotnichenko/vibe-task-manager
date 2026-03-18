'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { TaskStatus } from '@/lib/api/queries/useTasks';

type Props = {
  value: TaskStatus | 'all';
  onChange: (value: TaskStatus | 'all') => void;
};

export function StatusFilter({ value, onChange }: Props) {
  return (
    <Select
      value={value}
      onValueChange={(v) => onChange(v as TaskStatus | 'all')}
    >
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        <SelectItem value="todo">Todo</SelectItem>
        <SelectItem value="in_progress">In Progress</SelectItem>
        <SelectItem value="done">Done</SelectItem>
      </SelectContent>
    </Select>
  );
}
