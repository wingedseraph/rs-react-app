import type { HTMLAttributes, ReactElement } from "react";

import clsx from "clsx";

type TableProps = HTMLAttributes<HTMLTableSectionElement> & {
  classNames?: string;
  children:
    | ReactElement<HTMLTableRowElement>
    | ReactElement<HTMLTableRowElement>[];
};

export default function TableHead({
  classNames = "",
  children,
  ...props
}: TableProps) {
  return (
    <thead
      className={clsx("table-auto w-full relative overflow-x-auto", classNames)}
      {...props}
    >
      <tr>{children}</tr>
    </thead>
  );
}
