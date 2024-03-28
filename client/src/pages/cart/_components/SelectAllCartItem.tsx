import { MdCheck } from "react-icons/md";

import { useUser } from "@clerk/clerk-react";

import { useRecoilState } from "recoil";
import {
  SelectedCartProductState,
  selectedCartProductState,
} from "../../../recoil/cart/product-to-pay";

import { cn } from "../../../lib/utils";

import { getCartData } from "../utils/getCartData";

export default function SelectAllCartItem() {
  const { user } = useUser();

  const { cartData } = getCartData(user?.id!);

  const [selectedBooks, setSelectedBooks] = useRecoilState(
    selectedCartProductState
  );

  const onClick = () => {
    if (cartData) {
      const filteredInfo: SelectedCartProductState = cartData.books.map(
        (book) => ({
          bookId: book.bookId,
          price: book.price,
          discount: book.discount,
          amount: book.amount,
        })
      );

      setSelectedBooks(filteredInfo);
    }
  };

  return (
    <button
      type="button"
      className="select-all"
      onClick={onClick}
      disabled={!cartData || !user}
    >
      <div
        className={cn(
          "icon",
          selectedBooks?.length === cartData?.books?.length && "active"
        )}
      >
        <MdCheck />
      </div>
      <span>전체</span>
    </button>
  );
}
