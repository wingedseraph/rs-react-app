import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { DownloadButton } from '@/components/DownloadButton/DownloadButton';

describe('should render DownloadButton component', () => {
  test('should render component', async () => {
    render(<DownloadButton />);
    const download = screen.getByRole('generic', {
      name: /download/i,
    });
    expect(download).toBeInTheDocument();
  });
});
