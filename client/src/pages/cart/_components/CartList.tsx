import CartItem from "./CartItem";

type CartListProps = {
  books: CartList;
};

export default function CartList({ books }: CartListProps) {
  return (
    <div className="cart-list">
      <div className="cart-list__container">
        <ul className="cart-list__container__scroll-inner">
          {Array.isArray(books) &&
            books.length > 0 &&
            books.map((book) => <CartItem key={book.bookId} book={book} />)}
        </ul>
      </div>
    </div>
  );
}

export const CartListSkeleton = () => (
  <div className="cart-list">
    <div className="cart-list__container">
      <ul></ul>
    </div>
  </div>
);
