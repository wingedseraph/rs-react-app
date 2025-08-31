import type { Country } from "@/lib/apiTypes";

export type CountryWithYearData = Country & { yearData?: Country["data"][0] };
const FIELDS = [
  "population",
  "cement_co2",
  "cement_co2_per_capita",
  "total_ghg",
  "total_ghg_excluding_lucf",
] as const;

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

export const getUpdatedDataPoints = (
  prevData: [string, CountryWithYearData][],
  newData: [string, CountryWithYearData][]
) => {
  const updated = new Map<string, string[]>();

  newData.forEach(([countryName, newData], i) => {
    const prevDataPoint = prevData[i][1];
    const changed: string[] = FIELDS.filter(
      (f) =>
        newData.yearData?.[f] !== prevDataPoint.yearData?.[f] &&
        newData.yearData?.[f] !== undefined
    );

    if (changed.length) updated.set(countryName, changed);
  });

  return updated;
};
