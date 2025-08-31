import { Container } from "../Container/Container";

import { useCountriesStore } from "@/app/stores/countryStore";

import LabelInput from "@/shared/ui/LabelInput/LabelInput";

const COLUMNS = [
  { key: "total_ghg", label: "total_ghg" },
  { key: "total_ghg_excluding_lucf", label: "total_ghg_excluding_lucf" },
];

export default function ColumnSelector() {
  const { selectedColumns, toggleColumn } = useCountriesStore();

  return (
    <>
      <Container className="flex flex-row">
        <h2 className="text-4xl font-bold">select columns</h2>
      </Container>
      <Container className="flex flex-col">
        {COLUMNS.map((column) => (
          <LabelInput
            key={column.key}
            type="checkbox"
            checked={selectedColumns.includes(column.key)}
            onChange={() => {
              toggleColumn(column.key);
            }}
            label={column.label}
            id={column.key}
          />
        ))}
      </Container>
    </>
  );
}
