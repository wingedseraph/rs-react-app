import { z } from 'zod';
import { create } from 'zustand';

import { formSchema } from '../lib/validation/formSchema';

export type FormData = z.infer<typeof formSchema>;

export type FormSubmission = {
  id: string;
  formType: 'uncontrolled' | 'hook';
  data: FormData;
  isNew?: boolean;
};

type AppState = {
  countries: string[];
  formSubmissions: FormSubmission[];
  isModalOpen: boolean;
  modalType: 'uncontrolled' | 'hook' | null;
  addFormSubmission: (submission: Omit<FormSubmission, 'id'>) => void;
  openModal: (type: 'uncontrolled' | 'hook') => void;
  closeModal: () => void;
};

export const appStore = create<AppState>((set) => ({
  countries: ['usa', 'germany'],
  formSubmissions: [],
  isModalOpen: false,
  modalType: null,

  addFormSubmission: (submission) => {
    const newSubmission: FormSubmission = {
      ...submission,
      id: crypto.randomUUID(),
      isNew: true,
    };

    set((state) => ({
      formSubmissions: [
        newSubmission,
        ...state.formSubmissions.map((state) => ({ ...state, isNew: false })),
      ],
    }));
  },

  openModal: (type) => {
    set({ isModalOpen: true, modalType: type });
  },

  closeModal: () => {
    set({ isModalOpen: false, modalType: null });
  },
}));
