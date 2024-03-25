import { restFetcher } from "../../../fetcher/restFetcher";
import { createQueryString } from "../../../fetcher/utils";
import { BEST_BOOKS_QUERY } from "../constants/best-books-query";

// preview 3개, 이후 1개씩 fetching
type LimitType = 1 | 3;

type FetchMonthlyPicksProps = {
  pageNum: number;
  limit: LimitType;
};

// 첫 fetching 이후 pageNum 4,5,6 ... / limit 첫 fetching 이후 1

export const fetchMonthlyPicks = async ({
  pageNum,
  limit,
}: FetchMonthlyPicksProps) => {
  const queryString = createQueryString({
    type: BEST_BOOKS_QUERY.MONTHLY_PICKS,
    pageNum,
    limit,
  });

  try {
    const monthlyPicks = await restFetcher<MonthlyPicksResponse>({
      path: `/book/best?${queryString}`,
      method: "GET",
    });

    return monthlyPicks;
  } catch (err) {
    throw err;
  }
};
