import clsx from "clsx";

export default function TableCell({ ...props }: React.ComponentProps<"td">) {
  return (
    <td
      className={clsx(
        "px-5 text-left align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]"
      )}
      {...props}
    />
  );
}
