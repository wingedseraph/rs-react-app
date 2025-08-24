import type { SelectHTMLAttributes } from 'react';

import clsx from 'clsx';

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  classNames?: string;
  value: string[];
  label: string;
};

export default function Select({
  classNames = '',
  disabled,
  value,
  label,
  ...props
}: SelectProps) {
  return (
    <div className="flex flex-row items-center justify-between gap-4">
      <p>{label}</p>
      <select
        {...props}
        className={clsx(
          'rounded-4xl border-0 py-5 focus:outline-0 focus-visible:outline-0',
          classNames,
          disabled && 'cursor-not-allowed opacity-50'
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
