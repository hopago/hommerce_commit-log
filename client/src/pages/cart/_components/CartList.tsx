import CartItem from "./CartItem";

type CartListProps = {
  books: CartList;
};

export default function CartList({ books }: CartListProps) {
  return (
    <>
      <div className="divider" />
      <div className="cart-list">
        <ul className="cart-list__scroll-inner">
          {Array.isArray(books) &&
            books.length > 0 &&
            books.map((book) => <CartItem key={book.bookId} book={book} />)}
        </ul>
      </div>
    </>
  );
}

export const CartListSkeleton = () => (
  <>
    <div className="divider" />
    <div className="cart-list">
      <ul></ul>
    </div>
  </>
);
