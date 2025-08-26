import type { HTMLAttributes } from "react";

import clsx from "clsx";

type TableProps = HTMLAttributes<HTMLTableSectionElement> & {
  classNames?: string;
};

export default function TableHead({ classNames = "", ...props }: TableProps) {
  return (
    <thead
      className={clsx("[&_tr]:border-b w-full", classNames)}
      {...props}
    ></thead>
  );
}
