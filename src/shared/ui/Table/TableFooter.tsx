import clsx from "clsx";
import type { HTMLAttributes } from "react";

export default function TableFooter({
  ...props
}: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tfoot
      className={clsx("w-full border-t font-medium [&>tr]:last:border-b-0")}
      {...props}
    ></tfoot>
  );
}
