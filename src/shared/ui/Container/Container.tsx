import clsx from "clsx";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export function Container({ children, className }: Props) {
  return (
    <div
      className={clsx(
        "mb-5 flex flex-row flex-wrap items-center justify-center gap-5",
        className
      )}
    >
      {children}
    </div>
  );
}
