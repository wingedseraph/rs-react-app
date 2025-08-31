import clsx from "clsx";
import type { HTMLAttributes } from "react";

export default function TableBody({
  ...props
}: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody
      className={clsx("w-full [&_tr:last-child]:border-0")}
      {...props}
    ></tbody>
  );
}
