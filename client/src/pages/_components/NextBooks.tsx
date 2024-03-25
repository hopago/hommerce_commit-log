import { useEffect, useRef } from "react";
import NextBookItem from "./NextBookItem";

type NextBooksProps = {
  books: IBook[];
  currIndex: number;
};

export default function NextBooks({ books, currIndex }: NextBooksProps) {
  const slideRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    if (slideRef.current === null) return;

    slideRef.current.style.transition = "all 0.3s ease-in-out";
    slideRef.current.style.transform = `translateX(-${(currIndex - 4) * 190}px)`;
  }, [currIndex]);

  return (
    <div className="recommend-books__today-pick__contents__preview">
      <ol ref={slideRef}>
        {books.map((book) => (
          <NextBookItem key={book._id} book={book} />
        ))}
      </ol>
    </div>
  );
}
