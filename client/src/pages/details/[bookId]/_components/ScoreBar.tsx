import { createScoreIcons } from "../../../../utils/create-score-icons";

import { ReviewRatingType } from "../../../_components/types/review";

type ScoreBarProps = {
  score: ReviewRatingType;
  ratingEachPert: Partial<Record<ReviewRatingType, number>>;
};

export default function ScoreBar({ score, ratingEachPert }: ScoreBarProps) {
  return (
    <div className="review-box__score-bar__vertical__item">
      <div className="icons">{createScoreIcons(Number(score))}</div>
      <div className="fill-bar">
        <div className="bg" />
        <div
          className="fill"
          style={{
            width: `${ratingEachPert[score]}%`,
          }}
        />
      </div>
      <div className="text">
        <span>{ratingEachPert[score] ?? 0}%</span>
      </div>
    </div>
  );
}
