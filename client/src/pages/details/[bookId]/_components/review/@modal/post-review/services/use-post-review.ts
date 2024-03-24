import { useMutation } from "@tanstack/react-query";
import { getQueryClient } from "../../../../../../../../lib/react-query/getQueryClient";
import { ServerError } from "../../../../../../../../fetcher/error";
import { postReview } from "../../../../../services/postReview";
import { QueryKeys } from "../../../../../../../../lib/react-query/query-key";

import { toast } from "sonner";
import { useHandleError } from "../../../../../../../hooks/use-handle-error";
import { ERROR_DETAILS } from "../../../../../../../../api/constants/errorDetails";

import { SetterOrUpdater } from "recoil";

type UsePostReviewProps = {
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

export const usePostReview = ({ bookId, setShow }: UsePostReviewProps) => {
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
      queryClient.refetchQueries({
        queryKey: [QueryKeys.REVIEW_LENGTH, bookId],
      });
      queryClient.setQueryData(
        [QueryKeys.REVIEWS, bookId],
        (prevData: IReview[]) => [newReview, ...prevData]
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
