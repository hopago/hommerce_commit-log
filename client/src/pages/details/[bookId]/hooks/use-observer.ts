import { useEffect, useState } from "react";
import { DetailsIndexIds } from "..";

type UseObserverProps = {
  ref1: React.MutableRefObject<null>;
  ref2: React.MutableRefObject<null>;
};

export const useObserver = ({ ref1, ref2 }: UseObserverProps) => {
  const [reObserve, setReObserve] = useState(false);
  const [isInView, setIsInView] = useState<DetailsIndexIds>("prod-info");

  useEffect(() => {
    setReObserve(false);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0) {
            setIsInView(entry.target.id as DetailsIndexIds);
          }
        });
      },
      {
        threshold: 0,
      }
    );

    if (ref1.current) {
      observer.observe(ref1.current);
    }

    if (ref2.current) {
      observer.observe(ref2.current);
    }

    return () => {
      if (ref1.current) {
        observer.unobserve(ref1.current);
      }

      if (ref2.current) {
        observer.unobserve(ref2.current);
      }
    };
  }, [reObserve]);

  return {
    isInView,
    setReObserve,
  };
};
