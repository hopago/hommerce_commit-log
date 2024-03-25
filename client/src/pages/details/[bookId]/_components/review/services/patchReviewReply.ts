import { toast } from "sonner";
import { restFetcher } from "../../../../../../fetcher/restFetcher";
import { IReviewReply } from "../../../../../../types/api/review-reply";
import { createQueryString } from "../../../../../../fetcher/utils";

type PatchReviewReplyProps = {
  userId: string;
  reviewId: string;
  desc: string;
};

export const patchReviewReply = async ({
  userId,
  reviewId,
  desc,
}: PatchReviewReplyProps) => {
  if (!userId || !reviewId) return;
  if (desc.length > 1000) {
    toast.message("입력 가능한 글자수(1000자)를 초과했습니다.");
    return;
  }
  if (desc.trim() === "" || !desc) {
    toast.message("답글을 입력해주세요.");
    return;
  }

  const queryString = createQueryString({ userId });

  try {
    const updatedReviewReply = await restFetcher<IReviewReply>({
      method: "PATCH",
      path: `/review/reply/${reviewId}?${queryString}`,
      body: {
        desc,
      },
    });

    return updatedReviewReply;
  } catch (err) {
    throw err;
  }
};
