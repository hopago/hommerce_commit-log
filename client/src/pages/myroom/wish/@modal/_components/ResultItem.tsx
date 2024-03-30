import { MdCheck } from "react-icons/md";

import Button from "../../../../../_components/common/Button";

import { formatDate } from "../../../../../utils/create-formatted-date";

type ResultItemProps = {
  book: IBook;
};

export default function ResultItem({ book }: ResultItemProps) {
  const onClick = () => {};

  return (
    <li>
      <img src={book.representImg} alt={book.title} />
      <div className="flex-col">
        <h1>{book.title}</h1>
        <p>{book.author}</p>
        <p>{book.publisher}</p>
        <p>{formatDate(book.createdAt)}</p>
      </div>
      <Button
        type="button"
        className="wish-list-select"
        icon={<MdCheck />}
        text="선택"
        onClick={onClick}
      />
    </li>
  );
}
