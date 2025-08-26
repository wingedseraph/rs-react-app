import type { HTMLAttributes } from "react";

import clsx from "clsx";

type TableProps = HTMLAttributes<HTMLTableSectionElement> & {
  classNames?: string;
};

export default function TableBody({ classNames = "", ...props }: TableProps) {
  return (
    <tbody
      className={clsx("[&_tr:last-child]:border-0 w-full", classNames)}
      {...props}
    ></tbody>
  );
}
