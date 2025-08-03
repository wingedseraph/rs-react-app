import type { PokemonCardDetails } from '@/types';
import { create } from 'zustand';

type SelectedfItemsStore = {
  selectedItems: PokemonCardDetails[];
  addItem: (item: PokemonCardDetails) => void;
  removeItem: (id: string) => void;
  clearItems: () => void;
  downloadItems: () => void;
};

export const useSelectedItemsStore = create<SelectedfItemsStore>()((set) => ({
  selectedItems: [],
  addItem: (item) =>
    set((state) => ({
      selectedItems: state.selectedItems.some((i) => i.id === item.id)
        ? state.selectedItems
        : [...state.selectedItems, item],
    })),
  removeItem: (id) =>
    set((state) => ({
      selectedItems: state.selectedItems.filter((item) => item.id !== id),
    })),
  clearItems: () => set({ selectedItems: [] }),
  downloadItems: () => set({}),
}));
