import minus from "../assets/ico_minus.png";
import plus from "../assets/ico_plus.png";

import { cn } from "../lib/utils";

type AmountButtonProps = {
  increaseAmount: () => void;
  decreaseAmount: () => void;
  size: "sm" | "md";
  amount: number;
};

export default function AmountButton({
  size,
  amount,
  increaseAmount,
  decreaseAmount,
}: AmountButtonProps) {
  return (
    <button className={cn("amount-btn", size && size)}>
      <div className="flex-between">
        <div className="img-wrap" onClick={decreaseAmount}>
          <img src={minus} alt="minus-icon" />
        </div>
        <span>{amount}</span>
        <div className="img-wrap" onClick={increaseAmount}>
          <img src={plus} alt="plus-icon" />
        </div>
      </div>
    </button>
  );
}
