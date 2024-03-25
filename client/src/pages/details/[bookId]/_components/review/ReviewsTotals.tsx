import ReviewsKeywords from "./ReviewsKeywords";
import ReviewsTotalRating from "./ReviewsTotalRating";

type ReviewsTotalProps = {
  bookId: string | undefined;
}

export default function ReviewsTotals({ bookId }: ReviewsTotalProps) {
  if (!bookId) return;

  

  return (
    <div className="details-prod-reviews__wrap__reviews-total__inner">
      <ReviewsTotalRating bookId={bookId} />
      <ReviewsKeywords bookId={bookId} />
    </div>
  );
}
