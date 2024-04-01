type BestBooksQueryType = "bestsellers" | "userpicks" | "monthlypicks";

interface BestBook {
  _id: string;
  averageRating: number;
  keywordCount: number;
  bookDetails: IBook;
}

type MonthlyPicksResponse = {
  bestBooks: {
    _id: any;
    bookDetails: IBook;
  }[];
  hasNextPage: boolean;
  totalCount: number;
};
