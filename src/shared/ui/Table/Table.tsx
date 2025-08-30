import clsx from "clsx";
import type { TableHTMLAttributes } from "react";

type TableProps = TableHTMLAttributes<HTMLTableElement> & {
  classNames?: string;
};

export default function Table({ classNames = "", ...props }: TableProps) {
  return (
    <div className="relative w-full overflow-x-auto p-10">
      <table
        className={clsx(
          "w-full table-auto caption-bottom text-base",
          classNames
        )}
        {...props}
      ></table>
    </div>
  );
}
