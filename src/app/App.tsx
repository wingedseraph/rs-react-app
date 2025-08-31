import { Suspense } from "react";

import { Provider } from "@/app/provider";

import TableContent from "@/features/TableContent";
import Spinner from "@/shared/ui/Spinner/Spinner";
import Layout from "@/widgets/Layout/Layout";

export default function App() {
  return (
    <Layout>
      <Suspense fallback={<Spinner />}>
        <Provider>
          {(countries) => <TableContent countries={countries} />}
        </Provider>
      </Suspense>
    </Layout>
  );
}
