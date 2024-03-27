import ProdBookItem from "./ProdBookItem";

type ProdBooksProps = {
  books: IBook[];
};

export default function ProdBooks({ books }: ProdBooksProps) {
  return (
    <div className="lang-page-picks__best__container__book-list__prod">
      <ul>
        {books.map((book, i) => (
          <ProdBookItem key={book._id} i={i} book={book} />
        ))}
      </ul>
    </div>
  );
}
