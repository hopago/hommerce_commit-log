type TBestBooksQuery = Record<string, BestBooksQueryType>;

export const BEST_BOOKS_QUERY: TBestBooksQuery = {
  BEST_SELLERS: "bestsellers",
  USER_PICKS: "userpicks",
  MONTHLY_PICKS: "monthlypicks",
};
