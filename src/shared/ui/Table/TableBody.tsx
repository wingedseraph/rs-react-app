import clsx from "clsx";
import { type HTMLAttributes, memo } from "react";

function TableBody({ ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody
      className={clsx("w-full [&_tr:last-child]:border-0")}
      {...props}
    ></tbody>
  );
}
export default memo(TableBody);
