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
      <div className="search-wish-list__wrap">
        <div className="search-wish-list__wrap__header">
          <h1>도서 검색</h1>
          <button onClick={onClose}>
            <MdClose />
          </button>
        </div>
        <SearchBooks />
      </div>
    </div>
  );
}
