import { render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';

import type { Card } from '@/types';

import { App } from '@/App';

const mockResponse: Card[] = [
  {
    id: 'swsh1-1',
    image: 'url',
    localId: '1',
    name: 'Celebi V',
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
        image: 'https://assets.tcgdex.net/en/swsh/swsh1/1',
        localId: '1',
        name: 'wrong_name',
      },
    ];
    mockFetch(mockResponse);

    render(<App />);
    await waitFor(() => {
      expect(screen.getByText('Celebi V')).toBeInTheDocument();
    });
  });
});
