import clsx from "clsx";
import type { InputHTMLAttributes } from "react";

type LabelInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  classNames?: string;
  error?: string;
  label: string;
  id: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function LabelInput({
  classNames = "",
  disabled,
  type = "text",
  label,
  id,
  error,
  onChange,
  ...props
}: LabelInputProps) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center justify-between gap-4">
        <label htmlFor={id}>{label}</label>
        <input
          {...props}
          onChange={onChange}
          className={clsx(
            "focus:outline-secondary border-border-primary outline-primary max-w-[360px] rounded-4xl border-1 p-2 transition-all",
            classNames,
            disabled && "cursor-not-allowed opacity-50",
            error && "border-red-400"
          )}
          type={type}
          disabled={disabled}
          id={id}
          required
        />
      </div>
    </div>
  );
}
