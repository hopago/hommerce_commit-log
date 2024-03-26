import { cn } from "../../../lib/utils";

import AllCategoriesParentCategory from "./_components/AllCategories-ParentCategory";
import AllCategoriesSelect from "./_components/AllCategories-Select";
import AllCategoriesSubCategory from "./_components/AllCategories-SubCategory";

import { useNavCategory } from "./_components/hooks/use-nav-category";

export default function AllCategories({
  className,
  isScrolled,
}: {
  className?: string;
  isScrolled?: boolean;
}) {
  const { handleChangeParentCategory, parentCategory, handleNavigate } =
    useNavCategory();

  return (
    <div
      className={cn("all-categories", className && className)}
      style={isScrolled ? { display: "none" } : {}}
    >
      <AllCategoriesSelect />
      <AllCategoriesParentCategory
        handleChangeParentCategory={handleChangeParentCategory}
        parentCategory={parentCategory}
      />
      <AllCategoriesSubCategory handleNavigate={handleNavigate} />
    </div>
  );
}
