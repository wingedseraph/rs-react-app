import { create } from "zustand";

import { createColumnSlice } from "./columnSlice";
import { createRegionSlice } from "./regionSlice";
import { createSearchSlice } from "./searchSlice";
import { createSortSlice } from "./sortSlice";
import type {
  ColumnSlice,
  RegionSlice,
  SearchSlice,
  SortSlice,
  YearSlice,
} from "./types";
import { createYearSlice } from "./yearSlice";

export const useCountriesStore = create<
  YearSlice & RegionSlice & SearchSlice & SortSlice & ColumnSlice
>()((...a) => ({
  ...createYearSlice(...a),
  ...createRegionSlice(...a),
  ...createSearchSlice(...a),
  ...createSortSlice(...a),
  ...createColumnSlice(...a),
}));
