import { useRecoilState } from "recoil";
import {
  SelectedCartProductState,
  selectedCartProductState,
} from "../../../recoil/cart/product-to-pay";

import CheckButton from "../../../_components/common/CheckButton";

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

  const isActive = selectedCartItem.some((item) => item.bookId === bookId);

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

  return <CheckButton isActive={isActive} onClick={onClick} />;
}
