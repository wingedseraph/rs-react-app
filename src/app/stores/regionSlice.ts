import type { StateCreator } from "zustand";

import type { RegionSlice } from "./types";

export const createRegionSlice: StateCreator<
  RegionSlice,
  [],
  [],
  RegionSlice
> = (set) => ({
  regionFilter: "all",
  setRegion: (region) => {
    set({ regionFilter: region });
  },
});
