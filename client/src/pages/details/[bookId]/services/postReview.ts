import { ServerError } from "../../../../fetcher/error";
import { restFetcher } from "../../../../fetcher/restFetcher";
import { postError } from "../../../services/postError";

import { REVIEW_EVENT } from "../_components/review/constants/review-point";

type PostReviewProps = {
  userId: string;
  username: string;
  bookId: string;
  bookTitle: string;
  hasNoReview?: boolean;
  review: TPostReviewInput;
};

export const postReview = async ({
  hasNoReview,
  review,
  userId,
  username,
  bookId,
  bookTitle,
}: PostReviewProps) => {
  const path = `/review/user/${userId}`;

  const body = {
    ...review,
    userId,
    username,
    bookId,
    bookTitle,
  };

  try {
    const newReview = await restFetcher<IReview>({
      path,
      method: "POST",
      body,
    });

    if (hasNoReview) {
      const path = `/point/${userId}`;

      try {
        await restFetcher({
          path,
          method: "PATCH",
          body: {
            point: REVIEW_EVENT.FIRST_REVIEW_POINT_EVENT,
          },
        });
      } catch (err) {
        if (err instanceof Error || err instanceof ServerError) {
          postError(err);
        }
      }
    }

    return newReview;
  } catch (err) {
    throw err;
  }
};
