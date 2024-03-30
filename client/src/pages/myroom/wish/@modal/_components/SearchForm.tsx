import { SetterOrUpdater } from "recoil";

import { BookFilterOption } from "../../hooks/use-search-form";

import SelectList from "../../../_components/SelectList";
import Input from "../../../../../_components/common/Input";
import Button from "../../../../../_components/common/Button";
import { MdSearch } from "react-icons/md";

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
  return (
    <div className="search-form-container">
      <form>
        <SelectList
          selectList={selectList}
          currSelect={currSelect}
          handleItemClick={handleItemClick}
          show={show}
          setShow={setShow}
          handleShow={handleShow}
          className="wish-list"
        />
        <div className="gap" />
        <Input
          className="point-log"
          type="text"
          value={inputValue}
          placeholder="검색어를 입력해주세요."
          onChange={handleChange}
        />
        <Button type="submit" icon={<MdSearch size={21} className="search-icon" />} />
      </form>
    </div>
  );
}
