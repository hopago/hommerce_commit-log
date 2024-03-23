import { restFetcher } from "../../../../fetcher/restFetcher";
import { createQueryString } from "../../../../fetcher/utils";

type ReviewDocsLengthResponse = {
  docsLength: number;
};

export const getReviewDocsLength = async (bookId: string) => {
  if (!bookId) return;

  const queryString = createQueryString({ bookId });
  const path = `/review/book/docs?${queryString}`;

  try {
    const reviewDocsLength = await restFetcher<ReviewDocsLengthResponse>({
      method: "GET",
      path,
    });

    return reviewDocsLength;
  } catch (err) {
    throw err;
  }
};
