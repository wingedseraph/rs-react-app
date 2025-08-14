import About from '@/app/about/page';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, test } from 'vitest';

describe('should render about page', () => {
  test('should render about page', async () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );
    await waitFor(() => {
      const authorElement = screen.getByRole('link', {
        name: /author: wingedseraph/i,
      });

      expect(authorElement).toHaveAttribute(
        'href',
        'https://github.com/wingedseraph'
      );

      const courseElement = screen.getByRole('link', {
        name: /react course link/i,
      });

      expect(courseElement).toHaveAttribute(
        'href',
        'https://rs.school/courses/reactjs'
      );

      const returnElement = screen.getByRole('link', {
        name: /← to index page/i,
      });

      expect(returnElement).toHaveAttribute('href', '/');
    });
  });
});
