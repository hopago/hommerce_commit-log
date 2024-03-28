import { restFetcher } from "../../../fetcher/restFetcher";
import { createQueryString } from "../../../fetcher/utils";
import { IUser } from "../../../types/api/user";

export const getUser = async (userId: string) => {
  if (!userId) return;

  const queryString = createQueryString({ userId });

  try {
    const user = await restFetcher<IUser>({
      path: `/user?${queryString}`,
      method: "GET",
    });

    return user;
  } catch (err) {
    throw err;
  }
};
