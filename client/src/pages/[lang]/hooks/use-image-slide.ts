import { useEffect, useState } from "react";

export const useImageSlide = (length: number) => {
  const [currIndex, setCurrIndex] = useState(0);
  const [prevDisabled, setPrevDisabled] = useState(false);
  const [nextDisabled, setNextDisabled] = useState(false);

  const handlePrev = () => {
    if (currIndex !== 0) {
      setCurrIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currIndex < length - 1) {
      setCurrIndex((prev) => prev + 1);
    }
  };

  useEffect(() => {
    setPrevDisabled(false);
    setNextDisabled(false);

    if (currIndex === 0) {
      return setPrevDisabled(true);
    }
    if (currIndex === length - 1) {
      return setNextDisabled(true);
    }
  }, [currIndex]);

  return {
    setCurrIndex,
    currIndex,
    prevDisabled,
    handlePrev,
    nextDisabled,
    handleNext,
  };
};
