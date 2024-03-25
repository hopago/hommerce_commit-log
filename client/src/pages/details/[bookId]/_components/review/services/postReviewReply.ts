import { toast } from "sonner";
import { restFetcher } from "../../../../../../fetcher/restFetcher";
import { IReviewReply } from "../../../../../../types/api/review-reply";
import { createQueryString } from "../../../../../../fetcher/utils";

type PostReviewReplyProps = {
  userId: string;
  username: string;
  reviewId: string;
  desc: string;
};

export const postReviewReply = async ({
  userId,
  username,
  reviewId,
  desc,
}: PostReviewReplyProps) => {
  if (!userId || !username || !reviewId) return;
  if (desc.length > 100) {
    toast.message("입력 가능한 글자수(100자)를 초과했습니다.");
    return;
  }
  if (desc.trim() === "" || !desc) {
    toast.message("답글을 입력해주세요.");
    return;
  }

  const queryString = createQueryString({ userId });

  try {
    const newReviewReply = await restFetcher<IReviewReply>({
      method: "POST",
      path: `/review/reply/${reviewId}?${queryString}`,
      body: {
        username,
        desc,
      },
    });

    return newReviewReply;
  } catch (err) {
    throw err;
  }
};
