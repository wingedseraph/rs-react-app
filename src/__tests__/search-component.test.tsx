import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { App } from '../App';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Search } from '../components/Search';
import { CONST } from '../types/types';

describe('Rendering Tests', () => {
  afterEach(() => {
    localStorage.clear();
  });

  test('1.1 Renders search input and search button', () => {
    render(<Input value="test_with_vitest" onChange={() => {}} />);
    render(<Button onClick={() => {}}>test_with_vitest</Button>);

    const input = screen.getByPlaceholderText('type to search...');
    const button = screen.getByRole('button', { name: /test_with_vitest/i });

    expect(input).toHaveValue('test_with_vitest');
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('1.2 Displays previously saved search term from localStorage on mount', () => {
    localStorage.setItem(CONST.POKEMON_QUERY, 'test_with_vitest');
    render(<App />);

    const input = screen.getByPlaceholderText('type to search...');
    expect(input).toHaveValue('test_with_vitest');
  });

  test('1.3 Shows empty input when no saved term exists', () => {
    localStorage.setItem(CONST.POKEMON_QUERY, '');
    render(<App />);

    const input = screen.getByPlaceholderText('type to search...');
    expect(input).toHaveValue('');
  });
});

describe('User Interaction Tests', () => {
  afterEach(() => {
    localStorage.clear();
  });

  test('2.1 Updates input value when user types', async () => {
    render(<App />);
    const input = screen.getByPlaceholderText('type to search...');
    const button = screen.getByRole('button', { name: /search/i });

    await userEvent.type(input, 'test_with_vitest');
    await userEvent.click(button);

    expect(localStorage.getItem(CONST.POKEMON_QUERY)).toBe('test_with_vitest');
  });
  test('2.3 Trims whitespace from search input before saving', async () => {
    render(<App />);
    const input = screen.getByPlaceholderText('type to search...');
    const button = screen.getByRole('button', { name: /search/i });

    await userEvent.type(input, '  test_with_vitest  ');
    await waitFor(() => expect(button).not.toBeDisabled());
    await userEvent.click(button);

    expect(localStorage.getItem(CONST.POKEMON_QUERY)).toBe('test_with_vitest');
  });
  test('2.4 Triggers search callback with correct parameters', async () => {
    const onClick = vi.fn();
    render(
      <Search
        value="test_with_vitest"
        onChange={() => {}}
        loading={false}
        onClick={onClick}
      />
    );

    const input = await screen.findByPlaceholderText('type to search...');
    await userEvent.type(input, 'test_with_vitest');
    await userEvent.keyboard('{Enter}');

    expect(onClick).toHaveBeenCalledWith('test_with_vitest');
  });
});

describe('LocalStorage Integration', () => {
  afterEach(() => {
    localStorage.clear();
  });

  test('3.1 Retrieves saved search term on component mount', async () => {
    localStorage.setItem(CONST.POKEMON_QUERY, 'test_with_vitest');
    render(<App />);
    const input = await screen.findByPlaceholderText('type to search...');
    expect(input).toHaveValue('test_with_vitest');
  });

  test('3.2 Overwrites existing localStorage value when new search is performed', async () => {
    localStorage.setItem(CONST.POKEMON_QUERY, 'old_test_with_vitest');
    render(<App />);
    const input = screen.getByPlaceholderText('type to search...');
    const button = screen.getByRole('button', { name: /search/i });

    await userEvent.clear(input);
    await userEvent.type(input, 'test_with_vitest');
    await userEvent.click(button);

    expect(localStorage.getItem(CONST.POKEMON_QUERY)).toBe('test_with_vitest');
  });
});
