import { useUser } from "@clerk/clerk-react";

import { useState } from "react";

import { useHandleError } from "../../../../hooks/use-handle-error";
import { useReviewReplyMutation } from "./hooks/use-review-reply-mutation";

import { ERROR_DETAILS } from "../../../../../api/constants/errorDetails";

import ReuseButton from "../../../../../_components/common/ReuseButton";
import Textarea from "../../../../../_components/Textarea";

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

  const [desc, setDesc] = useState(initDesc ?? "");

  const {
    postReviewReply,
    isPostPending,
    postError,
    isPostError,
    patchReviewReply,
    isPatchPending,
    patchError,
    isPatchError,
  } = useReviewReplyMutation({
    reviewId,
    userId: user?.id,
    username: user?.username,
    desc,
  });

  const handleClose = () => {
    setShow(false);
  };

  const submitDisabled = desc.trim() === "" || isPostPending || !user;
  const patchDisabled = desc.trim() === "" || isPatchPending || !user;

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDesc(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isPost) {
      postReviewReply();
    } else {
      patchReviewReply();
      setShow(false);
    }
    setDesc("");
  };

  useHandleError({
    error: isPost ? postError : patchError,
    isError: isPost ? isPostError : isPatchError,
    errorDetails: isPost
      ? ERROR_DETAILS.POST_REVIEW_REPLY
      : ERROR_DETAILS.PATCH_REVIEW_REPLY,
  });

  return (
    <div className="review-list__item__review-replies__container">
      <form onSubmit={onSubmit}>
        <Textarea
          placeholder="1000자 이내로 입력해주세요."
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
            disabled={isPost ? submitDisabled : patchDisabled}
          />
        </div>
      </form>
    </div>
  );
}
