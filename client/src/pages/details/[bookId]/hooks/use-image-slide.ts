import { useState } from "react";

export const useImageSlide = (total: number) => {
  const [index, setIndex] = useState(0);
  const [nextDisabled, setNextDisabled] = useState(false);
  const [prevDisabled, setPrevDisabled] = useState(false);

  const handleNext = () => {
    if (index === total) {
      setNextDisabled(true);
    } else {
      setIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (index === 0) {
      setPrevDisabled(true);
    } else {
      setIndex((prev) => prev - 1);
    }
  };

  return {
    index,
    handleNext,
    handlePrev,
    nextDisabled,
    prevDisabled,
    setIndex,
  };
};
