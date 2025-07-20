import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react';
import { describe, expect, test, vi } from 'vitest';
import { App } from '../App';
import { ErrorBoundary } from '../components/ErrorBoundary';

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
