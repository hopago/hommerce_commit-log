import { PAGE_SIZE } from "../../../../../../../constants/page";

import { SetterOrUpdater } from "recoil";

import { useMutation } from "@tanstack/react-query";
import { getQueryClient } from "../../../../../../../../lib/react-query/getQueryClient";
import { ServerError } from "../../../../../../../../fetcher/error";
import { postReview } from "../../../../../services/postReview";
import { QueryKeys } from "../../../../../../../../lib/react-query/query-key";

import { toast } from "sonner";
import { useHandleError } from "../../../../../../../hooks/use-handle-error";
import { ERROR_DETAILS } from "../../../../../../../../api/constants/errorDetails";

type UsePostReviewProps = {
  userId: string | undefined;
  bookId: string;
  setShow: SetterOrUpdater<boolean>;
};

export type MutationProps = {
  userId: string;
  username: string;
  bookTitle: string;
  hasNoReview?: boolean;
  review: TPostReviewInput;
};

export const usePostReview = ({
  bookId,
  setShow,
  userId,
}: UsePostReviewProps) => {
  const queryClient = getQueryClient();
  const { mutate, isPending, isError, error } = useMutation<
    IReview,
    ServerError | Error,
    MutationProps
  >({
    mutationFn: ({
      hasNoReview,
      userId,
      username,
      bookTitle,
      review,
    }: MutationProps) =>
      postReview({
        hasNoReview,
        userId,
        username,
        bookId,
        bookTitle,
        review,
      }),
    onSuccess: (newReview: IReview) => {
      const prevData = queryClient.getQueryData<{ docsLength: number }>([
        QueryKeys.REVIEW_LENGTH,
        bookId,
      ]);

      if (prevData) {
        queryClient.setQueryData(
          [QueryKeys.REVIEW_LENGTH, bookId],
          { docsLength: prevData.docsLength + 1 }
        );
      }

      queryClient.setQueryData([QueryKeys.REVIEW, userId], newReview);

      queryClient.setQueryData(
        [QueryKeys.REVIEWS, bookId],
        (
          prevData: PaginatedReviewResponse | undefined
        ): PaginatedReviewResponse => {
          const totalReviewsBeforeAdd = prevData
            ? prevData.pagination.totalReviews
            : 0;

          const totalReviewsAfterAdd = totalReviewsBeforeAdd + 1;

          const maxReviewsPerPage = PAGE_SIZE;

          const totalPagesAfterAdd = Math.ceil(
            totalReviewsAfterAdd / maxReviewsPerPage
          );

          const hasNextPage =
            totalPagesAfterAdd >
            (prevData ? prevData.pagination.currentPage : 1);

          if (!prevData) {
            return {
              reviews: [newReview],
              pagination: {
                currentPage: 1,
                totalReviews: 1,
                totalPages: 1,
                hasNextPage: false,
              },
            };
          }

          return {
            reviews: [newReview, ...prevData.reviews],
            pagination: {
              ...prevData.pagination,
              totalReviews: totalReviewsAfterAdd,
              totalPages: totalPagesAfterAdd,
              hasNextPage: hasNextPage,
            },
          };
        }
      );

      toast.success("리뷰 작성을 완료했어요.");
    },
  });

  const handlePost = async (
    e: React.FormEvent<HTMLFormElement>,
    review: MutationProps
  ) => {
    e.preventDefault();

    mutate(review);

    setShow(false);
  };

  useHandleError({
    error,
    isError,
    errorDetails: ERROR_DETAILS.POST_REVIEW,
  });

  return {
    handlePost,
    isPending,
  };
};
