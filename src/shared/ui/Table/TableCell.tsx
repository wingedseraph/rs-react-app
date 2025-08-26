import clsx from "clsx";

export default function TableCell({
  className,
  ...props
}: React.ComponentProps<"td">) {
  return (
    <td
      className={clsx(
        "p-2 align-middle text-left whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  );
}
