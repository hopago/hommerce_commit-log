import { forwardRef } from "react";

import ReviewItem from "./ReviewItem";
import Spinner from "../../../../../_components/Spinner";

type ReviewsListProps = {
  reviews: IReview[];
};

const ReviewList = forwardRef<HTMLDivElement, ReviewsListProps>(
  ({ reviews }, ref) => {
    return (
      <div className="reviews-list" ref={ref}>
        <ul>
          {reviews?.map((review) => (
            <ReviewItem key={review._id} review={review} />
          ))}
        </ul>
      </div>
    );
  }
);

export default ReviewList;

export const ReviewListLoadingComponent = () => (
  <div className="reviews-list">
    <ul>
      <Spinner text="리뷰 정보를 불러오는 중 입니다" />
    </ul>
  </div>
);
