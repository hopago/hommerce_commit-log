import { bookParentCategory } from "../../../_components/constants/category";

import { cn } from "../../../../lib/utils";

type AllCategoriesParentCategoryProps = {
  handleChangeParentCategory: (category: BookParentCategory) => void;
  parentCategory: BookParentCategory;
};

export default function AllCategoriesParentCategory({
  handleChangeParentCategory,
  parentCategory,
}: AllCategoriesParentCategoryProps) {
  return (
    <div className="all-categories__parent-category">
      <ul className="parent-category-list">
        {bookParentCategory.map((category) => (
          <li
            key={category}
            onClick={() => handleChangeParentCategory(category)}
          >
            <span className={cn("", parentCategory === category && "active")}>
              {category}
            </span>
            {parentCategory === category ? (
              <div className="active-fill" />
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
