import { restFetcher } from "../../../fetcher/restFetcher";

export const getCart = async (userId: string) => {
  if (!userId) return;

  try {
    const cart = await restFetcher<ICart>({
      path: `/cart/${userId}`,
      method: "GET",
    });

    return cart;
  } catch (err) {
    throw err;
  }
};
