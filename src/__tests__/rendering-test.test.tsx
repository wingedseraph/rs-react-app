import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

describe('1.1 Renders search input and search button', () => {
  test('render search input', () => {
    render(<Input value="test_with_vitest" onChange={() => 0} />);

    const input = screen.getByPlaceholderText('type to search...');
    expect(input).toHaveValue('test_with_vitest');
    expect(input).toBeInTheDocument();
  });

  test('render search button', () => {
    render(<Button onClick={() => 0}>test_with_vitest</Button>);

    const button = screen.getByRole('button', { name: /test_with_vitest/i });
    expect(button).toBeInTheDocument();
  });
});

describe('1.2 Displays previously saved search term from localStorage on mount', () => {
  test('');
});
