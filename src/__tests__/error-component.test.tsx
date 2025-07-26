import { NotFound } from '@/pages/notFound/notFound';
import { render, waitFor, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { App } from '../App';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { MemoryRouter } from 'react-router-dom';

describe('ErrorBoundary Tests', () => {
  test('Shows error boundary UI when throwError is triggered', async () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    render(
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    );
    consoleError.mockRestore();
  });

  test('Shows notFound page when router error is triggered', async () => {
    render(
      <MemoryRouter>
        <NotFound error="404" />;
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/page not found/i)).toBeInTheDocument();
      expect(screen.getByText(/error:/i)).toBeInTheDocument();

      const returnElement = screen.getByRole('link', {
        name: /← return to index page/i,
      });

      expect(returnElement).toHaveAttribute('href', '/');
    });
  });
});
