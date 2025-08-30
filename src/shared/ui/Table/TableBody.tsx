import clsx from "clsx";
import type { HTMLAttributes } from "react";

type TableProps = HTMLAttributes<HTMLTableSectionElement> & {
  classNames?: string;
};

export default function TableBody({ classNames = "", ...props }: TableProps) {
  return (
    <tbody
      className={clsx("w-full [&_tr:last-child]:border-0", classNames)}
      {...props}
    ></tbody>
  );
}
