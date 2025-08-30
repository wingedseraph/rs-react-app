import type { StateCreator } from "zustand";

import type { SortSlice } from "./types";

export const createSortSlice: StateCreator<SortSlice, [], [], SortSlice> = (
  set
) => ({
  sortBy: "name",
  sortOrder: "asc",
  setSortBy: (field) => {
    set({ sortBy: field });
  },
  setSortOrder: (order) => {
    set({ sortOrder: order });
  },
});
