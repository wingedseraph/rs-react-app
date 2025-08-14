type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick: () => void;
  type?: 'button' | 'reset' | 'submit';
};

export function Button({
  children,
  className = '',
  disabled,
  onClick,
  type,
}: ButtonProps) {
  return (
    <button
      className={`cursor-pointer transition-all disabled:pointer-events-none disabled:cursor-not-allowed disabled:text-neutral-500 ${className}`}
      disabled={disabled}
      onClick={onClick}
      type={type ?? 'button'}
    >
      {children}
    </button>
  );
}
