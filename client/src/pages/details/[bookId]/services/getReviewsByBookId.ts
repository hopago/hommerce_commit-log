import { restFetcher } from "../../../../fetcher/restFetcher";
import { createQueryString } from "../../../../fetcher/utils";

import { ReviewSortOptions } from "../../../../recoil/review-select";

type GetReviewsByBookIdProps = {
  bookId: string;
  pageNum: number;
  sort: ReviewSortOptions;
};

export const getReviewsByBookId = async ({
  bookId,
  pageNum,
  sort,
}: GetReviewsByBookIdProps) => {
  if (!bookId) return;

  const queryString = createQueryString({ pageNum, sort });
  const path = `/review/book/${bookId}?${queryString}`;

  try {
    const paginatedReviewResponse = await restFetcher<PaginatedReviewResponse>({
      method: "GET",
      path,
    });

    return paginatedReviewResponse;
  } catch (err) {
    throw err;
  }
};
