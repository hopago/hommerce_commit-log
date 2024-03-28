import { restFetcher } from "../../../../fetcher/restFetcher";

type UpdateReviewProps = {
  userId: string;
  bookId: string;
  rating?: string;
  keyword?: string;
  desc?: string;
};

// 유저 리뷰 수정 로직
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
