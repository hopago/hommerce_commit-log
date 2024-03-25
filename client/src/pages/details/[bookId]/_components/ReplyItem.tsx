import { formatDate } from "../../../../utils/create-formatted-date";

import arwReply from "../../../../assets/ico_arw_reply.png";

import { IReviewReply } from "../../../../types/api/review-reply";

import { useUser } from "@clerk/clerk-react";

import { useEffect, useState } from "react";

import ReviewReplyForm from "./review/ReviewReplyForm";
import { cn } from "../../../../lib/utils";

type ReplyItemProps = {
  reply: IReviewReply;
};

type UserActionButtonsProps = {
  setShowEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ReplyItem({ reply }: ReplyItemProps) {
  const { user } = useUser();

  const [isUserPosted, setIsUserPosted] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    if (reply && user) {
      if (reply.userId.toLowerCase() === user.id.toLowerCase()) {
        setIsUserPosted(true);
      }
    }
  }, [reply]);

  // TODO: 수정 상태 UI 변경 및 수정 테스트

  return (
    <div className="reply-item">
      <div className="reply-item__reply-info">
        <div className="icon-wrap">
          <img src={arwReply} alt="reply-icon" />
        </div>
        <span>{reply.username}</span>
        <div className="divider" />
        <span>{formatDate(reply.createdAt)}</span>
        <div className="divider" />
        {isUserPosted && <UserActionsControls setShowEdit={setShowEdit} />}
      </div>
      <div
        className={cn(showEdit ? "reply-item__edit-form" : "reply-item__desc")}
      >
        {showEdit ? (
          <ReviewReplyForm
            reviewId={reply.reviewId}
            setShow={setShowEdit}
            desc={reply.desc}
          />
        ) : (
          <span>{reply.desc}</span>
        )}
      </div>
    </div>
  );
}

function UserActionsControls({ setShowEdit }: UserActionButtonsProps) {
  const handleShow = () => {
    setShowEdit((prev) => !prev);
  };

  return (
    <>
      <span onClick={handleShow} className="edit">
        수정
      </span>
      <div className="divider" />
      <span className="delete">삭제</span>
    </>
  );
}
