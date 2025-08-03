import { DownloadButton } from '@/components/DownloadButton/DownloadButton';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

describe('should render DownloadButton component', () => {
  test('should render component', async () => {
    render(<DownloadButton />);
    await waitFor(() => {
      const authorElement = screen.getByRole('button', {
        name: /download csv/i,
      });

      expect(authorElement).toHaveAttribute('disabled');
    });
  });
});
