import clsx from "clsx";
import { type TableHTMLAttributes, memo } from "react";

function Table({ ...props }: TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="relative w-full overflow-x-auto p-10">
      <table
        className={clsx("w-full table-auto caption-bottom text-base")}
        {...props}
      ></table>
    </div>
  );
}
export default memo(Table);
