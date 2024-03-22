import { useEffect, useState } from "react";
import { DetailsIndexIds } from "..";

type UseObserverProps = {
  prodInfoRef: React.MutableRefObject<null>;
  reviewRef: React.MutableRefObject<null>;
};

export const useObserver = ({ prodInfoRef, reviewRef }: UseObserverProps) => {
  const [reObserve, setReObserve] = useState(false);
  const [isInView, setIsInView] = useState<DetailsIndexIds>("prod-info");

  useEffect(() => {
    setReObserve(false);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0) {
            console.log(entry.target.id);
            setIsInView(entry.target.id as DetailsIndexIds);
          }
        });
      },
      {
        threshold: 0,
      }
    );

    if (prodInfoRef.current) {
      observer.observe(prodInfoRef.current);
    }

    if (reviewRef.current) {
      observer.observe(reviewRef.current);
    }

    return () => {
      if (prodInfoRef.current) {
        observer.unobserve(prodInfoRef.current);
      }

      if (reviewRef.current) {
        observer.unobserve(reviewRef.current);
      }
    };
  }, [reObserve]);

  return {
    isInView,
    setReObserve,
  };
};
