import { ReactElement } from "react";

import { cn } from "../../lib/utils";

type VoidFunc = () => void;
type PromiseVoidFunc = () => Promise<void>;
type ParamsVoidFunc = (params: unknown) => void;

type ButtonProps = {
  type: "button" | "submit";
  text?: string | null;
  onClick?: VoidFunc | PromiseVoidFunc | ParamsVoidFunc;
  icon?: string | ReactElement<any, any> | null;
  imgWidth?: number;
  imgHeight?: number;
  disabled?: boolean;
  display?: "none" | "flex" | "block" | "inline-block";
  className?: "manage" | "close" | "api-submit" | string;
  ariaLabel?: string;
  active?: boolean;
  backgroundColor?: string;
  right?: string;
  width?: string;
  height?: string;
  color?: string;
  border?: string | "none";
};

export default function Button({
  type,
  text,
  icon,
  imgWidth,
  imgHeight,
  onClick,
  disabled,
  display = "flex",
  className,
  ariaLabel,
  active,
  backgroundColor,
  right,
  width,
  height,
  color,
  border,
}: ButtonProps) {
  let btnIcon = icon;

  if ((icon || text) && display === "none") {
    return null;
  }

  if (typeof icon === "string" && imgWidth && imgHeight) {
    btnIcon = (
      <img width={imgWidth} height={imgHeight} alt="button-img" src={icon} />
    );
  }

  const btnStyles = {
    display: `${display}`,
    backgroundColor: `${backgroundColor}`,
    right: `${right}`,
    width: `${width}`,
    height: `${height}`,
    color: `${color}`,
    border: `${border}`,
  };

  return (
    <button
      className={cn(
        "common-button",
        className && className,
        active && "active"
      )}
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={btnStyles}
      aria-label={ariaLabel}
    >
      <div className="common-button__ico">{btnIcon}</div>
      <span className="common-button__text">{text}</span>
    </button>
  );
}
