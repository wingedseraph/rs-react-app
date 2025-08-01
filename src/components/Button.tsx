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
      className={`cursor-pointer text-[#203363] transition-all hover:bg-[#203363] hover:text-[#F6CD46] disabled:pointer-events-none disabled:cursor-not-allowed disabled:text-neutral-500 ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
