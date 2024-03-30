import { SetterOrUpdater } from "recoil";

import { BookFilterOption } from "../../hooks/use-search-form";

type SearchFormProps = {
  selectList: BookFilterOption[];
  currSelect: BookFilterOption;
  handleItemClick: SetterOrUpdater<BookFilterOption>;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  handleShow: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputValue: string;
};

export default function SearchForm({
  selectList,
  currSelect,
  handleItemClick,
  show,
  setShow,
  handleShow,
  handleChange,
  inputValue,
}: SearchFormProps) {
  return <div>SearchForm</div>;
}
