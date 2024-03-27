import { MdCheck } from "react-icons/md";

import { getQueryClient } from "../../../lib/react-query/getQueryClient";
import { QueryKeys } from "../../../lib/react-query/query-key";

import { useUser } from "@clerk/clerk-react";

import { useSetRecoilState } from "recoil";
import { selectedCartProductState } from "../../../recoil/cart/product-to-pay";

import { cn } from "../../../lib/utils";

export default function SelectAllCartItem() {
  const { user } = useUser();
  const queryClient = getQueryClient();
  const data = queryClient.getQueryData<ICart | undefined>([
    QueryKeys.CART,
    user?.id,
  ]);

  const setSelectedBooks = useSetRecoilState(selectedCartProductState);

  const onClick = () => {
    if (data) {
      const filteredInfo = data.books.map((book) => ({
        bookId: book._id,
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
