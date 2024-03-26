import { bookSubCategory } from "../../../_components/constants/category";

import AD from "../../../../assets/nav-modal-ad.png";
import { MdAdd } from "react-icons/md";

type AllCategoriesSubCategoryProps = {
  handleNavigate: (category: BookSubCategory) => void;
};

export default function AllCategoriesSubCategory({
  handleNavigate,
}: AllCategoriesSubCategoryProps) {
  return (
    <div className="all-categories__book-category">
      <ul className="sub-category-list">
        {bookSubCategory.map((category) => (
          <li key={category} onClick={() => handleNavigate(category)}>
            <span>{category}</span>
            <div className="sub-category-list__icon-wrap">
              <MdAdd />
            </div>
          </li>
        ))}
      </ul>
      <div className="ad-box">
        <img src={AD} alt="nav-modal-ad" />
      </div>
    </div>
  );
}
