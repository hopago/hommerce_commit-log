import { useEffect, useState } from "react";

import { getCartData } from "../utils/getCartData";

import { useUser } from "@clerk/clerk-react";
import { toast } from "sonner";
import { QueryKeys } from "../../../lib/react-query/query-key";

import AmountButton from "../../../_components/AmountButton";

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
  const { user } = useUser();
  const { cartData, queryClient } = getCartData(user?.id!);

  const targetItem = cartData?.books.filter(
    (book) => book.bookId === bookId
  )[0];

  const [localAmount, setLocalAmount] = useState(targetItem!.amount);

  const discountedPrice = discount ? price - price * discount : price;

  const total = discountedPrice * localAmount;

  useEffect(() => {
    updateAmount();
  }, [localAmount]);

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

  const updateAmount = () => {
    targetItem!.amount = localAmount;
    queryClient.setQueryData([QueryKeys.CART, user?.id], (prevData: ICart) => {
      const { books } = prevData;
      const updatedBooks = books.map((book) => {
        if (book.bookId === targetItem!.bookId) {
          return { ...targetItem };
        } else {
          book;
        }
      });
      return {
        ...prevData,
        books: updatedBooks,
      };
    });
  };

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
