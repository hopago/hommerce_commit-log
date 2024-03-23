import { restFetcher } from "../../../fetcher/restFetcher";

type GetSubscriptionLengthProps = {
  bookId: string;
};

type GetSubscriptionLengthResponse = {
  docsLength: number;
};

export const getSubscriptionLength = async ({
  bookId,
}: GetSubscriptionLengthProps) => {
  const path = `/favor/docs/book/${bookId}`;

  try {
    const favoredLength = await restFetcher<GetSubscriptionLengthResponse>({
      method: "GET",
      path,
    });

    return favoredLength;
  } catch (err) {
    throw err;
  }
};
