import { describe, it, expect, vi } from 'vitest';
import { getTime } from '../lib/api/client';

describe('getTime', () => {
  it('calls /time endpoint', async () => {
    const fetchMock = vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ now: 'test' }),
    } as Response);

    const result = await getTime();
    expect(fetchMock).toHaveBeenCalledWith('/time', expect.any(Object));
    expect(result).toEqual({ now: 'test' });
  });
});
