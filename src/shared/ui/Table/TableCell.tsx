import clsx from "clsx";

export default function TableCell({
  className,
  ...props
}: React.ComponentProps<"td">) {
  return <td className={clsx("text-blue-200", className)} {...props} />;
}
