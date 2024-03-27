import Heading from "../picks/TodayPickHeading";

import NewBookList from "./NewBookList";

export default function NewBooks({
  bookSubCategory,
}: {
  bookSubCategory: BookSubCategory;
}) {
  return (
    <div className="new-books">
      <Heading title={`새로나온 책 | ${bookSubCategory}`} />
      <NewBookList category={bookSubCategory} />
    </div>
  );
}
