import { generateKey } from "../../../../../utils/generate-key";

import { ReviewRatingType } from "../../../../_components/types/review";

import TotalRating from "../TotalRating";
import ScoreBar from "../ScoreBar";

type ReviewsTotalRatingProps = {
  totalRating: number;
  ratingEachPert: Partial<Record<ReviewRatingType, number>>;
};

export default function ReviewsTotalRating({
  totalRating,
  ratingEachPert,
}: ReviewsTotalRatingProps) {
  const scoreReverse: ReviewRatingType[] = ["5", "4", "3", "2", "1"];

  return (
    <div className="review-box total-rating">
      <div className="review-box__user-score">
        <span className="review-box__user-score__title">사용자 총점</span>
        <TotalRating rating={totalRating} />
      </div>
      <div className="review-box__score-bar score-4">
        <div className="review-box__score-bar__vertical">
          {scoreReverse.map((score) => (
            <ScoreBar
              key={generateKey(score)}
              ratingEachPert={ratingEachPert}
              score={score}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
