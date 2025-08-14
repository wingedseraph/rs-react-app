import { render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { Pagination } from '@/components/Pagination/Pagination';

describe('Rendering Tests', () => {
  afterEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  test('1.1 Renders number of pages', async () => {
    render(
      <Pagination
        currentPage={3}
        disabled={false}
        hasMorePages={true}
        onClick={vi.fn()}
      />
    );
    await waitFor(() => {
      const currentPage = screen.getByTestId('currentPage');

      expect(currentPage).toHaveTextContent(/3/);
    });
  });

  test('1.2 Renders decrease of pages', async () => {
    const onClick = vi.fn();

    render(
      <Pagination
        currentPage={2}
        disabled={false}
        hasMorePages={true}
        onClick={onClick}
      />
    );
    await waitFor(() => {
      const previousButton = screen.getByText('prev');

      previousButton.click();
      expect(onClick).toHaveBeenCalledWith(1);
    });
  });
  test('1.3 Renders increase of pages', async () => {
    const onClick = vi.fn();

    render(
      <Pagination
        currentPage={1}
        disabled={false}
        hasMorePages={true}
        onClick={onClick}
      />
    );
    await waitFor(() => {
      const nextButton = screen.getByText('next');

      nextButton.click();
      expect(onClick).toHaveBeenCalledWith(2);
    });
  });
});
