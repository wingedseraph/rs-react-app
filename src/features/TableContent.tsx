import { useState } from "react";

import type { Countries, Country } from "@/lib/apiTypes";
import type { CountryWithYearData } from "@/lib/utils";
import { getAllYears, getDataForYear } from "@/lib/utils";

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
    setSortBy,
    setSortOrder,
    year,
    setYear,
    selectedColumns,
  } = useCountriesStore();
  const [isColumnModalOpen, setIsColumnModalOpen] = useState(false);

  const countryEntries: [string, Country][] = Object.entries(countries);
  const allYears = getAllYears(countryEntries);
  const validYear = allYears.includes(year) ? year : allYears[0] || 1900;
  const yearData = getDataForYear(countryEntries, validYear);

  const filtered = yearData.filter(([countryName]) =>
    countryName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  //fix: move to utils
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
            setSortBy("population");
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
          }}
        >
          sort population ({sortOrder})
        </Button>
        <Button
          onClick={() => {
            setSortBy("name");
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
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
                <TableCell>
                  {countryData.yearData?.population ?? "N/A"}
                </TableCell>
                <TableCell>{countryData.yearData?.year ?? "N/A"}</TableCell>
                <TableCell>
                  {countryData.yearData?.total_ghg ?? "N/A"}
                </TableCell>
                <TableCell>
                  {countryData.yearData?.cement_co2_per_capita ?? "N/A"}
                </TableCell>
                {selectedColumns.includes("total_ghg") && (
                  <TableCell>
                    {countryData.yearData?.total_ghg ?? "N/A"}
                  </TableCell>
                )}
                {selectedColumns.includes("total_ghg_excluding_lucf") && (
                  <TableCell>
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
