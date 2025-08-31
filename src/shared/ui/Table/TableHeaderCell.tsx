import clsx from "clsx";
import { memo } from "react";

function TableHeaderCell({ ...props }: React.ComponentProps<"th">) {
  return (
    <th
      className={clsx(
        "text-foreground h-10 px-5 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]"
      )}
      {...props}
    />
  );
}

export default memo(TableHeaderCell);
