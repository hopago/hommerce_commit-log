import Review from "../models/review";

const perPage = 10;

const getSortCondition: any = (sort: "최신순" | "오래된순") => {
  return sort === "최신순" ? { createdAt: -1 } : { createdAt: 1 };
};

export const handleGetReviews = async (
  bookId: string,
  pageNum = 1,
  sort = "최신순"
) => {
  const skip = (pageNum - 1) * perPage;

  const reviews = await Review.find({ bookId })
    .sort(getSortCondition(sort))
    .skip(skip)
    .limit(perPage);

  const totalReviews = await Review.countDocuments({ bookId });
  const hasNextPage = skip + perPage < totalReviews;

  return {
    reviews,
    hasNextPage,
    totalReviews,
  };
};
