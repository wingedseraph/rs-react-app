import clsx from "clsx";
import type { HTMLAttributes } from "react";

type TableProps = HTMLAttributes<HTMLTableSectionElement> & {
  classNames?: string;
};

export default function TableHead({ classNames = "", ...props }: TableProps) {
  return (
    <thead
      className={clsx("w-full [&_tr]:border-b", classNames)}
      {...props}
    ></thead>
  );
}
