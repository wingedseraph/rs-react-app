import clsx from "clsx";
import { type HTMLAttributes, memo } from "react";

function TableFooter({ ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tfoot
      className={clsx("w-full border-t font-medium [&>tr]:last:border-b-0")}
      {...props}
    ></tfoot>
  );
}
export default memo(TableFooter);
