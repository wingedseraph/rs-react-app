import { useEffect, useRef, useState } from "react";

import type { Countries, Country } from "@/lib/apiTypes";
import type { CountryWithYearData } from "@/lib/utils";
import { getAllYears, getDataForYear, getUpdatedDataPoints } from "@/lib/utils";

import { useCountriesStore } from "@/app/stores/countryStore";

import Button from "@/shared/ui/Button/Button";
import ColumnSelector from "@/shared/ui/ColumnSelector/ColumnSelector";
import { Container } from "@/shared/ui/Container/Container";
import LabelInput from "@/shared/ui/LabelInput/LabelInput";
import Modal from "@/shared/ui/Modal/Modal";
import Select from "@/shared/ui/Select/Select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@/shared/ui/Table";

export default function TableContent({ countries }: { countries: Countries }) {
  const {
    searchQuery,
    setSearchQuery,
    sortBy,
    sortOrder,
    setSortOrder,
    year,
    setYear,
    selectedColumns,
  } = useCountriesStore();
  const [isColumnModalOpen, setIsColumnModalOpen] = useState(false);
  const [updatedDataPoints, setUpdatedDataPoints] = useState<
    Map<string, string[]>
  >(new Map());
  const prevYearDataRef = useRef<[string, CountryWithYearData][]>([]);

  const countryEntries: [string, Country][] = Object.entries(countries);
  const allYears = getAllYears(countryEntries);
  const validYear = allYears.includes(year) ? year : allYears[0] || 1900;
  const yearData = getDataForYear(countryEntries, validYear);

  useEffect(() => {
    const countryEntries: [string, Country][] = Object.entries(countries);
    const currentYearData = getDataForYear(countryEntries, year);
    if (prevYearDataRef.current.length > 0) {
      const updated = getUpdatedDataPoints(
        prevYearDataRef.current,
        currentYearData
      );
      setUpdatedDataPoints(updated);

      const timeout = setTimeout(() => {
        setUpdatedDataPoints(new Map<string, string[]>());
      }, 1000);

      return () => {
        clearTimeout(timeout);
      };
    }
    prevYearDataRef.current = currentYearData;
  }, [year, countries]);

  const filtered = yearData.filter(([countryName]) =>
    countryName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedCountries = [...filtered].sort(
    ([firstName, firstCountry], [secondName, secondCountry]) => {
      if (sortBy === "name") {
        return sortOrder === "asc"
          ? firstName.localeCompare(secondName)
          : secondName.localeCompare(firstName);
      }

      const first = firstCountry.yearData?.population ?? 0;
      const second = secondCountry.yearData?.population ?? 0;

      return sortOrder === "asc" ? first - second : second - first;
    }
  );

  return (
    <Container>
      <Container className="flex-col">
        <LabelInput
          type="text"
          name="search"
          id="searchInput"
          label="search countries:"
          placeholder="country..."
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchQuery(e.target.value);
          }}
        />
        <Select
          label="select year"
          id="selectYear"
          value={allYears.map((year: number) => year.toString())}
          selectedValue={validYear.toString()}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setYear(Number(e.target.value));
          }}
        />
        <Button
          onClick={() => {
            setSortOrder("population", sortOrder === "asc" ? "desc" : "asc");
          }}
        >
          sort population ({sortOrder})
        </Button>
        <Button
          onClick={() => {
            setSortOrder("name", sortOrder === "asc" ? "desc" : "asc");
          }}
        >
          sort name ({sortOrder})
        </Button>
        <Button
          onClick={() => {
            setIsColumnModalOpen(true);
          }}
        >
          manage columns
        </Button>
      </Container>
      <Modal
        isOpen={isColumnModalOpen}
        onClose={() => {
          setIsColumnModalOpen(false);
        }}
      >
        <ColumnSelector />
      </Modal>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>iso</TableHeaderCell>
            <TableHeaderCell>country</TableHeaderCell>
            <TableHeaderCell>population</TableHeaderCell>
            <TableHeaderCell>year</TableHeaderCell>
            <TableHeaderCell>co2</TableHeaderCell>
            <TableHeaderCell>co2_per_capita</TableHeaderCell>
            {selectedColumns.includes("total_ghg") && (
              <TableHeaderCell>total_ghg</TableHeaderCell>
            )}
            {selectedColumns.includes("total_ghg_excluding_lucf") && (
              <TableHeaderCell>total_ghg_excluding_lucf</TableHeaderCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedCountries.map(
            ([countryName, countryData]: [string, CountryWithYearData]) => (
              <TableRow key={countryData.iso_code ?? countryName}>
                <TableCell>{countryData.iso_code ?? "N/A"}</TableCell>
                <TableCell>{countryName}</TableCell>
                <TableCell
                  className={
                    updatedDataPoints.get(countryName)?.includes("population")
                      ? "text-primary bg-white transition-colors duration-1000"
                      : ""
                  }
                >
                  {countryData.yearData?.population ?? "N/A"}
                </TableCell>
                <TableCell>{countryData.yearData?.year ?? "N/A"}</TableCell>
                <TableCell
                  className={
                    updatedDataPoints.get(countryName)?.includes("cement_co2")
                      ? "text-primary bg-white transition-colors duration-1000"
                      : ""
                  }
                >
                  {countryData.yearData?.cement_co2 ?? "N/A"}
                </TableCell>
                <TableCell
                  className={
                    updatedDataPoints
                      .get(countryName)
                      ?.includes("cement_co2_per_capita")
                      ? "text-primary bg-white transition-colors duration-1000"
                      : ""
                  }
                >
                  {countryData.yearData?.cement_co2_per_capita ?? "N/A"}
                </TableCell>
                {selectedColumns.includes("total_ghg") && (
                  <TableCell
                    className={
                      updatedDataPoints.get(countryName)?.includes("total_ghg")
                        ? "text-primary bg-white transition-colors duration-1000"
                        : ""
                    }
                  >
                    {countryData.yearData?.total_ghg ?? "N/A"}
                  </TableCell>
                )}
                {selectedColumns.includes("total_ghg_excluding_lucf") && (
                  <TableCell
                    className={
                      updatedDataPoints
                        .get(countryName)
                        ?.includes("total_ghg_excluding_lucf")
                        ? "text-primary bg-white transition-colors duration-1000"
                        : ""
                    }
                  >
                    {countryData.yearData?.total_ghg_excluding_lucf ?? "N/A"}
                  </TableCell>
                )}
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </Container>
  );
}
