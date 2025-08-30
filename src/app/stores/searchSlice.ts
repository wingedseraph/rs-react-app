import type { StateCreator } from "zustand";

import type { SearchSlice } from "./types";

export const createSearchSlice: StateCreator<
  SearchSlice,
  [],
  [],
  SearchSlice
> = (set) => ({
  searchQuery: "",
  setSearchQuery: (query) => {
    set({ searchQuery: query });
  },
});
