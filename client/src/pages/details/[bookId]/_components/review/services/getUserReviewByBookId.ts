import { restFetcher } from "../../../../../../fetcher/restFetcher";

type GetUserReviewByBookIdProps = {
  userId: string;
  bookId: string;
};

export const getUserReviewByBookId = async ({
  userId,
  bookId,
}: GetUserReviewByBookIdProps) => {
  if (!userId || !bookId) return;

  const path = `/review/user/${userId}/book/${bookId}`;

  try {
    const userReview = restFetcher<IReview>({
      method: "GET",
      path,
    });

    return userReview;
  } catch (err) {
    throw err;
  }
};
