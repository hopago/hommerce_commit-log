import { MdCheck } from "react-icons/md";

import { useRecoilState } from "recoil";
import {
  SelectedCartProductState,
  selectedCartProductState,
} from "../../../recoil/cart/product-to-pay";

type SelectOneCartItemProps = {
  bookId: string;
  price: number;
  discount: number | null;
  amount: number;
};

export default function SelectOneCartItem({
  bookId,
  price,
  discount,
  amount,
}: SelectOneCartItemProps) {
  const [selectedCartItem, setSelectedCartItem] = useRecoilState(
    selectedCartProductState
  );

  console.log(bookId, amount, price);
  console.log(selectedCartItem);

  const onClick = () => {
    const findIndex = selectedCartItem.findIndex(
      (prev) => prev.bookId === bookId
    );

    let updatedCartList: SelectedCartProductState;

    if (findIndex !== -1) {
      updatedCartList = selectedCartItem.filter(
        (_, index) => index !== findIndex
      );
    } else {
      updatedCartList = [
        ...selectedCartItem,
        {
          bookId,
          price,
          discount,
          amount,
        },
      ];
    }

    setSelectedCartItem(updatedCartList);
  };

  return (
    <button type="button" className="select-one" onClick={onClick}>
      <div className="icon">
        <MdCheck />
      </div>
    </button>
  );
}
