'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TaskStatus } from '@/lib/api/tasks';

export type TasksFilterValue = TaskStatus | 'all';

export function TasksFilter({
  value,
  onChange,
}: {
  value: TasksFilterValue;
  onChange: (value: TasksFilterValue) => void;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        <SelectItem value="todo">Todo</SelectItem>
        <SelectItem value="in_progress">In progress</SelectItem>
        <SelectItem value="done">Done</SelectItem>
      </SelectContent>
    </Select>
  );
}
