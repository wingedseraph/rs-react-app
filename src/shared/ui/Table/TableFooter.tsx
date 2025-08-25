import type { HTMLAttributes, ReactElement } from "react";

import clsx from "clsx";

type TableProps = HTMLAttributes<HTMLTableSectionElement> & {
  classNames?: string;
  children:
    | ReactElement<HTMLTableRowElement>
    | ReactElement<HTMLTableRowElement>[];
};

export default function TableFooter({
  classNames = "",
  children,
  ...props
}: TableProps) {
  return (
    <tfoot className={clsx("table-auto w-full", classNames)} {...props}>
      <tr>{children}</tr>
    </tfoot>
  );
}
