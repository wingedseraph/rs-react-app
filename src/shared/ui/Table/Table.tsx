import type { TableHTMLAttributes } from "react";

import clsx from "clsx";

type TableProps = TableHTMLAttributes<HTMLTableElement> & {
  classNames?: string;
};

//todo: add variant: small and medium
// small for mobile, medium for desktop
// to use in App: xl:table[desktop], table[mobile]

export default function Table({ classNames = "", ...props }: TableProps) {
  return (
    <div className="relative w-full overflow-x-auto rounded-2xl border border-border-primary p-10">
      <table
        className={clsx("caption-bottom text-sm table-auto w-full", classNames)}
        {...props}
      ></table>
    </div>
  );
}
