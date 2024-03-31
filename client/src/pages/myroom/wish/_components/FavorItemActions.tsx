import { Link } from "react-router-dom";

import { useDeleteFavor } from "../hooks/use-delete-favor";

import { useUser } from "@clerk/clerk-react";

import { postError } from "../../../services/postError";

import { toast } from "sonner";

type FavorItemActionsProps = {
  bookId: string;
};

export default function FavorItemActions({ bookId }: FavorItemActionsProps) {
  const { user } = useUser();
  const { mutateAsync } = useDeleteFavor({
    bookIds: [bookId],
    userId: user?.id!,
  });

  const onClick = async () => {
    try {
      await mutateAsync({ userId: user?.id!, ids: [bookId] });

      toast.success("위시리스트를 성공적으로 삭제했어요.");
    } catch (err) {
      postError(err);
    }
  };

  return (
    <ul className="favor-item-actions">
      <div className="favor-item-actions__wrap">
        <li>
          <Link to={`/details/${bookId}`} className="link">
            상품 상세
          </Link>
        </li>
        <li onClick={onClick}>삭제</li>
      </div>
    </ul>
  );
}
