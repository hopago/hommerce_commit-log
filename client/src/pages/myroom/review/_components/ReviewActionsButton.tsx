import { useRef } from "react";

import { useToggle } from "../../../hooks/use-toggle";

import { MdClose, MdMoreVert } from "react-icons/md";

import { useDeleteUserReview } from "../hooks/use-update-user-review";

import Button from "../../../../_components/common/Button";

import { Navigate } from "../../_components/Navigate";

type ReviewActionsProps = {
  id: string;
  userId: string;
  bookId: string;
};

export default function ReviewActions({
  id,
  userId,
  bookId,
}: ReviewActionsProps) {
  const containerRef = useRef<HTMLTableDataCellElement>(null);

  const { show, toggleClick } = useToggle(containerRef);

  return (
    <td className="review-actions" ref={containerRef}>
      {!show ? (
        <MdMoreVert
          onClick={toggleClick}
          className="more-vert"
          size={21}
          style={{ cursor: "pointer" }}
        />
      ) : (
        <MdClose
          onClick={toggleClick}
          className="close"
          style={{ cursor: "pointer" }}
        />
      )}
      {show && (
        <div className="review-actions-buttons">
          <Navigate path={`/details/${bookId}`} text="상세보기" />
          <Delete userId={userId} id={id} />
        </div>
      )}
    </td>
  );
}

function Delete({ id, userId }: { id: string; userId: string }) {
  const { mutate, isPending } = useDeleteUserReview({ userId });

  const onClick = () => {
    mutate(id);
  };

  return (
    <Button
      type="button"
      text="리뷰 삭제"
      onClick={onClick}
      ariaLabel="리뷰 삭제"
      className="review-action"
      backgroundColor="rgb(232, 66, 47)"
      disabled={isPending}
      border="none"
    />
  );
}
