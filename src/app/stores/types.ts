export type YearSlice = {
  year: number;
  setYear: (newYear: number) => void;
};
export type RegionSlice = {
  regionFilter: string;
  setRegion: (region: string) => void;
};
export type SearchSlice = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};
export type SortSlice = {
  sortBy: "name" | "population";
  sortOrder: "asc" | "desc";
  setSortBy: (field: "name" | "population") => void;
  setSortOrder: (order: "asc" | "desc") => void;
};
export type ColumnSlice = {
  selectedColumns: string[];
  toggleColumn: (column: string) => void;
  addColumn: (column: string) => void;
  removeColumn: (column: string) => void;
};
