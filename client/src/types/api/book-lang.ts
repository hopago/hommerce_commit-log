type LangPageBestBookQueriesValues = "todaypicks" | "todaybest" | "newbook";

type TodayBestResponse = (IBook & {
  averageRating: number;
  reviewCount: number;
})[];

type NewBookResponse = IBook[];
