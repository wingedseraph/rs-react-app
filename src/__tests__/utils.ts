import { vi } from 'vitest';

export const defaultMockStoreData = {
  formSubmissions: [],
  countries: ['usa', 'germany'],
  isModalOpen: false,
  modalType: null,
  addFormSubmission: vi.fn(),
  openModal: vi.fn(),
  closeModal: vi.fn(),
};
