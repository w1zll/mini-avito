interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
}

export default function Button({
  children,
  onClick,
  type,
  disabled,
  className,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`cursor-pointer rounded-lg bg-white px-4 py-2 text-sm font-medium text-black hover:bg-zinc-200 transition ${disabled && 'opacity-50 cursor-not-allowed'} ${className}`}
      onClick={() => (disabled ? null : onClick?.())}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
