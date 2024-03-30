import { restFetcher } from "../../../../fetcher/restFetcher";

import { createQueryString } from "../../../../fetcher/utils";

export const deleteFavorItem = async (userId: string, bookId: string) => {
  if (!bookId || !userId) return;

  const queryString = createQueryString({ bookId });

  try {
    const response = await restFetcher<{ deletedFavorId: string }>({
      path: `/favor/${userId}?${queryString}`,
      method: "DELETE",
    });

    return response;
  } catch (err) {
    throw err;
  }
};
