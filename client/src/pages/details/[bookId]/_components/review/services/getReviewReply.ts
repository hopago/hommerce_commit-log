import { ServerError } from "../../../../../../fetcher/error";
import { restFetcher } from "../../../../../../fetcher/restFetcher";
import { IReviewReply } from "../../../../../../types/api/review-reply";
import { postError } from "../../../../../services/postError";

export const getReviewReply = async (reviewId: string) => {
  if (!reviewId) return;

  try {
    const replies = await restFetcher<IReviewReply[]>({
      path: `/review/reply/${reviewId}`,
      method: "GET",
    });

    return replies;
  } catch (err) {
    if (err instanceof ServerError || err instanceof Error) {
      postError(err);
    }
  }
};
