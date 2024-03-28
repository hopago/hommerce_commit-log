import { FaBookOpen } from "react-icons/fa";

import CartItem, { CartItemSkeleton } from "./CartItem";

type CartListProps = {
  books: CartList;
};

export default function CartList({ books }: CartListProps) {
  return (
    <div className="cart-list">
      <div className="cart-list__container">
        <div className="item-header">
          <FaBookOpen className="icon" />
          <h1>Hommerce/도서</h1>
        </div>
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
      <div className="item-header">
        <FaBookOpen className="icon" />
        <h1>Hommerce/도서</h1>
      </div>
      <ul>
        {[...Array.from({ length: 3 })].map((_, i) => (
          <CartItemSkeleton key={i} />
        ))}
      </ul>
    </div>
  </div>
);
