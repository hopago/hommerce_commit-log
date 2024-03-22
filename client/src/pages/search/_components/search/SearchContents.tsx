import PaginateControl from "../../../details/[bookId]/_components/PaginateControl";

import { getPageTotal } from "../../../details/[bookId]/utils/getPageTotal";

import { useSelectUI } from "../../hooks/use-select-ui";

import BookList from "../book/BookList";
import FilterInfo from "../filter/FilterInfo";
import SortBox from "../sort/SortBox";

type SearchContentsProps = {
  docsLength: number;
};

export default function SearchContents({ docsLength }: SearchContentsProps) {
  const { onClick, display } = useSelectUI();

  const pageTotal = getPageTotal(docsLength);

  return (
    <div className="search-contents__container">
      <SortBox onClick={onClick} display={display} docsLength={docsLength} />
      <FilterInfo />
      <BookList display={display} />
      <PaginateControl pageTotal={pageTotal} />
    </div>
  );
}
