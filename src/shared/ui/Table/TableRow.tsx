import clsx from "clsx";

export default function TableRow({
  className,
  ...props
}: React.ComponentProps<"tr">) {
  return (
    <tr className={clsx("border-b transition-colors", className)} {...props} />
  );
}
