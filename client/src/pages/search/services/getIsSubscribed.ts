import { restFetcher } from "../../../fetcher/restFetcher";

type GetIsSubscribedProps = {
  bookId: string;
  userId: string;
};

export const getIsSubscribed = async ({
  bookId,
  userId,
}: GetIsSubscribedProps) => {
  const path = `/favor/subscription/user/${userId}/book/${bookId}`;

  try {
    const isSubscribed = await restFetcher<boolean>({
      method: "GET",
      path,
    });

    return isSubscribed;
  } catch (err) {
    throw err;
  }
};
