import { restFetcher } from "../../../fetcher/restFetcher";

type GetSubscriptionLengthProps = {
  bookId: string;
};

export const getSubscriptionLength = async ({
  bookId,
}: GetSubscriptionLengthProps) => {
  const path = `/favor/docs/book/${bookId}`;

  try {
    const favoredLength = await restFetcher<number>({
      method: "GET",
      path,
    });

    return favoredLength;
  } catch (err) {
    throw err;
  }
};
