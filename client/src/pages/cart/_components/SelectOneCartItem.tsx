import { MdCheck } from "react-icons/md";

import { useSetRecoilState } from "recoil";
import { selectedCartProductState } from "../../../recoil/cart/product-to-pay";

type SelectOneCartItemProps = {
  bookId: string;
  price: number;
  discount: number | null;
};

export default function SelectOneCartItem({
  bookId,
  price,
  discount,
}: SelectOneCartItemProps) {
  const setSelectedCartItem = useSetRecoilState(selectedCartProductState);

  const onClick = () => {
    setSelectedCartItem([
      {
        bookId,
        price,
        discount,
      },
    ]);
  };

  return (
    <button type="button" className="select-one" onClick={onClick}>
      <div className="icon">
        <MdCheck />
      </div>
    </button>
  );
}
