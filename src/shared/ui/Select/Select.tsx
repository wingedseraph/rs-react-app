import type { SelectHTMLAttributes } from 'react';

import clsx from 'clsx';

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  classNames?: string;
  options: string[];
  label: string;
};

// todo: datalist for countries?
export default function Select({
  classNames = '',
  disabled,
  options,
  label,
  ...props
}: SelectProps) {
  return (
    <div className="flex flex-row items-center justify-center gap-4">
      <p>{label}</p>
      <select
        {...props}
        className={clsx(
          'rounded-4xl border-0 py-5 focus:outline-0 focus-visible:outline-0',
          classNames,
          disabled && 'cursor-not-allowed opacity-50'
        )}
      >
        {options.map((option, i) => (
          <option value={option} key={i}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
