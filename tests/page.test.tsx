import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import HomePage from '../app/page';
import * as api from '../lib/api/client';

describe('HomePage', () => {
  it('renders loading and success state', async () => {
    vi.spyOn(api, 'getTime').mockResolvedValueOnce({ now: 'test' });

    render(<HomePage />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    expect(await screen.findByText(/test/)).toBeInTheDocument();
  });

  it('renders error state', async () => {
    vi.spyOn(api, 'getTime').mockRejectedValueOnce(new Error('fail'));

    render(<HomePage />);
    const buttons = await screen.findAllByText(/fetch time/i);
    fireEvent.click(buttons[0]);
    expect(await screen.findByText(/fail/i)).toBeInTheDocument();
  });
});
