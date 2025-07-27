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
      className={`text-[#203363] hover:text-[#F6CD46] hover:bg-[#203363] cursor-pointer transition-all disabled:pointer-events-none disabled:cursor-not-allowed disabled:text-neutral-500 ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
