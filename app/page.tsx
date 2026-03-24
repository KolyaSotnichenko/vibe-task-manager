'use client';

import { useEffect, useState } from 'react';
import { getTime } from '@/lib/api/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function HomePage() {
  const [timezone, setTimezone] = useState<string>('');
  const [status, setStatus] = useState<Status>('idle');
  const [data, setData] = useState<unknown>(null);
  const [error, setError] = useState<string>('');

  const loadTime = async (tz: string): Promise<void> => {
    setStatus('loading');
    setError('');
    try {
      const result = await getTime(tz ? { timezone: tz } : undefined);
      setData(result);
      setStatus('success');
    } catch (e: unknown) {
      setStatus('error');
      setError(e instanceof Error ? e.message : 'Unknown error');
    }
  };

  useEffect(() => {
    void loadTime(timezone);
  }, [timezone]);

  return (
    <main className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Current Time</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Input
            placeholder="Timezone (optional)"
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
          />
          <Button
            onClick={() => void loadTime(timezone)}
            disabled={status === 'loading'}
          >
            Fetch time
          </Button>

          {status === 'loading' && <p>Loading...</p>}
          {status === 'error' && <p className="text-red-600">{error}</p>}
          {status === 'success' && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </CardContent>
      </Card>
    </main>
  );
}
