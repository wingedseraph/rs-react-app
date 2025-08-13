type ButtonProps = {
  className?: string;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
};

export function Button({
  type,
  className = '',
  onClick,
  disabled,
  children,
}: ButtonProps) {
  return (
    <button
      type={type ?? 'button'}
      className={`cursor-pointer transition-all disabled:pointer-events-none disabled:cursor-not-allowed disabled:text-neutral-500 ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
