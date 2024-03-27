import { MdCheck } from "react-icons/md";

import { useUser } from "@clerk/clerk-react";

import { useSetRecoilState } from "recoil";
import { selectedCartProductState } from "../../../recoil/cart/product-to-pay";

import { cn } from "../../../lib/utils";

import { getCartData } from "../utils/getCartData";

export default function SelectAllCartItem() {
  const { user } = useUser();

  const data = getCartData(user?.id!);

  const setSelectedBooks = useSetRecoilState(selectedCartProductState);

  const onClick = () => {
    if (data) {
      const filteredInfo = data.books.map((book) => ({
        bookId: book.bookId,
        price: book.price,
        discount: book.discount,
      }));

      setSelectedBooks(filteredInfo);
    }
  };

  return (
    <button
      type="button"
      className={cn(
        "select-all",
        setSelectedBooks?.length === data?.books?.length && "active"
      )}
      onClick={onClick}
      disabled={!data || !user}
    >
      <div className="icon">
        <MdCheck />
      </div>
      <span>전체</span>
    </button>
  );
}
