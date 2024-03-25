import { useMutation } from "@tanstack/react-query";
import { getQueryClient } from "../../../../../../lib/react-query/getQueryClient";
import { IReviewReply } from "../../../../../../types/api/review-reply";
import { ServerError } from "../../../../../../fetcher/error";
import { MutateFns } from "../../../../../../lib/react-query/mutateFn";
import { QueryKeys } from "../../../../../../lib/react-query/query-key";

import { toast } from "sonner";

type UseReviewReplyMutationProps = {
  reviewId: string;
  userId: string | undefined;
  username: string | undefined | null;
  desc: string;
};

export function useReviewReplyMutation({
  reviewId,
  userId,
  username,
  desc,
}: UseReviewReplyMutationProps) {
  const queryClient = getQueryClient();

  const {
    mutate: postReviewReply,
    isPending: isPostPending,
    error: postError,
    isError: isPostError,
  } = useMutation<IReviewReply | undefined, ServerError | Error>({
    mutationFn: () =>
      MutateFns.POST_REVIEW_REPLY({
        userId: userId!,
        username: username!,
        reviewId,
        desc,
      }),
    onSuccess: (newReview: IReviewReply | undefined) => {
      if (newReview) {
        queryClient.setQueryData(
          [QueryKeys.REVIEW_REPLY, reviewId],
          (prevData: IReviewReply[]) => {
            const prevReviewReplies = [...prevData];
            prevReviewReplies.push(newReview);
            return prevReviewReplies;
          }
        );
      }
    },
  });

  const {
    mutate: patchReviewReply,
    isPending: isPatchPending,
    error: patchError,
    isError: isPatchError,
  } = useMutation<IReviewReply | undefined, ServerError | Error>({
    mutationFn: () =>
      MutateFns.PATCH_REVIEW_REPLY({
        userId: userId!,
        reviewId,
        desc,
      }),
    onSuccess: (updatedReview) => {
      if (updatedReview) {
        queryClient.setQueryData(
          [QueryKeys.REVIEW_REPLY, reviewId],
          (prevData: IReviewReply[]) => {
            return prevData.map((reply) =>
              reply._id === updatedReview._id ? updatedReview : reply
            );
          }
        );
        toast.info("리뷰 답글이 업데이트 되었습니다.");
      }
    },
  });

  return {
    postReviewReply,
    isPostPending,
    postError,
    isPostError,
    patchReviewReply,
    isPatchPending,
    patchError,
    isPatchError,
  };
}
