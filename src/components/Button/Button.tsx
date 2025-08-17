import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

type ButtonProps = {
  children: React.ReactNode;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

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
