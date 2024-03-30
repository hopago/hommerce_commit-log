import { forwardRef } from "react";

import { cn } from "../lib/utils";

import { ReviewSortOptions } from "../recoil/review/review-select";
import { BookSortOption } from "../pages/myroom/wish/hooks/use-search-form";

type SelectItemsProps = {
  type: "review" | "search";
  items: string[];
  direction: "top" | "bottom";
  className?: string;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  onReviewSortOptionClick?: (text: ReviewSortOptions | BookSortOption) => void;
  onSearchSortOptionClick?: (option: any) => void;
};

const SelectItems = forwardRef<HTMLDivElement, SelectItemsProps>(
  (
    {
      type,
      items,
      direction,
      className,
      setShow,
      onReviewSortOptionClick,
      onSearchSortOptionClick,
    }: SelectItemsProps,
    ref
  ) => {
    const handleReviewSortOptionClick = (item: unknown) => {
      const validString: ReviewSortOptions[] = ["좋아요 순", "최신 순"];

      if (validString.includes(item as ReviewSortOptions)) {
        onReviewSortOptionClick &&
          onReviewSortOptionClick(item as ReviewSortOptions);
      }
    };

    const handleSearchSortOptionClick = (item: unknown) => {
      const validItem: BookSortOption[] = [
        "최신순",
        "정확도순",
        "오래된순",
        "조회순",
      ];

      if (validItem.includes(item as BookSortOption)) {
        onSearchSortOptionClick && onSearchSortOptionClick(item as SearchSort);
      }
    };

    const handleListItemClick = (item: unknown) => {
      if (type === "review") {
        handleReviewSortOptionClick(item);
      }
      if (type === "search") {
        handleSearchSortOptionClick(item);
      }

      setShow(false);
    };

    return (
      <div
        ref={ref}
        className={cn(
          "select-items",
          direction === "top"
            ? "top fade-in-closeUp"
            : "bottom fade-in-dropdown",
          className && `${className}`
        )}
      >
        <div className="select-items__wrap">
          <ol>
            {items.map((item) => (
              <li key={item} onClick={() => handleListItemClick(item)}>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
);

export default SelectItems;
