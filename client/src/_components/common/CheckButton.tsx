import { MdCheck } from "react-icons/md";

import { cn } from "../../lib/utils";

type CheckButtonProps = {
  onClick: any;
  width?: number;
  height?: number;
  backgroundColor?: number;
  color?: number;
  isActive?: boolean;
  text?: string;
  disabled?: boolean;
  className?: string;
  margin?: number;
  padding?: number;
};

export default function CheckButton({
  onClick,
  width,
  height,
  backgroundColor,
  color,
  isActive,
  text,
  disabled,
  className,
  margin,
  padding,
}: CheckButtonProps) {
  const btnStyles = {
    backgroundColor: `${backgroundColor}`,
    width: `${width}px`,
    height: `${height}px`,
    color: `${color}`,
    margin: `${margin}`,
    padding: `${padding}`,
  };
  return (
    <button
      type="button"
      style={btnStyles}
      className={cn("select-one", className && className)}
      onClick={onClick}
      disabled={disabled}
    >
      <div className={cn("icon", isActive && "active")}>
        <MdCheck />
      </div>
      {text && <span>{text}</span>}
    </button>
  );
}
