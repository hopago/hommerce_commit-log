import { useEffect, useState } from "react";

import { getCartData } from "../utils/getCartData";

import { useUser } from "@clerk/clerk-react";
import AmountButton from "../../../_components/AmountButton";
import { toast } from "sonner";

type AmountControlProps = {
  price: number;
  bookId: string;
  discount: number | undefined;
};

export default function AmountControl({
  bookId,
  price,
  discount,
}: AmountControlProps) {
  const { user } = useUser();
  const cartData = getCartData(user?.id!);

  const targetItem = cartData?.books.filter(
    (book) => book.bookId === bookId
  )[0];

  const [localPrice, _] = useState(price);
  const [localAmount, setLocalAmount] = useState(targetItem!.amount);

  const total = localPrice && localAmount ? localPrice * localAmount : null;

  useEffect(() => {}, [localAmount]);

  const increaseAmount = () => {
    if (localAmount >= 10) {
      toast.info("수량 10개 이상부터는 대량주문안내를 참고 해주세요.");
      return;
    } else {
      setLocalAmount((prev) => prev + 1);
    }
  };

  const decreaseAmount = () => {
    if (localAmount > 1) {
      setLocalAmount((prev) => prev - 1);
    }
  };

  return (
    <div className="amount-control">
      <div className="amount-control__wrap">
        <span>{total?.toLocaleString()}</span>
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
