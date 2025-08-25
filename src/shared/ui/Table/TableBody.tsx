import type { HTMLAttributes, ReactElement } from "react";

import clsx from "clsx";

type TableProps = HTMLAttributes<HTMLTableSectionElement> & {
  classNames?: string;
  children:
    | ReactElement<HTMLTableRowElement>
    | ReactElement<HTMLTableRowElement>[];
};

export default function TableBody({
  classNames = "",
  children,
  ...props
}: TableProps) {
  return (
    <tbody className={clsx("table-auto w-full", classNames)} {...props}>
      <tr>{children}</tr>
    </tbody>
  );
}
