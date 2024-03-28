import AmountButton from "../../../_components/common/AmountButton";

import { useControlAmount } from "../hooks/use-control-amount";

type AmountControlProps = {
  price: number;
  bookId: string;
  discount: number | undefined;
  unit: "원";
};

export default function AmountControl({
  bookId,
  price,
  discount,
  unit,
}: AmountControlProps) {
  const { total, increaseAmount, decreaseAmount, localAmount } =
    useControlAmount({ bookId, price, discount });

  return (
    <div className="amount-control">
      <div className="amount-control__wrap">
        <div className="price-wrap">
          <span className="price">{total?.toLocaleString()}</span>
          <span className="unit">{unit}</span>
        </div>
        <AmountButton
          size="sm"
          increaseAmount={increaseAmount}
          decreaseAmount={decreaseAmount}
          amount={localAmount}
        />
      </div>
    </div>
  );
}
