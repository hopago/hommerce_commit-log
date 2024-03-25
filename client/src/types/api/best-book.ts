type BestBooksQueryType = "bestsellers" | "userPicks" | "monthlyPicks";

interface BestBook {
  _id: string; // bestBook _id
  averageRating: number;
  keywordCount: number;
  bookDetails: IBook;
}
