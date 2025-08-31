import type { Country } from "@/lib/apiTypes";

export type CountryWithYearData = Country & { yearData?: Country["data"][0] };

export const getAllYears = (countryEntries: [string, Country][]) => {
  const years = new Set<number>();

  for (const entry of countryEntries.flatMap(([, country]) => country.data)) {
    years.add(entry.year);
  }

  return Array.from(years).sort((a, b) => a - b);
};

export const getDataForYear = (
  countryEntries: [string, Country][],
  selectedYear: number
): [string, CountryWithYearData][] => {
  const result: [string, CountryWithYearData][] = [];

  for (const [countryName, countryData] of countryEntries) {
    const yearData = countryData.data.find(
      (data) => data.year === selectedYear
    );
    if (yearData !== undefined) {
      result.push([countryName, { ...countryData, yearData }]);
    }
  }

  return result;
};
