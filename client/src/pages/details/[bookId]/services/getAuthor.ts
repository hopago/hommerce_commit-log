import { restFetcher } from "../../../../fetcher/restFetcher";

import { createQueryString } from "../../../../fetcher/utils";

import { IAuthor } from "../../../../types/api/author";

export const getAuthor = async (name: string) => {
  if (!name) return;

  const queryString = createQueryString({ name });

  const path = `/author?${queryString}`;

  try {
    const author = await restFetcher<IAuthor[]>({
      method: "GET",
      path,
    });

    return author;
  } catch (err) {
    throw err;
  }
};
