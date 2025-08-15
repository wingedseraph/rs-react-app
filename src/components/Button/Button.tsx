import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'reset' | 'submit';
}

export function Button({
  children,
  className = '',
  disabled,
  onClick,
  type,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`cursor-pointer transition-all disabled:pointer-events-none disabled:cursor-not-allowed disabled:text-neutral-500 ${className}`}
      disabled={disabled}
      onClick={onClick}
      type={type ?? 'button'}
      {...props}
    >
      {children}
    </button>
  );
}
