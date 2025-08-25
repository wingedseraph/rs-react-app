import type { ReactElement, TableHTMLAttributes } from "react";

import clsx from "clsx";

type TableProps = TableHTMLAttributes<HTMLTableElement> & {
  classNames?: string;
  children:
    | ReactElement<HTMLTableSectionElement>
    | ReactElement<HTMLTableSectionElement>[];
};

//todo: add variant: small and medium
// small for mobile, medium for desktop
// to use in App: xl:table[desktop], table[mobile]
export default function Table({
  classNames = "",
  children,
  ...props
}: TableProps) {
  return (
    <div className="border-2 rounded-4xl p-10 border-border-primary">
      <table className={clsx("table-auto w-full", classNames)} {...props}>
        {children}
      </table>
    </div>
  );
}
