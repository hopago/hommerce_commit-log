import { MdAdd } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

import Button from "../../../../_components/common/Button";
import ReuseButton from "../../../../_components/common/CommonButton";

import { useUser } from "@clerk/clerk-react";

import { useDeleteFavor } from "../hooks/use-delete-favor";
import { postError } from "../../../services/postError";
import { toast } from "sonner";

import { useRecoilState, useRecoilValue } from "recoil";
import { searchWishList } from "../../../../recoil/modal/search-book";
import { selectedMyRoomWishListState } from "../../../../recoil/myroom/selected-item";

import { useModal } from "../../../hooks/use-modal";

type MutateWishListProps = {
  bookIds: string[];
};

export default function MutateWishList({ bookIds }: MutateWishListProps) {
  const { user } = useUser();
  const [show, setShow] = useRecoilState(searchWishList);

  const selectedItems = useRecoilValue(selectedMyRoomWishListState);
  const ids = selectedItems.map((item) => item.bookId);

  const { mutateAsync, isPending } = useDeleteFavor({
    bookIds,
    userId: user?.id!,
  });

  const onClick = async () => {
    if (!ids || !ids.length) {
      toast.info("도서 선택 후 다시 시도해주세요.");
      return;
    }

    const isConfirmed = confirm("정말 선택된 모든 위시리스틀 삭제하시겠어요?");

    if (isConfirmed) {
      try {
        await mutateAsync({ userId: user?.id!, ids });
        toast.success("모든 위시리스트가 성공적으로 삭제 됐습니다.");
      } catch (err) {
        postError(err);
      }
    }
  };

  useModal({ show, setShow });

  const showSearchModal = () => setShow(true);

  return (
    <div className="mutate-wish-list-wrap">
      <Button
        text="도서 추가"
        icon={<MdAdd size={18} />}
        type="button"
        onClick={showSearchModal}
        className="wish-list"
      />
      <ReuseButton
        style="default"
        text="삭제"
        icon={<FaTrash color="#444" />}
        type="button"
        size="md"
        onClick={onClick}
        disabled={isPending}
      />
    </div>
  );
}
