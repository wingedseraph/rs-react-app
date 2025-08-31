import { use } from "react";

import type { Countries } from "@/lib/apiTypes";

import { getTable } from "@/api/getTable";
import { ErrorBoundary } from "@/shared/ui/ErrorBoundary/ErrorBoundary";

const countriesPromise = getTable();

export function Provider({
  children,
}: {
  children: (data: Countries) => React.ReactNode;
}) {
  const countries = use(countriesPromise);
  return <ErrorBoundary>{children(countries)}</ErrorBoundary>;
}
