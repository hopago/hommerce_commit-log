import { useRecoilValue } from "recoil";

import { selectedBookState } from "../../../recoil/selected-book";

import Button from "../../../_components/Button";

import heart from "../../../assets/ico_heart.png";

import { toast } from "sonner";

import { useUser } from "@clerk/clerk-react";
import { useAddFavor } from "./hooks/use-add-favor";
import { postError } from "../../services/postError";

export default function AddFavorButton() {
  const { user } = useUser();

  const selectedBooks = useRecoilValue(selectedBookState);
  const selectedBookIds = selectedBooks.map((book) => book._id);

  const { mutate, isPending } = useAddFavor({
    userId: user?.id!,
    bookId: selectedBookIds,
  });

  const onFavorClick = async () => {
    const isConfirmed = confirm("선택된 항목들을 장바구니에 담겠습니까?");
    if (!isConfirmed) return;

    if (!user) {
      toast.info("로그인 후 이용 가능합니다.");
      return;
    }
    if (!selectedBooks.length) {
      toast.info("선택된 도서가 없습니다.");
      return;
    }

    try {
      const patchPromises = selectedBooks.map((book) =>
        mutate({
          userId: user?.id!,
          book: {
            bookId: book._id,
            img: book.representImg,
            title: book.title,
            author: book.author,
          },
        })
      );

      await Promise.all(patchPromises);

      toast.success("선택된 모든 항목이 장바구니에 추가되었습니다.");
    } catch (error) {
      postError(error);
      toast.error("장바구니에 상품을 담던 중 예기치 못한 문제가 생겼습니다.");
    }
  };

  return (
    <Button
      className="favor"
      icon={heart}
      type="button"
      size="sm"
      onClick={onFavorClick}
      isAuth={true}
      disabled={isPending}
    />
  );
}
