import clsx from "clsx";
import type { ReactNode } from "react";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
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
