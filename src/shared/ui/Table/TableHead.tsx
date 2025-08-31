import clsx from "clsx";
import type { HTMLAttributes } from "react";

export default function TableHead({
  ...props
}: HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={clsx("w-full [&_tr]:border-b")} {...props}></thead>;
}
