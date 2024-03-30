import { BookSortOption } from "../../hooks/use-search-form";

type SearchSortProps = {
  selectList: BookSortOption[];
  currSelect: BookSortOption;
  handleItemClick: (sort: BookSortOption) => void;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  handleShow: () => void;
};

export default function SearchSort({
  selectList,
  currSelect,
  handleItemClick,
  show,
  setShow,
  handleShow,
}: SearchSortProps) {
  return <div>SearchSort</div>;
}
