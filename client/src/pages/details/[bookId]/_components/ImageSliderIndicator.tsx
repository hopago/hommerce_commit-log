import { MdArrowLeft, MdArrowRight } from "react-icons/md";
import { cn } from "../../../../lib/utils";

type ImageSliderIndicatorProps = {
  currIndex: number;
  total: number;
  handleNext: () => void;
  handlePrev: () => void;
  prevDisabled: boolean;
  nextDisabled: boolean;
};

export default function ImageSliderIndicator({
  currIndex,
  total,
  handleNext,
  handlePrev,
  prevDisabled,
  nextDisabled,
}: ImageSliderIndicatorProps) {
  console.log(prevDisabled);

  return (
    <div className="img-slider-indicator">
      <div className="items-center">
        <button
          className="indicator"
          onClick={handlePrev}
          disabled={prevDisabled}
        >
          <MdArrowLeft
            className={cn("arrow-icon", prevDisabled && "disabled")}
          />
        </button>
        <div className="index-info">
          <span className={cn("", currIndex !== total && "active")}>
            0{currIndex + 1}
          </span>
          <span className="divider">-</span>
          <span>0{total}</span>
        </div>
        <button
          className="indicator"
          onClick={handleNext}
          disabled={nextDisabled}
        >
          <MdArrowRight
            className={cn("arrow-icon", nextDisabled && "disabled")}
          />
        </button>
      </div>
    </div>
  );
}
