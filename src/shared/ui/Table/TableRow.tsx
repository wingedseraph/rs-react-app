import clsx from "clsx";
import { memo } from "react";

function TableRow({ ...props }: React.ComponentProps<"tr">) {
  return <tr className={clsx("border-b transition-colors")} {...props} />;
}

export default memo(TableRow);
