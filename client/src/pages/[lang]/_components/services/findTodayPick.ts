import { restFetcher } from "../../../../fetcher/restFetcher";
import { createQueryString } from "../../../../fetcher/utils";

export const findTodayPick = async <T>(
  type: LangPageBestBookQueriesValues,
  lang: BookParentCategory
) => {
  if (!type || !lang) return;

  const queryString = createQueryString({ type, lang });

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
