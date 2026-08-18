import { cn } from "../utils/cn";

export default function Button({
  buttonClassName,
  children,
  onClick,
  disabled = false,
}: {
  buttonClassName: string;
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      className={cn(
        "flex items-center justify-center px-4 py-2 rounded-md",
        ...buttonClassName,
      )}
      onClick={onClick}
      type="button"
      disabled={disabled}
    >
      {children}
    </button>
  );
}
