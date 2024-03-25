import { MdArrowRight } from "react-icons/md";

import { useAuth } from "@clerk/clerk-react";

import { useNavigate } from "react-router-dom";

import { IReviewReply } from "../../../../../types/api/review-reply";

import ReplyItem from "../ReplyItem";
import ReviewReplyForm from "./ReviewReplyForm";

type ReviewRepliesProps = {
  replies: IReviewReply[] | undefined;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  reviewId: string;
};

export default function ReviewRepliesContainer({
  replies,
  setShow,
  reviewId,
}: ReviewRepliesProps) {
  const { isSignedIn } = useAuth();

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <div className="review-list__item__review-replies">
      {isSignedIn ? (
        <ReviewReplyForm setShow={setShow} reviewId={reviewId} isPost={true} />
      ) : (
        <div className="review-list__item__review-replies__bg">
          <div className="reply-form-no-auth">
            <span>답글 등록은 로그인 후 이용할 수 있습니다.</span>
            <button onClick={handleClick}>
              <MdArrowRight className="icon" />
              <span>로그인</span>
            </button>
          </div>
        </div>
      )}
      {Array.isArray(replies) &&
        replies.length > 0 &&
        replies.map((reply) => <ReplyItem key={reply._id} reply={reply} />)}
    </div>
  );
}
