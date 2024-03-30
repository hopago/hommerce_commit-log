import { MdPlusOne } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

import Button from "../../../../_components/common/Button";
import ReuseButton from "../../../../_components/common/CommonButton";

import { useUser } from "@clerk/clerk-react";

import { useDeleteFavor } from "../hooks/use-delete-favor";
import { postError } from "../../../services/postError";
import { toast } from "sonner";

import { useSetRecoilState } from "recoil";
import { searchWishList } from "../../../../recoil/modal/search-book";

type MutateWishListProps = {
  totalIds: string[];
  bookIds: string[];
};

export default function MutateWishList({
  totalIds,
  bookIds,
}: MutateWishListProps) {
  const { user } = useUser();
  const setSearchWishListModalShow = useSetRecoilState(searchWishList);

  const { mutateAsync, isPending } = useDeleteFavor({
    bookIds,
    userId: user?.id!,
  });

  const onClick = async () => {
    const isConfirmed = confirm("정말 모든 위시리스틀 삭제하시겠어요?");

    if (isConfirmed) {
      try {
        await mutateAsync({ userId: user?.id!, ids: totalIds });
        toast.success("모든 위시리스트가 성공적으로 삭제 됐습니다.");
      } catch (err) {
        postError(err);
      }
    }
  };

  const showSearchModal = () => setSearchWishListModalShow(true);

  return (
    <div className="mutate-wish-list-wrap">
      <Button
        text="도서 추가"
        icon={<MdPlusOne />}
        type="button"
        onClick={showSearchModal}
      />
      <ReuseButton
        style="default"
        text="삭제"
        icon={<FaTrash />}
        type="button"
        size="sm"
        onClick={onClick}
        disabled={isPending}
      />
    </div>
  );
}
