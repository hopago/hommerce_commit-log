import { restFetcher } from "../../../fetcher/restFetcher";

import { createQueryString } from "../../../fetcher/utils";

import { BEST_BOOKS_QUERY } from "../constants/best-books-query";

export const fetchBestSellers = async () => {
  const queryString = createQueryString({
    type: BEST_BOOKS_QUERY.BEST_SELLERS,
  });

  try {
    const bestsellers = await restFetcher<BestBook[] | IBook[]>({
      method: "GET",
      path: `/book/best?${queryString}`,
    });

    return bestsellers;
  } catch (err) {
    throw err;
  }
};
