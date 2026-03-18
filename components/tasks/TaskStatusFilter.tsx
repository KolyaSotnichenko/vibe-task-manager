import { Button } from '@/components/ui/button';
import type { TaskStatus } from '@/lib/api/queries/tasks';

interface Props {
  value?: TaskStatus;
  onChange: (value?: TaskStatus) => void;
}

const statuses: Array<{ label: string; value?: TaskStatus }> = [
  { label: 'All' },
  { label: 'Pending', value: 'pending' },
  { label: 'In Progress', value: 'in_progress' },
  { label: 'Done', value: 'done' },
];

export function TaskStatusFilter({ value, onChange }: Props) {
  return (
    <div className="flex gap-2">
      {statuses.map((s) => (
        <Button
          key={s.label}
          className={
            value === s.value ? undefined : 'bg-white text-black border'
          }
          onClick={() => onChange(s.value)}
        >
          {s.label}
        </Button>
      ))}
    </div>
  );
}
