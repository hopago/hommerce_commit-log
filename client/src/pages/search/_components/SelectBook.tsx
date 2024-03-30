import { useEffect, useState } from "react";

import { useRecoilState } from "recoil";
import { selectedBookState } from "../../../recoil/selected-book";

import CheckButton from "../../../_components/common/CheckButton";

type SelectBookProps = {
  book: IBook;
};

export default function SelectBook({ book }: SelectBookProps) {
  const [selectedBooks, setSelectedBooks] = useRecoilState(selectedBookState);

  const [isSelected, setIsSelected] = useState(false);

  const handleSelectBook = () => {
    const filteredSelectedBook = selectedBooks.filter(
      (b) => b._id !== book._id
    );

    isSelected
      ? setSelectedBooks(filteredSelectedBook)
      : setSelectedBooks([...selectedBooks, book]);
  };

  useEffect(() => {
    const checkExist = selectedBooks.some((b) => b._id === book._id);

    setIsSelected(checkExist);
  }, [selectedBooks.length, book._id]);

  return (
    <CheckButton
      isActive={isSelected}
      onClick={handleSelectBook}
      margin={0}
      padding={0}
    />
  );
}
