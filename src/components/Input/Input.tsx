import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  value: string;
}

export function Input({ value, ...props }: InputProps) {
  return (
    <input
      className="outline-0"
      placeholder="type to search..."
      type="text"
      value={value}
      {...props}
    />
  );
}
