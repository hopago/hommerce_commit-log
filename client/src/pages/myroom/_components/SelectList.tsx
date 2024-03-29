import { useEffect, useRef } from "react";

import SelectItem from "./SelectItem";

import { cn } from "../../../lib/utils";

import { MdArrowDropDown } from "react-icons/md";

import { PointFilterOption } from "../point/_component/FilterPointLogs";
import { ReviewFilterOption } from "../../../recoil/pagination/search/filter/filter";
import { ReviewSortOption } from "../review/_components/SortReview";

// 사용시 타입 추가
type SelectListProps = {
  selectList: PointFilterOption[] | ReviewFilterOption[] | ReviewSortOption[];
  currSelect:
    | PointFilterOption
    | BookSubCategory
    | ReviewFilterOption
    | ReviewSortOption;
  handleItemClick: (param: any) => void;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  handleShow: () => void;
  className?: string;
  backgroundColor?: string;
};

export default function SelectList({
  currSelect,
  handleItemClick,
  selectList,
  show,
  setShow,
  handleShow,
  className,
  backgroundColor,
}: SelectListProps) {
  const selectListRef = useRef<HTMLButtonElement>(null);
  const selectItemRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!selectListRef.current || !selectItemRef.current) return;

      if (
        !selectListRef.current.contains(e.target as Node) &&
        !selectItemRef.current.contains(e.target as Node)
      ) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show]);

  return (
    <div className={cn("select", className && className)}>
      <button
        type="button"
        className="select__wrap"
        ref={selectListRef}
        onClick={handleShow}
        style={{ backgroundColor: `${backgroundColor}` }}
      >
        <div className="text-wrap">
          <span>{currSelect}</span>
          <MdArrowDropDown size={21} />
        </div>
      </button>
      {show && (
        <SelectItem
          currSelect={currSelect}
          selectList={selectList}
          handleItemClick={handleItemClick!}
          className={className}
          ref={selectItemRef}
        />
      )}
    </div>
  );
}
