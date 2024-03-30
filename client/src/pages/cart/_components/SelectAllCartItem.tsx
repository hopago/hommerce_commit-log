import { useUser } from "@clerk/clerk-react";

import { useRecoilState } from "recoil";
import {
  SelectedCartProductState,
  selectedCartProductState,
} from "../../../recoil/cart/product-to-pay";

import { getCartData } from "../utils/getCartData";

import CheckButton from "../../../_components/common/CheckButton";

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

  const isActive = selectedBooks?.length === cartData?.books?.length;
  const buttonDisabled = !cartData || !user;

  return (
    <CheckButton
      isActive={isActive}
      onClick={onClick}
      disabled={buttonDisabled}
    />
  );
}
