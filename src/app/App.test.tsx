import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import userEvent from '@testing-library/user-event';

import { defaultMockStoreData } from '@/__tests__/utils';
import { appStore } from '@/app/store';
import App from './App';

vi.mock('@/app/store', () => ({
  appStore: vi.fn(),
}));

const mockAppStore = vi.mocked(appStore);

describe('App component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render main buttons', () => {
    mockAppStore.mockReturnValue({
      ...defaultMockStoreData,
    });

    render(<App />);

    expect(screen.getByText(/controlled form/i)).toBeInTheDocument();
    expect(screen.getByText(/ok form/i)).toBeInTheDocument();
  });

  it('should open uncontrolled form modal when button clicked', async () => {
    const mockOpenModal = vi.fn();
    mockAppStore.mockReturnValue({
      ...defaultMockStoreData,
      openModal: mockOpenModal,
    });

    render(<App />);
    const button = screen.getByRole('button', { name: /controlled form/i });
    await userEvent.click(button);

    expect(mockOpenModal).toHaveBeenCalledWith('uncontrolled');
  });

  it('should opens controlled form (react hook form) modal when button clicked', async () => {
    const mockOpenModal = vi.fn();
    mockAppStore.mockReturnValue({
      ...defaultMockStoreData,
      openModal: mockOpenModal,
    });

    render(<App />);
    await userEvent.click(screen.getByText(/ok form/i));

    expect(mockOpenModal).toHaveBeenCalledWith('hook');
  });

  it('should render shared modal when open', () => {
    const mockCloseModal = vi.fn();
    mockAppStore.mockReturnValue({
      ...defaultMockStoreData,
      modalType: 'uncontrolled',
      closeModal: mockCloseModal,
      isModalOpen: true,
    });

    render(<App />);

    expect(screen.getByText('Uncontrolled Form')).toBeInTheDocument();
  });
});
