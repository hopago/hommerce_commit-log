import { formatDate } from "../../../../utils/create-formatted-date";
import { cn } from "../../../../lib/utils";

import arwReply from "../../../../assets/ico_arw_reply.png";

import { IReviewReply } from "../../../../types/api/review-reply";

import { useUser } from "@clerk/clerk-react";

import { useEffect, useState } from "react";

import ReviewReplyForm from "./review/ReviewReplyForm";

import { useMutation } from "@tanstack/react-query";
import { MutateFns } from "../../../../lib/react-query/mutateFn";
import { getQueryClient } from "../../../../lib/react-query/getQueryClient";
import { QueryKeys } from "../../../../lib/react-query/query-key";

import { toast } from "sonner";

import { useHandleError } from "../../../hooks/use-handle-error";
import { ERROR_DETAILS } from "../../../../api/constants/errorDetails";

type ReplyItemProps = {
  reply: IReviewReply;
};

type UserActionButtonsProps = {
  setShowEdit: React.Dispatch<React.SetStateAction<boolean>>;
  reviewId: string;
  userId: string;
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
        {isUserPosted && (
          <UserActionsControls
            setShowEdit={setShowEdit}
            reviewId={reply.reviewId}
            userId={user?.id!}
          />
        )}
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

function UserActionsControls({
  setShowEdit,
  reviewId,
  userId,
}: UserActionButtonsProps) {
  const queryClient = getQueryClient();

  const { mutate, isError, error } = useMutation({
    mutationFn: () => MutateFns.DELETE_REVIEW_REPLY({ reviewId, userId }),
    onSuccess: ({ deletedReviewId }) => {
      if (deletedReviewId) {
        queryClient.setQueryData(
          [QueryKeys.REVIEW_REPLY, reviewId],
          (prevData: IReviewReply[]) => {
            const prevReviewReplies = [...prevData];
            return prevData
              ? prevReviewReplies.filter(
                  (review) => review._id !== deletedReviewId
                )
              : prevData;
          }
        );

        toast.success("답글을 성공적으로 삭제했습니다.");
      } else {
        toast.error(
          "데이터를 불러오는 데 문제가 발생했습니다. 페이지를 새로고침 해주세요."
        );
      }
    },
  });

  useHandleError({
    error,
    isError,
    errorDetails: ERROR_DETAILS.PATCH_REVIEW_REPLY,
  });

  const handleShow = () => {
    setShowEdit((prev) => !prev);
  };

  const handleDelete = () => mutate();

  return (
    <>
      <span onClick={handleShow} className="edit">
        수정
      </span>
      <div className="divider" />
      <span className="delete" onClick={handleDelete}>
        삭제
      </span>
    </>
  );
}
