import { restFetcher } from "../../../../fetcher/restFetcher";
import { createQueryString } from "../../../../fetcher/utils";

export const findTodayPick = async <T>(
  type: LangPageBestBookQueriesValues,
  lang: BookParentCategory,
  category?: BookSubCategory
) => {
  if (!type || !lang) return;

  let queryString;

  queryString = createQueryString({ type, lang });

  if (category) {
    const categoryQueryString = createQueryString({ category });
    queryString += `&${categoryQueryString}`;
  }

  try {
    const todayPicks = await restFetcher<T>({
      path: `/book/lang?${queryString}`,
      method: "GET",
    });

    return todayPicks;
  } catch (err) {
    throw err;
  }
};
