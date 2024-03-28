import { restFetcher } from "../../../../../../fetcher/restFetcher";
import { createQueryString } from "../../../../../../fetcher/utils";

export const likeReview = async (
  reviewId: string,
  userId: string | undefined | null
) => {
  if (!reviewId || !userId) return;

  const queryString = createQueryString({ userId });

  try {
    const updatedReview = await restFetcher<IReview>({
      path: `/review/${reviewId}?${queryString}`,
      method: "PATCH",
    });

    return updatedReview;
  } catch (err) {
    throw err;
  }
};
