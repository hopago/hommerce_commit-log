import { Link } from "react-router-dom";
import ParentCategoryBadge from "./ParentCategoryBadge";

type NextBookItemProps = {
  book: IBook;
};

export default function NextBookItem({ book }: NextBookItemProps) {
  return (
    <li key={book._id}>
      <Link to={`/details/${book._id}`} className="img-wrap link">
        <img src={book.representImg} alt={book.title} />
      </Link>
      {book.parentCategory.map((category) => (
        <ParentCategoryBadge key={category} text={category} />
      ))}
      <Link to={`/details/${book._id}`} className="link">
        <p>{book.title}</p>
      </Link>
    </li>
  );
}
