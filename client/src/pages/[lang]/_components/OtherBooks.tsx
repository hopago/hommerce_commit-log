import { Skeleton } from "@nextui-org/skeleton";
import BestFlagBadge from "../../_components/utils/BestFlagBadge";
import { cn } from "../../../lib/utils";

type OtherBooksProps = {
  books: string[];
};

export default function OtherBooks({ books }: OtherBooksProps) {
  return (
    <div className="lang-page-picks__best__container__book-list__other-books">
      <ul>
        {books.map((title, i) => (
          <li key={title}>
            <div className="text-wrap">
              <BestFlagBadge i={i + 2} />
              <div className="span-wrap">
                <span>{title}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const OtherBooksSkeleton = () => {
  return (
    <div className="lang-page-picks__best__container__book-list__other-books">
      <ul>
        {[...Array.from({ length: 8 })].map(() => (
          <li>
            <Skeleton className={cn("skeleton", "badge")} />
            <div className="span-wrap">
              <Skeleton className={cn("skeleton", "span")} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
