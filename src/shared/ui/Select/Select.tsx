import clsx from "clsx";
import type { SelectHTMLAttributes } from "react";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  classNames?: string;
  value: string[];
  selectedValue?: string;
  label: string;
};

export default function Select({
  classNames = "",
  disabled,
  value,
  selectedValue,
  label,
  ...props
}: SelectProps) {
  return (
    <div className="flex flex-row items-center justify-between gap-4">
      <p>{label}</p>
      <select
        {...props}
        value={selectedValue}
        className={clsx(
          "focus:outline-secondary rounded-4xl border-0 py-5",
          classNames,
          disabled && "cursor-not-allowed opacity-50"
        )}
      >
        {value.map((value) => (
          <option value={value} key={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
}
