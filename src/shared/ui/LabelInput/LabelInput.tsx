import type { InputHTMLAttributes, LabelHTMLAttributes } from 'react';

import clsx from 'clsx';

type LabelInputProps = InputHTMLAttributes<HTMLInputElement> &
  LabelHTMLAttributes<HTMLLabelElement> & {
    classNames?: string;
    label: string;
    id: string;
  };

// todo: datalist for countries?
export default function LabelInput({
  classNames = '',
  disabled,
  type = 'text',
  label,
  id,
  ...props
}: LabelInputProps) {
  return (
    <div className="flex flex-row items-center justify-between gap-4">
      <label htmlFor={id}>{label}</label>
      <input
        {...props}
        className={clsx(
          'focus:outline-secondary border-border-primary outline-primary rounded-4xl border-1 p-5',
          classNames,
          disabled && 'cursor-not-allowed opacity-50'
        )}
        type={type}
        disabled={disabled}
        id={id}
        required
      />
    </div>
  );
}
