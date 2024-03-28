import { MdThumbUp } from "react-icons/md";
import reply from "../../../../../assets/ico_reply.png";
import { useMutation } from "@tanstack/react-query";
import { MutateFns } from "../../../../../lib/react-query/mutateFn";
import { useUser } from "@clerk/clerk-react";
import { getQueryClient } from "../../../../../lib/react-query/getQueryClient";
import { QueryKeys } from "../../../../../lib/react-query/query-key";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useHandleError } from "../../../../hooks/use-handle-error";
import { cn } from "../../../../../lib/utils";

type ReviewInteractProps = {
  repliesLength: number;
  liked: string[];
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  reviewId: string;
};

export default function ReviewInteract({
  repliesLength,
  liked,
  setShow,
  reviewId,
}: ReviewInteractProps) {
  const { user } = useUser();
  const { bookId } = useParams();
  const isOwnReview = reviewId === user?.id;

  const { mutate, isError, error } = useMutation<IReview | undefined>({
    mutationFn: () => MutateFns.LIKE_REVIEW(reviewId, user?.id),
    onSuccess: (updatedReview) => {
      if (updatedReview) {
        const queryClient = getQueryClient();

        queryClient.setQueryData<PaginatedReviewResponse>(
          [QueryKeys.REVIEWS, bookId],
          (prevData) => {
            if (prevData) {
              const findIndex = prevData.reviews.findIndex(
                (review) => review._id === reviewId
              );

              if (findIndex !== -1) {
                const newReviews = [
                  ...prevData.reviews.slice(0, findIndex),
                  updatedReview,
                  ...prevData.reviews.slice(findIndex + 1),
                ];

                return {
                  ...prevData,
                  reviews: newReviews,
                };
              } else {
                toast.error(
                  "리뷰 업데이트는 성공했으나 화면에는 보이지 않을 수 있어요.\n페이지를 새로고침 해주세요."
                );
                return prevData;
              }
            }
          }
        );

        if (isOwnReview) {
          queryClient.setQueryData<IReview>(
            [QueryKeys.REVIEW, user?.id],
            updatedReview
          );
        }
      }
    },
  });

  const isActive = liked?.some(
    (userId) => userId.toLowerCase() === user?.id.toLowerCase()
  );

  useHandleError({ isError, error });

  const handleLikeReview = () => {
    if (!user) {
      toast.info("로그인 이후 이용하실 수 있습니다.");
      return;
    }

    mutate();
  };

  const handleShowReply = () => {
    setShow((prev) => !prev);
  };

  return (
    <div className="review-list__item__review-interact">
      <div className="like-section" onClick={handleLikeReview}>
        <MdThumbUp className={cn("icon", isActive && "active")} />
        <span>&nbsp;{liked?.length ?? 0}</span>
      </div>
      <div className="reply-section" onClick={handleShowReply}>
        <img src={reply} alt="reply-icon" />
        <span>답글&nbsp;{repliesLength}</span>
      </div>
    </div>
  );
}
