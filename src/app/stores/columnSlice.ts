import type { StateCreator } from "zustand";

import type { ColumnSlice } from "./types";

export const createColumnSlice: StateCreator<
  ColumnSlice,
  [],
  [],
  ColumnSlice
> = (set, get) => ({
  selectedColumns: ["population"],
  toggleColumn: (column) => {
    const { selectedColumns } = get();
    const exists = selectedColumns.includes(column);

    if (exists) {
      set({
        selectedColumns: selectedColumns.filter((column) => column !== column),
      });
    } else {
      set({ selectedColumns: [...selectedColumns, column] });
    }
  },
  addColumn: (column) => {
    const { selectedColumns } = get();
    if (!selectedColumns.includes(column)) {
      set({ selectedColumns: [...selectedColumns, column] });
    }
  },
  removeColumn: (column) => {
    const { selectedColumns } = get();
    set({ selectedColumns: selectedColumns.filter((col) => col !== column) });
  },
});
