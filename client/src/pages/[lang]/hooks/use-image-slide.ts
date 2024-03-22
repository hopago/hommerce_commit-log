import { useEffect, useRef, useState } from "react";

export const useTimeoutImageSlide = (total: number, pixel: number) => {
  const [currIndex, setCurrIndex] = useState(1);

  const slideRef = useRef<HTMLUListElement>(null);

  const moveToNthSlide = (index: number) => {
    setTimeout(() => {
      setCurrIndex(index);
      if (slideRef.current !== null) {
        slideRef.current.style.transition = "";
      }
    }, 450);
  };

  const moveSlideByNumber = (direction: number) => {
    setCurrIndex((prev) => prev + direction);
  };

  const handleNext = () => {
    if (currIndex + 1 === total + 1) {
      moveToNthSlide(1);
    }

    moveSlideByNumber(1);

    if (slideRef.current !== null) {
      slideRef.current.style.transition = "all 0.45s ease";
    }
  };

  const handlePrev = () => {
    if (currIndex - 1 === 0) {
      moveToNthSlide(total);
    }

    moveSlideByNumber(-1);

    if (slideRef.current !== null) {
      slideRef.current.style.transition = "all 0.45s ease";
    }
  };

  useEffect(() => {
    if (slideRef.current !== null) {
      slideRef.current.style.transform = `translateX(-${currIndex * pixel}px)`;
    }
  }, [currIndex]);

  return { slideRef, handlePrev, handleNext, setCurrIndex, currIndex };
};
