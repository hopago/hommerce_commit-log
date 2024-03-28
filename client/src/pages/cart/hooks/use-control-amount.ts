import { useUser } from "@clerk/clerk-react";
import { getCartData } from "../utils/getCartData";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { toast } from "sonner";
import { QueryKeys } from "../../../lib/react-query/query-key";
import { selectedCartProductState } from "../../../recoil/cart/product-to-pay";

type UseControlAmountProps = {
  bookId: string;
  price: number;
  discount: number | undefined;
};

export const useControlAmount = ({
  bookId,
  price,
  discount,
}: UseControlAmountProps) => {
  const { user } = useUser();
  const { cartData, queryClient } = getCartData(user?.id!);

  const targetItem = cartData?.books.filter(
    (book) => book.bookId === bookId
  )[0];

  const [localAmount, setLocalAmount] = useState(targetItem!.amount);
  const [selectedCartItem, setSelectedCartItem] = useRecoilState(
    selectedCartProductState
  );

  const discountedPrice = discount ? price - price * (discount / 100) : price;

  const total = discountedPrice * localAmount;

  useEffect(() => {
    updateAmount();
    updateSelectedCartItem();
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

  const updateSelectedCartItem = () => {
    const findIndex = selectedCartItem.findIndex(
      (item) => item.bookId === bookId
    );
    if (findIndex !== -1) {
      const updatedCartItem = selectedCartItem.map((item) => {
        if (item.bookId === bookId) {
          return {
            ...item,
            amount: localAmount,
          };
        } else {
          return item;
        }
      });
      setSelectedCartItem(updatedCartItem);
    }
  };

  return {
    increaseAmount,
    decreaseAmount,
    total,
    localAmount,
  };
};
