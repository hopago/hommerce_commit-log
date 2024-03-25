import { restFetcher } from "../../../../fetcher/restFetcher";

type UpdateReviewProps = {
  userId: string;
  bookId: string;
  rating?: string;
  keyword?: string;
  desc?: string;
};

export const updateReview = async ({
  userId,
  bookId,
  rating,
  keyword,
  desc,
}: UpdateReviewProps) => {
  if (!rating || !keyword || !desc) return;

  const path = `/review/user/${userId}/book/${bookId}`;

  try {
    const updatedReview = await restFetcher<IReview>({
      path,
      method: "PATCH",
      body: {
        rating,
        keyword,
        desc,
      },
    });

    return updatedReview;
  } catch (err) {
    throw err;
  }
};
