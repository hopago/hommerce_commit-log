import { cn } from "../../lib/utils";

type InputProps = {
  type: "text" | "password" | "email" | "number";
  value: string | number;
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  className?: "prepare" | string;
  required?: boolean;
  disabled?: boolean;
};

export default function Input({
  type,
  placeholder,
  onChange,
  value,
  name,
  className,
  required,
  disabled,
}: InputProps) {
  return (
    <input
      type={type}
      value={value}
      name={name}
      placeholder={placeholder}
      className={cn("input", className && className)}
      onChange={onChange}
      required={required}
      spellCheck={false}
      autoComplete="off"
      disabled={disabled}
    />
  );
}
