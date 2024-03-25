import { useState, useEffect } from "react";

type UseImageSlideProps = {
  total: number;
  pixelPerSlide?: number;
  itemsPerSlide?: number;
  preventNextNumber?: number;
};

export const useImageSlide = ({
  total,
  pixelPerSlide,
  itemsPerSlide = 1,
  preventNextNumber = 0,
}: UseImageSlideProps) => {
  const [index, setIndex] = useState(0);
  const [nextDisabled, setNextDisabled] = useState(false);
  const [prevDisabled, setPrevDisabled] = useState(false);
  const [position, setPosition] = useState(0);

  const handleSetIndex = (i: number) => {
    setIndex(i);
    pixelPerSlide && setPosition(-i * pixelPerSlide);
  };

  const handleNext = () => {
    if (index + itemsPerSlide < total - preventNextNumber) {
      setIndex((prev) => prev + itemsPerSlide);
      pixelPerSlide && setPosition((prev) => prev - pixelPerSlide);
    }
  };

  const handlePrev = () => {
    if (index !== 0) {
      setIndex((prev) => prev - itemsPerSlide);
      pixelPerSlide && setPosition((prev) => prev + pixelPerSlide);
    }
  };

  useEffect(() => {
    setPrevDisabled(index === 0);
    setNextDisabled(index + itemsPerSlide >= total - preventNextNumber);
  }, [index, total, itemsPerSlide]);

  return {
    index,
    handleSetIndex,
    handleNext,
    handlePrev,
    nextDisabled,
    prevDisabled,
    position,
  };
};
