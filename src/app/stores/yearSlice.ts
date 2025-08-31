import { type StateCreator } from "zustand";

import type { YearSlice } from "./types";

export const createYearSlice: StateCreator<YearSlice, [], [], YearSlice> = (
  set
) => ({
  year: 1900,
  setYear: (newYear) => {
    set({ year: newYear });
  },
});
