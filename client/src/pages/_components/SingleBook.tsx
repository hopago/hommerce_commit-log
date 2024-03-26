import { AiFillMessage } from "react-icons/ai";

import ParentCategoryBadge from "./ParentCategoryBadge";

import { AnimatePresence, motion } from "framer-motion";

import { Link } from "react-router-dom";

import { useRecoilValue } from "recoil";
import { selectedCurrentBook } from "../../recoil/books";

import { Skeleton } from "@nextui-org/skeleton";
import { cn } from "../../lib/utils";

type SingleBookProps = {
  index: number;
};

export default function SingleBook({ index }: SingleBookProps) {
  const currentBook = useRecoilValue(selectedCurrentBook(index));

  if (currentBook) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={currentBook ? `${currentBook._id}` : "empty"}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="single-book-motion"
        >
          <div className="recommend-books__today-pick__contents__single-book">
            <div className="recommend-books__today-pick__contents__single-book__wrap">
              <div className="recommend-books__today-pick__contents__single-book__wrap__horizontal">
                <Link
                  to={`/details/${currentBook._id}`}
                  className="recommend-books__today-pick__contents__single-book__wrap__horizontal__img link"
                >
                  <img src={currentBook.representImg} alt={currentBook.title} />
                </Link>
                <div className="recommend-books__today-pick__contents__single-book__wrap__horizontal__info">
                  {currentBook.parentCategory.map((category) => (
                    <ParentCategoryBadge key={category} text={category} />
                  ))}
                  <Link to={`/details/${currentBook._id}`} className="link">
                    <p className="title">{currentBook.title}</p>
                  </Link>
                  <p className="author">{currentBook.author}</p>
                  <div className="recommend-books__today-pick__contents__single-book__wrap__horizontal__info__price-texts">
                    {currentBook.discount ? (
                      <span className="discount">{currentBook.discount}</span>
                    ) : null}
                    <span className="price" style={{ fontWeight: "bold" }}>
                      {currentBook.price.toLocaleString()}
                    </span>
                    <span className="unit">{currentBook.unit}</span>
                  </div>
                  <p className="comment">
                    <span>
                      <span>
                        <AiFillMessage color="#474C98" />
                      </span>
                      {currentBook.comment}
                    </span>
                  </p>
                  <p className="desc">{currentBook.desc}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }
}

export const SingleBookSkeleton= () => {
  return (
    <div className="single-book-motion">
      <div className="recommend-books__today-pick__contents__single-book">
        <div className="recommend-books__today-pick__contents__single-book__wrap">
          <div className="recommend-books__today-pick__contents__single-book__wrap__horizontal">
            <div className="recommend-books__today-pick__contents__single-book__wrap__horizontal__img">
              <Skeleton className={cn("skeleton", "representImg")} />
            </div>
            <div className="recommend-books__today-pick__contents__single-book__wrap__horizontal__info">
              <div className="skeleton-badge-wrap">
                {[...Array.from({ length: 3 })].map((_, i) => (
                  <Skeleton key={i} className={cn("skeleton", "badge")} />
                ))}
              </div>
              <div>
                <Skeleton className={cn("skeleton", "h1")} />
              </div>
              <Skeleton className={cn("skeleton", "p")} />
              <div className="recommend-books__today-pick__contents__single-book__wrap__horizontal__info__price-texts">
                <Skeleton className={cn("skeleton", "p")} />
                <Skeleton className={cn("skeleton", "span")} />
              </div>
              <p className="comment">
                <span>
                  <span>
                    <AiFillMessage color="#474C98" />
                  </span>
                  <Skeleton className={cn("skeleton", "span")} />
                </span>
              </p>
              <Skeleton className={cn("skeleton", "p")} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
