import { restFetcher } from "../../../fetcher/restFetcher";
import { IAuthor } from "../../../types/api/author";

export const findBestAuthors = async () => {
  try {
    const authors = await restFetcher<IAuthor[]>({
      method: "GET",
      path: "/author/best",
    });

    return authors;
  } catch (err) {
    throw err;
  }
};
