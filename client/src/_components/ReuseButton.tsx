import { cn } from "../lib/utils";

type PurchaseButtonText = "장바구니" | "바로구매";

type FAQText = "반품/교환 신청" | "1:1문의";

type ReuseButtonProps = {
  type?: "button" | "submit";
  style: "default" | "purple";
  text: PurchaseButtonText | FAQText | string;
  size: "sm" | "md" | "lg";
  icon?: JSX.Element | string;
  onClick?: () => void | (() => Promise<void>);
  disabled?: boolean;
};

export default function ReuseButton({
  type = "button",
  text,
  style,
  size,
  icon,
  onClick,
  disabled,
}: ReuseButtonProps) {
  let iconContent: JSX.Element | string | null = null;

  if (typeof icon === "string") {
    iconContent = (
      <div className="img-wrap">
        <img src={icon} alt="button-img" />
      </div>
    );
  } else {
    iconContent = icon as JSX.Element;
  }

  return (
    <button
      type={type}
      className={cn("prod-purchase-button", style && style, size && size)}
      onClick={onClick}
      disabled={disabled}
    >
      {iconContent && iconContent}
      <span>{text}</span>
    </button>
  );
}
