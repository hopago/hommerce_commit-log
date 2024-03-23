import fillScore from "../../../../../../../../assets/ico_fill-score.png";
import emptyScore from "../../../../../../../../assets/ico_empty-score.png";

import { TOTAL_SCORE } from "../../../constants/review-total";

type BookPreviewProps = {
  img: string;
  title: string;
  handleScoreChange: (score: ReviewRatingValue) => void;
  score: number;
};

export default function BookPreview({
  score,
  img,
  title,
  handleScoreChange,
}: BookPreviewProps) {
  const isFill = (i: number): boolean => {
    return i < score;
  };

  return (
    <div className="book-preview">
      <div className="book-preview__wrap">
        <img className="book-img" src={img} alt={title} />
        <div className="select-total">
          <p>{title}</p>
          <div className="select-total__score">
            {[...Array.from({ length: 5 })].map((_, i) => (
              <img
                key={i}
                src={isFill(i) ? fillScore : emptyScore}
                alt="score"
                onClick={() => handleScoreChange((i + 1) as ReviewRatingValue)}
              />
            ))}
            <span className="score">{score}</span>
            <span className="divider">/</span>
            <span className="total">{TOTAL_SCORE}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
