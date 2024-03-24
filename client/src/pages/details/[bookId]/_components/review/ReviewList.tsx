import { forwardRef } from "react";

import ReviewItem from "./ReviewItem";

type ReviewsListProps = {
  reviews: IReview[];
};

const ReviewList = forwardRef<HTMLDivElement, ReviewsListProps>(
  ({ reviews }, ref) => {
    return (
      <div className="reviews-list" ref={ref}>
        <ul>
          {reviews.map((review) => (
            <ReviewItem key={review._id} review={review} />
          ))}
        </ul>
      </div>
    );
  }
);

export default ReviewList;
