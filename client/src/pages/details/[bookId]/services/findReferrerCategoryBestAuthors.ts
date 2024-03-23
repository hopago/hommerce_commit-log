import { restFetcher } from "../../../../fetcher/restFetcher";
import { createQueryString } from "../../../../fetcher/utils";
import { IAuthor } from "../../../../types/api/author";

type FindReferrerCategoryBestAuthorsProps = {
  bookId?: string;
  category?: BookSubCategory;
};

export const findReferrerCategoryBestAuthors = async ({
  bookId,
  category,
}: FindReferrerCategoryBestAuthorsProps) => {
  if (!bookId && !category) return;
  const params: Record<string, string> = {};
  if (bookId) params.bookId = bookId;
  if (category) params.category = category;

  const queryString = createQueryString(params);

  const path = `/author/s?${queryString}`;

  const authors = await restFetcher<IAuthor[]>({
    method: "GET",
    path,
  });

  return authors;
};
