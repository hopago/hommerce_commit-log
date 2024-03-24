import { createQueryString } from "../../../../../../fetcher/utils";
import { restFetcher } from "../../../../../../fetcher/restFetcher";
import { ServerError } from "../../../../../../fetcher/error";

import { useMutation } from "@tanstack/react-query";
import { QueryKeys } from "../../../../../../lib/react-query/query-key";
import { getQueryClient } from "../../../../../../lib/react-query/getQueryClient";
import { useHandleError } from "../../../../../hooks/use-handle-error";
import { MutateFns } from "../../../../../../lib/react-query/mutateFn";

type DeleteReviewProps = {
  reviewId: string;
  userId: string;
};

type UseDeleteReviewProps = {
  bookId: string | undefined;
  userId: string | undefined;
};

export const deleteReview = async ({ userId, reviewId }: DeleteReviewProps) => {
  if (!userId) return;

  const queryString = createQueryString({ userId, reviewId });
  const path = `/review?${queryString}`;

  try {
    const response = await restFetcher<{ deletedReviewId: string }>({
      path,
      method: "DELETE",
    });

    if (response) {
      return response.deletedReviewId;
    }
  } catch (err) {
    throw err;
  }
};

export const useDeleteReview = ({ bookId, userId }: UseDeleteReviewProps) => {
  const queryClient = getQueryClient();

  const { mutate, isError, error } = useMutation<
    string | undefined,
    ServerError | Error,
    { userId: string; reviewId: string }
  >({
    mutationFn: ({ userId, reviewId }) =>
      MutateFns.DELETE_REVIEW({ userId, reviewId }),
    onSuccess: (deletedReviewId) => {
      queryClient.setQueryData(
        [QueryKeys.REVIEWS, bookId],
        (prevData: IReview[]) => {
          const filteredData = prevData.filter(
            (prev) => prev._id !== deletedReviewId
          );
          return filteredData;
        }
      );
      queryClient.removeQueries({
        queryKey: [QueryKeys.REVIEW, userId],
      });
    },
  });

  useHandleError({ error, isError });

  const execute = ({
    userId,
    reviewId,
  }: {
    userId: string;
    reviewId: string;
  }) => {
    const isConfirmed = confirm("정말 삭제하시겠습니까?");

    if (isConfirmed) {
      mutate({ userId, reviewId });
    }
  };

  return {
    execute,
  };
};
