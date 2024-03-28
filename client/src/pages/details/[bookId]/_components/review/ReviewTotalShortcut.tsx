import quotes from "../../../../../assets/ico_quotes.png";

import { ReviewTotalData } from "../../../../../types/api/review-total";

import { createScoreIcons } from "../../../../../utils/create-score-icons";

type ReviewTotalShortcutProps = {
  data: ReviewTotalData;
};

export default function ReviewTotalShortcut({
  data,
}: ReviewTotalShortcutProps) {
  return (
    <div className="review-total-shortcut">
      <div className="review-total-shortcut__wrap">
        <div className="rating">
          <span className="total-rating">{data.total.totalRating}</span>
          <div className="icons">
            {createScoreIcons(data.total.totalRating)}
          </div>
          <span className="light">({data.reviewsLength}개의 리뷰)</span>
        </div>
        <div className="keyword">
          <img src={quotes} alt="keyword-img" />
          <span className="keyword-span">{data.total.totalKeyword}</span>
          <span className="light">
            ({data.total.keywordEachPert[data.total.totalKeyword]}%의 구매자)
          </span>
        </div>
      </div>
    </div>
  );
}
