import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { App } from '../App';
import { ErrorBoundary } from '../components/ErrorBoundary';
import type { PokemonResponse } from '../types/types';

const mockResponse: PokemonResponse = {
  data: [
    { id: '1', name: 'Aggron', images: { small: 'url', large: 'url' } },
    { id: '2', name: 'Bulbasaur', images: { small: 'url', large: 'url' } },
  ],
  page: 1,
  pageSize: 5,
  count: 2,
  totalCount: 19500,
};

export const mockFetch = (mockResponse: object) => {
  vi.spyOn(globalThis, 'fetch').mockResolvedValue({
    json: async () => mockResponse,
  } as Response);
};

describe('Rendering Tests', () => {
  afterEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  test('1.1 Renders correct number of items when data is provided', async () => {
    mockFetch(mockResponse);

    render(<App />);
    await waitFor(() => {
      expect(screen.getAllByText(/Aggron|Bulbasaur/)).toHaveLength(2);
    });
  });

  test('1.2 Displays "no results" message when data array is empty', async () => {
    const mockResponse: PokemonResponse = {
      data: [],
      page: 0,
      pageSize: 0,
      count: 0,
      totalCount: 0,
    };
    mockFetch(mockResponse);

    render(<App />);
    await waitFor(() => {
      expect(screen.getByText(/no data found/i)).toBeInTheDocument();
    });
  });

  test('1.3 Shows loading state while fetching data', async () => {
    let resolveFetch: ((value: Response) => void) | undefined;
    const fetchPromise = new Promise<Response>((resolve) => {
      resolveFetch = resolve;
    });
    vi.spyOn(globalThis, 'fetch').mockReturnValue(
      fetchPromise as Promise<Response>
    );

    render(<App />);
    expect(screen.getByRole('status')).toBeInTheDocument();

    if (resolveFetch) {
      const safeResolveFetch: (value: Response) => void = resolveFetch;
      await act(async () => {
        safeResolveFetch({
          json: async () => ({
            data: [],
            page: 0,
            pageSize: 0,
            count: 0,
            totalCount: 0,
          }),
          ok: true,
        } as Response);
      });
    }
  });
});
describe('Data Display Tests', () => {
  afterEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  test('2.1 Correctly displays item names and images', async () => {
    mockFetch(mockResponse);

    render(<App />);
    await waitFor(() => {
      expect(screen.getByText('Aggron')).toBeInTheDocument();
      const image = screen.getByAltText('Aggron') as HTMLImageElement;
      expect(image).toBeInTheDocument();
      expect(image.src).toContain('url');
    });
  });

  test('2.2 Handles missing or undefined data gracefully', async () => {
    const mockResponse: PokemonResponse = {
      data: [{ id: '1', name: 'wrong_name', images: { small: '', large: '' } }],
      page: 1,
      pageSize: 5,
      count: 1,
      totalCount: 19500,
    };
    mockFetch(mockResponse);

    render(<App />);
    await waitFor(() => {
      expect(screen.getByText('wrong_name')).toBeInTheDocument();
      expect(screen.queryByAltText('wrong_name')).not.toBeInTheDocument();
    });
  });
});
describe('Error Handling Tests', () => {
  afterEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  test('3.1 Displays error message when API call fails', async () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error());
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText(/no data found/i)).toBeInTheDocument();
    });
    consoleError.mockRestore();
  });

  test('3.2 Shows error boundary UI when throwError is triggered', async () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    render(
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    );
    const button = screen.getByRole('button', { name: /simulate error/i });
    await act(async () => {
      await userEvent.click(button);
    });
    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });
    consoleError.mockRestore();
  });
});
