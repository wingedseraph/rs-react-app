import clsx from "clsx";

export default function TableRow({ ...props }: React.ComponentProps<"tr">) {
  return <tr className={clsx("border-b transition-colors")} {...props} />;
}
