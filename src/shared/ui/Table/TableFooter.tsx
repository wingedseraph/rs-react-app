import type { HTMLAttributes } from "react";

import clsx from "clsx";

type TableProps = HTMLAttributes<HTMLTableSectionElement> & {
  classNames?: string;
};

export default function TableFooter({ classNames = "", ...props }: TableProps) {
  return (
    <tfoot
      className={clsx(
        "w-full border-t font-medium [&>tr]:last:border-b-0",
        classNames
      )}
      {...props}
    ></tfoot>
  );
}
