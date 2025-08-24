import type { DetailsHTMLAttributes } from 'react';

import clsx from 'clsx';

type DatalistProps = DetailsHTMLAttributes<HTMLDataListElement> & {
  classNames?: string;
  value: string[];
};

// todo: datalist for countries?
export default function Datalist({
  classNames = '',
  value,
  ...props
}: DatalistProps) {
  return (
    <datalist {...props} className={clsx(classNames)}>
      {value.map((value) => (
        <option key={value} value={value} />
      ))}
    </datalist>
  );
}
