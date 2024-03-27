import { Skeleton } from "@nextui-org/skeleton";
import BestFlagBadge from "../../_components/utils/BestFlagBadge";
import { cn } from "../../../lib/utils";

type ProdBookItemProps = {
  book: IBook;
  i: number;
};

export default function ProdBookItem({ book, i }: ProdBookItemProps) {
  return (
    <li>
      <div className="img-wrap">
        <img src={book.representImg} alt={book.title} />
      </div>
      <div className="book-info">
        <BestFlagBadge i={i} />
        <h3>{book.title}</h3>
        <div className="publish">
          <span>{book.author}&nbsp;·&nbsp;</span>
          <span>{book.publisher}</span>
        </div>
        {book.discount ? (
          <span className="discount">{book.discount}%</span>
        ) : null}
        <span className="price" style={{ fontWeight: "bold" }}>
          {book.price.toLocaleString()}
        </span>
        <span className="unit">{book.unit}</span>
      </div>
    </li>
  );
}

export const ProdBookItemSkeleton = () => {
  return (
    <li>
      <div className="img-wrap">
        <Skeleton className={cn("skeleton", "representImg")} />
      </div>
      <div className="book-info">
        <Skeleton className={cn("skeleton", "badge")} />
        <Skeleton className={cn("skeleton", "title")} />
        <div className="publish">
          <Skeleton className={cn("skeleton", "span gap")} />
          <Skeleton className={cn("skeleton", "span")} />
        </div>
        <Skeleton className={cn("skeleton", "span")} />
        <Skeleton className={cn("skeleton", "span")} />
      </div>
    </li>
  );
};
