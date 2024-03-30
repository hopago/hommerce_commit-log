import SearchButton from "./search/SearchButton";
import SearchInput from "./search/SearchInput";
import SearchSelect from "./search/SearchSelect";
import UserButton from "./user/UserButton";

import { useRecoilState, useRecoilValue } from "recoil";
import { GNBModalState } from "../../recoil/nav-gnb";
import { enhancedImageModal } from "../../recoil/modal/enhanced-image";
import { postReviewModal } from "../../recoil/modal/post-review";

import { MdClose, MdOutlineFormatListBulleted } from "react-icons/md";
import { AllCategories } from "../@modal";
import Logo from "./Logo";

import { cn } from "../../lib/utils";
import CartButton from "./cart/CartButton";
import { editUserModal } from "../../recoil/modal/edit-user";
import { searchWishList } from "../../recoil/modal/search-book";

type FixedSearchBarProps = {
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchTerm?: string;
};

export default function FixedSearchBar({
  onChange,
  searchTerm,
  onSubmit,
}: FixedSearchBarProps) {
  const [show, setShow] = useRecoilState(GNBModalState);
  const isImageModalShow = useRecoilValue(enhancedImageModal);
  const isPostModalShow = useRecoilValue(postReviewModal);
  const isEditUserModalShow = useRecoilValue(editUserModal);
  const isWishSearchModalShow = useRecoilValue(searchWishList);

  const toggleModal = () => {
    setShow((prev) => !prev);
  };

  return (
    <div
      className={cn(
        "fixed-search-section",
        (isImageModalShow ||
          isPostModalShow ||
          isEditUserModalShow ||
          isWishSearchModalShow) &&
          "none"
      )}
    >
      <div className="fixed-search-section__wrapper">
        <div
          className="icon-wrap"
          onClick={toggleModal}
          style={
            show
              ? {
                  backgroundColor: "#000000",
                  borderColor: "#000000",
                  color: "#ffffff",
                }
              : {}
          }
        >
          {show ? <MdClose /> : <MdOutlineFormatListBulleted />}
        </div>
        <Logo className="fixed" />
        <form onSubmit={onSubmit}>
          <SearchSelect className="fixed" />
          <SearchInput onChange={onChange} searchTerm={searchTerm} />
          <SearchButton />
        </form>
        <div className="user-button-wrap">
          <CartButton />
          <UserButton />
        </div>
      </div>
      {show ? <AllCategories className="fixed" /> : null}
    </div>
  );
}
