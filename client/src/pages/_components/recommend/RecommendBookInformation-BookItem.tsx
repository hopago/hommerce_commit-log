import { Link } from "react-router-dom";

import { recommendTypes } from "../../../constants/recommend-types";

import { Skeleton } from "@nextui-org/skeleton";
import { cn } from "../../../lib/utils";

type RecommendBookInformationBookItemProps = {
  book: IBook;
  i: number;
};

export default function RecommendBookInformationBookItem({
  book,
  i,
}: RecommendBookInformationBookItemProps) {
  return (
    <li>
      <Link to={`/details/${book._id}`} className="link">
        <p className="recommend-type">{recommendTypes[i]}</p>
        <div className="img-wrap">
          <img src={book.representImg} alt={book.title} />
        </div>
        <div className="book-info">
          <span className="category">{`[${book.category}]`}</span>
          <h2>{book.title}</h2>
          <span className="author">{book.author}</span>
        </div>
      </Link>
    </li>
  );
}

export const RecommendBookInformationBookItemSkeleton = () => (
  <li>
    <div className="link">
      <div className="skeleton-text-wrap">
        <Skeleton className={cn("skeleton", "p")} />
      </div>
      <div className="img-wrap">
        <Skeleton className={cn("skeleton", "representImg")} />
      </div>
      <div className="book-info">
        <Skeleton className={cn("skeleton", "span")} />
        <Skeleton className={cn("skeleton", "h2")} />
      </div>
    </div>
  </li>
);
