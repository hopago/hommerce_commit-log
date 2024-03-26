import { Link } from "react-router-dom";

import ParentCategoryBadge from "./ParentCategoryBadge";

import { AnimatePresence, motion } from "framer-motion";

import { generateKey } from "../../utils/generate-key";
import { Skeleton } from "@nextui-org/skeleton";
import { cn } from "../../lib/utils";

type NextBookItemProps = {
  book: IBook;
};

export default function NextBookItem({ book }: NextBookItemProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={generateKey(book._id)}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
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
      </motion.div>
    </AnimatePresence>
  );
}

export const NextBookItemSkeleton = () => {
  return (
    <li>
      <div className="img-wrap">
        <Skeleton className={cn("skeleton", "representImg")} />
      </div>
      <div className="skeleton-badge-wrap">
        {[...Array.from({ length: 3 })].map((_, i) => (
          <Skeleton key={i} className={cn("skeleton", "badge")} />
        ))}
      </div>
      <Skeleton className={cn("skeleton", "p")} />
    </li>
  );
};
