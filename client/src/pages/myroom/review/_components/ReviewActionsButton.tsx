import { useRef } from "react";

import { useToggle } from "../../../hooks/use-toggle";

import { MdClose, MdMoreVert } from "react-icons/md";

import { useDeleteUserReview } from "../hooks/use-update-user-review";

import Button from "../../../../_components/common/Button";

import { Navigate } from "../../_components/Navigate";

type ReviewActionsProps = {
  id: string;
  userId: string;
};

export default function ReviewActions({ id, userId }: ReviewActionsProps) {
  const containerRef = useRef<HTMLTableDataCellElement>(null);

  const { show, toggleClick } = useToggle(containerRef);

  return (
    <td className="review-actions" ref={containerRef}>
      {!show ? (
        <MdMoreVert onClick={toggleClick} className="more-vert" size={21} />
      ) : (
        <MdClose onClick={toggleClick} className="close" />
      )}
      {show && (
        <div className="review-actions-buttons">
          <Navigate path={`/reviews/${id}`} text="상세보기" />
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
      backgroundColor="#BF444A"
      disabled={isPending}
    />
  );
}
