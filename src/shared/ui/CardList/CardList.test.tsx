import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { appStore } from '@/app/store';
import { mockFormSubmission } from '@/shared/ui/Card/Card.test';
import CardList from './CardList';
import { defaultMockStoreData } from '@/__tests__/utils';

vi.mock('@/app/store', () => ({
  appStore: vi.fn(),
}));

const mockAppStore = vi.mocked(appStore);


describe('CardList component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render CardList properly', () => {
    mockAppStore.mockReturnValue({
      ...defaultMockStoreData,
      formSubmissions: [mockFormSubmission()],
    });

    render(<CardList />);
    expect(screen.getByText('uncontrolled Form')).toBeInTheDocument();
  });

  it('should render null when no form submissions data', () => {
    mockAppStore.mockReturnValue({
      ...defaultMockStoreData,
      formSubmissions: [],
    });

    render(<CardList />);
    expect(screen.queryByText('uncontrolled Form')).not.toBeInTheDocument();
  });
});
