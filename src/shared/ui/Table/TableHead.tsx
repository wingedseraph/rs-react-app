import clsx from "clsx";
import { type HTMLAttributes, memo } from "react";

function TableHead({ ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={clsx("w-full [&_tr]:border-b")} {...props}></thead>;
}

export default memo(TableHead);
