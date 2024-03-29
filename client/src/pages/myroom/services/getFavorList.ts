import { restFetcher } from "../../../fetcher/restFetcher";

export const getFavorList = async (userId: string) => {
  if (!userId) return;

  try {
    const favorList = await restFetcher<IFavor>({
      path: `/favor/${userId}`,
      method: "GET",
    });

    return favorList;
  } catch (err) {
    throw err;
  }
};
