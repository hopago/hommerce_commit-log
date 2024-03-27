import { Skeleton } from "@nextui-org/skeleton";
import { Link } from "react-router-dom";
import { cn } from "../../../lib/utils";

type NewBookItemProps = {
  book: IBook;
};

export default function NewBookItem({ book }: NewBookItemProps) {
  return (
    <li>
      <Link to={`/details/${book._id}`} className="link">
        <div className="img-wrap">
          <img src={book.representImg} alt={book.title} />
        </div>
        <div className="book-info">
          <h3>{book.title}</h3>
          <div className="publish">
            <span>
              {book.author}&nbsp;·&nbsp;{book.publisher}
            </span>
          </div>
          {book.discount ? (
            <span className="discount">{book.discount}%</span>
          ) : null}
          <span className="price" style={{ fontWeight: "bold" }}>
            {book.price?.toLocaleString()}
          </span>
          <span className="unit">{book.unit}</span>
        </div>
      </Link>
    </li>
  );
}

export const NewBookItemSkeleton = () => {
  return (
    <li>
      <div className="link">
        <div className="img-wrap">
          <Skeleton className={cn("skeleton", "representImg")} />
        </div>
        <div className="book-info">
          <Skeleton className={cn("skeleton", "title")} />
          <Skeleton className={cn("skeleton", "span")} />
        </div>
      </div>
    </li>
  );
};
