import heart from "../assets/ico_heart.png";

import { cn } from "../lib/utils";

type WishButtonProps = {
  className?: string;
};

export default function WishButton({ className }: WishButtonProps) {
  const onClick = () => {};

  return (
    <button
      className={cn("wish-btn", className && className)}
      onClick={onClick}
    >
      <div className="img-wrap">
        <img src={heart} alt="wish-icon" />
      </div>
    </button>
  );
}
