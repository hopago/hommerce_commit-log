import { Link } from "react-router-dom";

import BestFlagBadge from "./utils/BestFlagBadge";

import { Skeleton } from "@nextui-org/skeleton";
import { cn } from "../../lib/utils";

type BestSellerItemProps = {
  book: IBook;
  i: number;
};

export default function BestSellerItem({ book, i }: BestSellerItemProps) {
  return (
    <li>
      <div className="best-prod-wrap">
        <BestFlagBadge i={i} />
      </div>
      <Link to={`/details/${book._id}`} className="img-wrap link">
        <img src={book.representImg} alt={book.title} />
      </Link>
      <div className="info">
        <Link to={`/details/${book._id}`} className="link">
          <h2>{book.title}</h2>
        </Link>
        <span>
          {book.author} · {book.category}
        </span>
      </div>
    </li>
  );
}

export const BestSellerItemSkeleton = () => (
  <li>
    <div className="best-prod-img">
      <Skeleton className={cn("skeleton", "badge")} />
    </div>
    <div className="img-wrap">
      <Skeleton className={cn("skeleton", "representImg")} />
    </div>
    <div className="info">
      <div>
        <Skeleton className={cn("skeleton", "h2")} />
      </div>
      <div className="skeleton-row">
        <Skeleton className={cn("skeleton", "span")} />
        <Skeleton className={cn("skeleton", "span")} />
      </div>
    </div>
  </li>
);
