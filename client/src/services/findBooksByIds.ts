import { restFetcher } from "../fetcher/restFetcher";

export const findBooksByIds = async (ids: string[]) => {
  if (!ids.length) return;

  try {
    const books = await restFetcher<IBook[]>({
      path: "/book/ids",
      method: "GET",
      body: ids,
    });

    return books;
  } catch (err) {
    throw err;
  }
};
