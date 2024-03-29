import { forwardRef } from "react";

import { PointFilterOption } from "../point/services/getUserPointLog";

import { cn } from "../../../lib/utils";

type SelectItemProps = {
  selectList: PointFilterOption[] | BookSubCategoryList;
  currSelect: PointFilterOption | BookSubCategory;
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
