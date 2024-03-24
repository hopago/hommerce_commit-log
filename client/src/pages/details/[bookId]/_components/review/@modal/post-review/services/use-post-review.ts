import { useMutation } from "@tanstack/react-query";
import { getQueryClient } from "../../../../../../../../lib/react-query/getQueryClient";
import { ServerError } from "../../../../../../../../fetcher/error";
import { postReview } from "../../../../../services/postReview";
import { QueryKeys } from "../../../../../../../../lib/react-query/query-key";

import { toast } from "sonner";
import { useHandleError } from "../../../../../../../hooks/use-handle-error";
import { postError } from "../../../../../../../services/postError";
import { ERROR_DETAILS } from "../../../../../../../../api/constants/errorDetails";

export type MutationProps = {
  userId: string;
  username: string;
  bookTitle: string;
  hasNoReview?: boolean;
  review: TPostReviewInput;
};

export const usePostReview = ({ bookId }: { bookId: string }) => {
  const queryClient = getQueryClient();
  const { mutate, isPending } = useMutation<
    IReview,
    ServerError | Error | unknown,
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
      queryClient.setQueryData(
        [QueryKeys.REVIEWS, bookId],
        (prevData: IReview[]) => [newReview, ...prevData]
      );
      toast.success("리뷰 작성을 완료했어요.");
    },
    onError: (error) => {
      if (error instanceof ServerError) {
        useHandleError({
          error,
          isError: true,
          errorDetails: ERROR_DETAILS.POST_REVIEW,
        });
      } else if (error instanceof Error) {
        toast.error("일시적 오류입니다. 잠시 후 다시 시도해주세요.");
        postError(error);
      } else {
        toast.error("예기치 못한 오류입니다.");
        postError(error);
      }
    },
  });

  const handlePost = (
    e: React.FormEvent<HTMLFormElement>,
    review: MutationProps
  ) => {
    e.preventDefault();

    mutate(review);
  };

  return {
    handlePost,
    isPending,
  };
};
