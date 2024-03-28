import { restFetcher } from "../../../../../fetcher/restFetcher";
import { createQueryString } from "../../../../../fetcher/utils";
import { IUser } from "../../../../../types/api/user";

type UpdateUserProps = {
  imageUrl?: string;
  username: string;
};

export const updateUser = async ({ imageUrl, username }: UpdateUserProps) => {
  if (!username) return;

  const queryString = createQueryString({ username });

  try {
    const updatedUser = await restFetcher<IUser>({
      path: `/user?${queryString}`,
      method: "PATCH",
      body: {
        imageUrl,
      },
    });

    return updatedUser;
  } catch (err) {
    throw err;
  }
};
