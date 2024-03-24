import { MdArrowRight } from "react-icons/md";

import { useNavigate } from "react-router-dom";

import ReplyItem from "../ReplyItem";

import { IReviewReply } from "../../../../../types/api/review-reply";

type ReviewRepliesProps = {
  replies: IReviewReply[] | undefined;
};

export default function ReviewRepliesContainer({
  replies,
}: ReviewRepliesProps) {
  // TODO: useAuth()
  const isLogin = false;

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <div className="review-list__item__review-replies">
      {isLogin ? (
        <>{/* TODO: POST REPLY FORM */}</>
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
        replies.length &&
        replies.map((reply) => <ReplyItem key={reply._id} reply={reply} />)}
    </div>
  );
}
