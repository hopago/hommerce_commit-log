import { restFetcher } from "../fetcher/restFetcher";
import { createQueryString } from "../fetcher/utils";

export const findBooksByIds = async (ids: string[]) => {
  if (!ids.length) return;

  const idsParams = ids.join(",");

  const queryString = createQueryString({ ids: idsParams });

  try {
    const books = await restFetcher<IBook[]>({
      path: `/book/ids?${queryString}`,
      method: "GET",
    });

    return books;
  } catch (err) {
    throw err;
  }
};
