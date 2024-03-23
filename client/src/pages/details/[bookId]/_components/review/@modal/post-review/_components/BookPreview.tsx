import fillScore from "../../../../../../../../assets/ico_fill-score.png";
import emptyScore from "../../../../../../../../assets/ico_empty-score.png";

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
        <img src={img} alt={title} />
        <div className="select-total">
          <p>{title}</p>
          {[...Array.from({ length: 5 })].map((_, i) => (
            <img
              key={i}
              src={isFill(i) ? fillScore : emptyScore}
              alt="score"
              onClick={() => handleScoreChange((i + 1) as ReviewRatingValue)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
