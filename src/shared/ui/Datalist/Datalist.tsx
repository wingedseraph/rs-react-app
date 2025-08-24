import type { HTMLAttributes } from 'react';

import clsx from 'clsx';

type DatalistProps = HTMLAttributes<HTMLDataListElement> & {
  classNames?: string;
  value: string[];
};

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
