import { useUser } from "@clerk/clerk-react";

import { useState } from "react";

import { useMutation } from "@tanstack/react-query";
import { IReviewReply } from "../../../../../types/api/review-reply";
import { ServerError } from "../../../../../fetcher/error";
import { MutateFns } from "../../../../../lib/react-query/mutateFn";
import { getQueryClient } from "../../../../../lib/react-query/getQueryClient";
import { QueryKeys } from "../../../../../lib/react-query/query-key";
import { useHandleError } from "../../../../hooks/use-handle-error";

import { ERROR_DETAILS } from "../../../../../api/constants/errorDetails";

import ReuseButton from "../../../../../_components/ReuseButton";
import Textarea from "../../../../../_components/Textarea";
import { toast } from "sonner";

type ReviewReplyFormProps = {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  reviewId: string;
  isPost?: boolean;
  desc?: string;
};

export default function ReviewReplyForm({
  setShow,
  reviewId,
  isPost,
  desc: initDesc,
}: ReviewReplyFormProps) {
  const { user } = useUser();

  const queryClient = getQueryClient();

  const [desc, setDesc] = useState(initDesc ?? "");

  const {
    mutate: postReviewReply,
    isPending,
    error,
    isError,
  } = useMutation<IReviewReply | undefined, ServerError | Error>({
    mutationFn: () =>
      MutateFns.POST_REVIEW_REPLY({
        userId: user?.id!,
        username: user?.username!,
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

  const { mutate: patchReviewReply } = useMutation<
    IReviewReply | undefined,
    ServerError | Error
  >({
    mutationFn: () =>
      MutateFns.POST_REVIEW_REPLY({
        userId: user?.id!,
        username: user?.username!,
        reviewId,
        desc,
      }),
    onSuccess: (updatedReview) => {
      if (updatedReview) {
        queryClient.setQueryData(
          [QueryKeys.REVIEW_REPLY, reviewId],
          (prevData: IReviewReply[]) => {
            const prevReviewReplies = [...prevData];

            const foundIndex = prevReviewReplies.findIndex(
              (reply) => reply._id === updatedReview._id
            );

            if (foundIndex === -1) {
              toast.error(
                "리뷰 답글 업데이트 중 문제가 발생했습니다. 페이지를 새로고침 해주세요."
              );
              return { ...prevData };
            } else {
              prevReviewReplies[foundIndex] = updatedReview;
              toast.info("리뷰 답글이 업데이트 되었습니다.");

              return prevReviewReplies;
            }
          }
        );
      }
    },
  });

  const handleClose = () => {
    setShow(false);
  };

  const submitDisabled = desc.trim() === "" || isPending || !user;

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDesc(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    isPost ? postReviewReply() : patchReviewReply();

    setDesc("");
  };

  useHandleError({
    error,
    isError,
    errorDetails: ERROR_DETAILS.POST_REVIEW_REPLY,
  });

  return (
    <div className="review-list__item__review-replies__container">
      <form onSubmit={onSubmit}>
        <Textarea
          placeholder="100자 이내로 입력해주세요."
          value={desc}
          onChange={onChange}
        />
        <div className="btn-wrap">
          <ReuseButton
            type="button"
            size="sm"
            text="취소"
            style="default"
            onClick={handleClose}
          />
          <ReuseButton
            type="submit"
            size="sm"
            text="등록"
            style="purple"
            disabled={submitDisabled}
          />
        </div>
      </form>
    </div>
  );
}
