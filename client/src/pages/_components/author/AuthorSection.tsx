import { useImageSlide } from "../../hooks/use-image-slide";

import AuthorHeading from "./AuthorHeading";
import Authors from "./Authors";

export default function AuthorSection() {
  return null;

  const { handleNext, handlePrev, prevDisabled, nextDisabled, index } =
    useImageSlide({ total: authorsInfo.length, itemsPerSlide: 3 });

  return (
    <div className="author">
      <div className="author__wrapper">
        <AuthorHeading
          handleNext={handleNext}
          handlePrev={handlePrev}
          prevDisabled={prevDisabled}
          nextDisabled={nextDisabled}
        />
        <Authors authors={authorsInfo} currIndex={index} />
      </div>
    </div>
  );
}
