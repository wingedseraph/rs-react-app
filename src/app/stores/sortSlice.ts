import type { StateCreator } from "zustand";

import type { SortSlice } from "./types";

export const createSortSlice: StateCreator<SortSlice, [], [], SortSlice> = (
  set
) => ({
  sortBy: "name",
  sortOrder: "asc",

  setSortOrder: (field, order) => {
    set({ sortBy: field, sortOrder: order });
  },
});
