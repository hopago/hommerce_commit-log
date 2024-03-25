import { useMutation } from "@tanstack/react-query";
import { getQueryClient } from "../../../../../../../../lib/react-query/getQueryClient";
import { MutateFns } from "../../../../../../../../lib/react-query/mutateFn";
import { ServerError } from "../../../../../../../../fetcher/error";
import { QueryKeys } from "../../../../../../../../lib/react-query/query-key";

import { toast } from "sonner";
import { SetterOrUpdater } from "recoil";

import { useHandleError } from "../../../../../../../hooks/use-handle-error";
import { ERROR_DETAILS } from "../../../../../../../../api/constants/errorDetails";

type UseUpdateReviewProps = {
  bookId: string;
  userId: string;
  setShow: SetterOrUpdater<boolean>;
};

type UpdateReviewProps = {
  rating?: string;
  keyword?: string;
  desc?: string;
};

export const useUpdateReview = ({
  userId,
  bookId,
  setShow,
}: UseUpdateReviewProps) => {
  const queryClient = getQueryClient();
  const { mutate, isPending, isError, error } = useMutation<
    IReview | undefined,
    ServerError | Error,
    UpdateReviewProps
  >({
    mutationFn: ({ rating, keyword, desc }: UpdateReviewProps) =>
      MutateFns.UPDATE_REVIEW({ userId, bookId, rating, keyword, desc }),
    onSuccess: (newReview: IReview | undefined) => {
      if (newReview) {
        // 현재 유저 리뷰, 총 리뷰
        queryClient.setQueryData([QueryKeys.REVIEW, userId], newReview);

        queryClient.setQueryData(
          [QueryKeys.REVIEWS, bookId],
          (prevData: PaginatedReviewResponse | undefined) => {
            if (!prevData) {
              toast.error(
                "데이터를 불러오는 데 문제가 발생했습니다. 페이지를 새로고침 해주세요."
              );
              return;
            }

            const prevReviews = [...prevData.reviews];
            const foundIndex = prevReviews.findIndex(
              (prev) => prev._id === newReview._id
            );

            if (foundIndex === -1) {
              toast.error(
                "리뷰 업데이트 중 문제가 발생했습니다. 페이지를 새로고침 해주세요."
              );
              return { ...prevData };
            } else {
              prevReviews[foundIndex] = newReview;
              toast.info("리뷰가 업데이트 되었습니다.");

              return { ...prevData, reviews: prevReviews };
            }
          }
        );

        // 리뷰 총점
        queryClient.invalidateQueries({
          queryKey: [QueryKeys.REVIEW_TOTAL, bookId],
        });
      }
    },
  });

  const handlePatch = async (review: UpdateReviewProps) => {
    mutate(review);

    setShow(false);
  };

  useHandleError({
    error,
    isError,
    errorDetails: ERROR_DETAILS.POST_REVIEW,
  });

  return {
    isPending,
    handlePatch,
  };
};
