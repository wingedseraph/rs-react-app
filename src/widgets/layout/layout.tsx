import type { ReactNode } from "react";

import Footer from "@/widgets/Layout/Footer/Footer";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <main className="animate-slideDown">{children}</main>
      <Footer />
    </>
  );
}
