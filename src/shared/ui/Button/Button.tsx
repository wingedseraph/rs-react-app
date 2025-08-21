import type { ButtonHTMLAttributes } from 'react';

import { clsx } from 'clsx';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  type: 'text' | 'password' | 'number' | 'email' | 'file';
};

export default function Button({ className, children }: ButtonProps) {
  return (
    <button className={clsx('text-8xl', className)}>
      <span className="italic">{children}</span>
    </button>
  );
}

// todo: custom hook for make italic first two-letters of word to italic
// uncontrolled/controlled
