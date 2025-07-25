import type { ButtonProps } from '@/types';
export function Button({
  type,
  className,
  onClick,
  disabled,
  children,
}: ButtonProps) {
  return (
    <button
      type={type ?? 'button'}
      className={`text-[#203363] cursor-pointer hover:underline underline-offset-4 transition-all disabled:pointer-events-none disabled:cursor-not-allowed ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
