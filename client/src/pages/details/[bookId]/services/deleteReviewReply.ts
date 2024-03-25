import { restFetcher } from "../../../../fetcher/restFetcher";

import { createQueryString } from "../../../../fetcher/utils";

import { DeletedReviewResponse } from "../../../../types/api/review-reply";

type DeleteReviewReplyProps = {
  reviewId: string;
  userId: string;
};

export const deleteReviewReply = async ({
  reviewId,
  userId,
}: DeleteReviewReplyProps) => {
  const queryString = createQueryString({ userId });

  try {
    const deletedReviewId = await restFetcher<DeletedReviewResponse>({
      path: `/review/reply/${reviewId}?${queryString}`,
      method: "DELETE",
    });

    return deletedReviewId;
  } catch (err) {
    throw err;
  }
};
