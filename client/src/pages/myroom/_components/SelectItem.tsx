import { forwardRef } from "react";

import { cn } from "../../../lib/utils";

import { PointFilterOption } from "../point/services/getUserPointLog";
import { ReviewFilterOption } from "../../../recoil/pagination/search/filter/filter";
import { ReviewSortOption } from "../review/_components/SortReview";

type SelectItemProps = {
  selectList:
    | PointFilterOption[]
    | BookSubCategoryList
    | ReviewFilterOption[]
    | ReviewSortOption[];
  currSelect:
    | PointFilterOption
    | BookSubCategory
    | ReviewFilterOption
    | ReviewSortOption;
  handleItemClick: (param: any) => void;
  className?: string;
};

const SelectItem = forwardRef<HTMLUListElement, SelectItemProps>(
  ({ selectList, handleItemClick, currSelect, className }, ref) => {
    return (
      <ul ref={ref} className={cn("select-list", className && className)}>
        {selectList.map((list, i) => {
          if (currSelect !== list)
            return (
              <li
                key={`${list}-${i}`}
                className="select-item"
                onClick={() => handleItemClick(list)}
              >
                <span className="text">{list}</span>
              </li>
            );
        })}
      </ul>
    );
  }
);

export default SelectItem;
