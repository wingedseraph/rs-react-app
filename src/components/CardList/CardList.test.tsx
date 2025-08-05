import { App } from '@/App';
import type { Card } from '@/types';
import { act, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';

const mockResponse: Card[] = [
  {
    id: 'swsh1-1',
    localId: '1',
    name: 'Celebi V',
    image: 'url',
  },
];

export const mockFetch = (mockResponse: Card[] | object) => {
  vi.spyOn(globalThis, 'fetch').mockResolvedValue({
    json: async () => mockResponse,
    ok: true,
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
      expect(screen.getAllByText(/Celebi/)).toHaveLength(1);
    });
  });

  test('1.2 Displays "no results" message when data array is empty', async () => {
    const mockResponse: Card[] = [];
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
          json: async () => [],
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
      expect(screen.getByText('Celebi V')).toBeInTheDocument();
      const image = screen.getByAltText('Celebi V') as HTMLImageElement;
      expect(image).toBeInTheDocument();
      expect(image.src).toContain('url');
    });
  });

  test('2.2 Handles missing or undefined data gracefully', async () => {
    const mockResponse: Card[] = [
      {
        id: 'swsh1-1',
        localId: '1',
        name: 'wrong_name',
        image: 'https://assets.tcgdex.net/en/swsh/swsh1/1',
      },
    ];
    mockFetch(mockResponse);

    render(<App />);
    await waitFor(() => {
      expect(screen.getByText('wrong_name')).toBeInTheDocument();
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
      expect(screen.getByRole('status')).toBeInTheDocument();
    });
    consoleError.mockRestore();
  });
});
