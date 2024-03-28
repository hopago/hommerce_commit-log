import AmountControl from "./AmountControl";
import CartItemInfo, { CartItemInfoSkeleton } from "./CartItemInfo";
import SelectOneCartItem from "./SelectOneCartItem";

import { Skeleton } from "@nextui-org/skeleton";

type CartItemProps = {
  book: CartItem;
};

export default function CartItem({ book }: CartItemProps) {
  return (
    <li className="cart-list__container__scroll-inner__cart-item">
      <SelectOneCartItem
        bookId={book.bookId}
        price={book.price}
        discount={book.discount ?? null}
        amount={book.amount}
      />
      <CartItemInfo
        bookId={book.bookId}
        title={book.title}
        img={book.img}
        discount={book.discount}
        price={book.price}
        unit={book.unit}
      />
      <AmountControl
        bookId={book.bookId}
        price={book.price}
        discount={book.discount}
        unit={book.unit}
      />
    </li>
  );
}

export const CartItemSkeleton = () => (
  <li className="cart-list__container__scroll-inner__cart-item">
    <div className="select-one">
      <Skeleton className="skeleton button" />
    </div>
    <CartItemInfoSkeleton />
    <div className="amount-control">
      <div className="amount-control__wrap">
        <div className="price-wrap">
          <Skeleton className="skeleton span" />
        </div>
        <Skeleton className="skeleton purchase-button" />
      </div>
    </div>
  </li>
);
