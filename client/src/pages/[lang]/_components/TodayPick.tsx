import { useRecoilValue } from "recoil";
import { booksState, selectedCurrentBook } from "../../../recoil/books";
import { useImageSlide } from "../../hooks/use-image-slide";

import NextIcon from "../../_components/NextIcon";
import PrevIcon from "../../_components/PrevIcon";
import CurrentBook from "./CurrentBook";
import Preview from "./Preview";
import Heading from "./TodayPickHeading";

export default function TodayPick() {
  const books = useRecoilValue(booksState);

  const {
    setIndex,
    index,
    prevDisabled,
    handlePrev,
    nextDisabled,
    handleNext,
  } = useImageSlide({ total: books.length });

  const currentBook = useRecoilValue(selectedCurrentBook(index));

  return (
    <div className="lang-page-picks__today__vertical">
      <Heading title="오늘의 선택" />
      <CurrentBook book={currentBook} />
      <Preview setCurrIndex={setIndex} currIndex={index} books={books} />
      <div className="lang-page-picks__today__vertical__slide-btn">
        <div className="process">
          <div className="fill" style={{ width: `${(index + 1) * 10}%` }} />
          <div className="bg" />
        </div>
        <PrevIcon prevDisabled={prevDisabled} handlePrev={handlePrev} />
        <NextIcon nextDisabled={nextDisabled} handleNext={handleNext} />
      </div>
    </div>
  );
}
