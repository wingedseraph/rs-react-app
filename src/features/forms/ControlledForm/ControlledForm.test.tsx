import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { defaultMockStoreData } from '@/__tests__/utils';
import { appStore } from '@/app/store';
import ControlledForm from '@/features/forms/ControlledForm/ControlledForm';

vi.mock('@/app/store', () => ({
  appStore: vi.fn(),
}));

const mockAppStore = vi.mocked(appStore);

describe('ControlledForm component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    const mockState = {
      ...defaultMockStoreData,
      countries: ['usa', 'germany'],
    };

    mockAppStore.mockReturnValue(mockState);
    mockAppStore.getState = vi.fn().mockReturnValue(mockState);
  });

  it('should render properly form', () => {
    render(<ControlledForm />);

    expect(screen.getByText('name:')).toBeInTheDocument();
    expect(screen.getByText('age:')).toBeInTheDocument();
    expect(screen.getByText('email:')).toBeInTheDocument();
    expect(screen.getByText('password:')).toBeInTheDocument();
    expect(screen.getByText('cannot submit :(')).toBeInTheDocument();
  });
});
