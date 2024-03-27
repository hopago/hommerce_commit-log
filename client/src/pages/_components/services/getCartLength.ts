import { restFetcher } from "../../../fetcher/restFetcher";

import { createQueryString } from "../../../fetcher/utils";

export const getCartLength = async (userId: string) => {
  if (!userId) return;

  const queryString = createQueryString({ userId });

  try {
    const cartItemLength = await restFetcher<{ docsLength: number }>({
      path: `/cart/docs?${queryString}`,
      method: "GET",
    });

    return cartItemLength;
  } catch (err) {
    throw err;
  }
};
