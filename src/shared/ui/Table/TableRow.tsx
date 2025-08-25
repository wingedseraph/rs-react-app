import clsx from "clsx";

export default function TableRow({
  className,
  ...props
}: React.ComponentProps<"tr">) {
  return <tr className={clsx("text-amber-100", className)} {...props} />;
}
