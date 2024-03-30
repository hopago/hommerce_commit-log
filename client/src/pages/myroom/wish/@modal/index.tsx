import { useSetRecoilState } from "recoil";
import { searchWishList } from "../../../../recoil/modal/search-book";

import { MdClose } from "react-icons/md";

import SearchBooks from "./_components/SearchBooks";

export default function SearchWishListModalIndex() {
  const setModalShow = useSetRecoilState(searchWishList);

  const onClose = () => setModalShow(false);

  return (
    <div className="search-wish-list">
      <div className="bg-fill" />
      <div className="search-wish-list__contents">
        <div className="search-wish-list__contents__wrap">
          <div className="search-wish-list__contents__wrap__header">
            <h1>도서 검색</h1>
            <button className="close-btn" type="button" onClick={onClose}>
              <MdClose size={24} />
            </button>
          </div>
          <SearchBooks />
        </div>
      </div>
    </div>
  );
}
