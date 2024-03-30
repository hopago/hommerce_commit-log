// temporary services
import { restFetcher } from "../../../fetcher/restFetcher";

import { createQueryString } from "../../../fetcher/utils";

import { BEST_BOOKS_QUERY } from "../constants/best-books-query";

export const fetchUserPicks = async (userId?: string | null | undefined) => {
  let queryString = createQueryString({
    type: BEST_BOOKS_QUERY.USER_PICKS,
  });

  let path = `/book/best?${queryString}`;

  if (userId) {
    const userQuery = createQueryString({ userId });
    path += `&${userQuery}`;
  }

  try {
    const userPicks = await restFetcher<IBook[]>({
      method: "GET",
      path,
    });

    return userPicks;
  } catch (err) {
    throw err;
  }
};
