import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';

type Task = {
  id: string;
  title: string;
  status: string;
};

type Props = {
  tasks?: Task[];
  isLoading: boolean;
  isError: boolean;
};

export function TaskList({ tasks, isLoading, isError }: Props) {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-2">
        <Skeleton className="h-10" />
        <Skeleton className="h-10" />
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertDescription>Не вдалося завантажити задачі</AlertDescription>
      </Alert>
    );
  }

  if (!tasks || tasks.length === 0) {
    return <p>No tasks found.</p>;
  }

  return (
    <div className="flex flex-col gap-2">
      {tasks.map((task) => (
        <Card key={task.id}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {task.title}
              <Badge variant="secondary">{task.status}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent />
        </Card>
      ))}
    </div>
  );
}
