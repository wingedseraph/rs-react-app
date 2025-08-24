import type { InputHTMLAttributes, LabelHTMLAttributes } from 'react';

import clsx from 'clsx';

type LabelInputProps = InputHTMLAttributes<HTMLInputElement> &
  LabelHTMLAttributes<HTMLLabelElement> & {
    classNames?: string;
    error?: string;
    label: string;
    id: string;
  };

export default function LabelInput({
  classNames = '',
  disabled,
  type = 'text',
  label,
  id,
  error,
  ...props
}: LabelInputProps) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center justify-between gap-4">
        <label htmlFor={id}>{label}</label>
        <input
          {...props}
          className={clsx(
            'focus:outline-secondary border-border-primary outline-primary max-w-[360px] rounded-4xl border-1 p-5 transition-all',
            classNames,
            disabled && 'cursor-not-allowed opacity-50',
            error && 'border-red-400'
          )}
          type={type}
          disabled={disabled}
          id={id}
          required
        />
      </div>
      <div className="mt-1 flex min-h-[32px] items-center">
        {error && <p className="text-lg text-red-400">{error}</p>}
      </div>
    </div>
  );
}
