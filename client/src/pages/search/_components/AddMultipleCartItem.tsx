import Button from "../../../_components/Button";

import cart from "../../../assets/ico_cart.png";

import { useRecoilValue } from "recoil";
import { selectedBookState } from "../../../recoil/selected-book";

import { useUpdateCart } from "../../details/[bookId]/hooks/use-update-cart";

import { useUser } from "@clerk/clerk-react";

import { useEffect, useState } from "react";

import { toast } from "sonner";

import { postError } from "../../services/postError";

export default function AddCartButton() {
  const { user } = useUser();

  const selectedBooks = useRecoilValue(selectedBookState);

  const [isAllPatched, setIsAllPatched] = useState(false);

  const { handlePatch } = useUpdateCart({
    userId: user?.id,
    amount: 1,
    actionType: "add",
  });

  const onCartClick = async () => {
    const isConfirmed = confirm("선택된 항목들을 장바구니에 담겠습니까?");
    if (!isConfirmed) return;

    if (!user) {
      toast.info("로그인 후 이용 가능합니다.");
      setIsAllPatched(false);
      return;
    }
    if (!selectedBooks.length) {
      toast.info("선택된 도서가 없습니다.");
      setIsAllPatched(false);
      return;
    }

    setIsAllPatched(true);

    try {
      const patchPromises = selectedBooks.map((book) => handlePatch(book));

      await Promise.all(patchPromises);

      toast.success("선택된 모든 항목이 장바구니에 추가되었습니다.");
    } catch (error) {
      postError(error);
      toast.error("장바구니에 상품을 담던 중 예기치 못한 문제가 생겼습니다.");
    } finally {
      setIsAllPatched(false);
    }
  };

  useEffect(() => {
    if (isAllPatched) {
      toast.info("상품을 장바구니에 담는 중 입니다.");
    }
  }, [isAllPatched]);

  return (
    <Button
      className="cart"
      icon={cart}
      type="button"
      size="sm"
      onClick={onCartClick}
      isAuth={true}
    />
  );
}
