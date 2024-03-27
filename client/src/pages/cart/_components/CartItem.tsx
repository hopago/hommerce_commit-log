import AmountControl from "./AmountControl";
import CartItemInfo from "./CartItemInfo";
import SelectOneCartItem from "./SelectOneCartItem";

type CartItemProps = {
  book: CartItem;
};

export default function CartItem({ book }: CartItemProps) {
  console.log(book);

  return (
    <li className="cart-list__scroll-inner__cart-item">
      <SelectOneCartItem
        bookId={book.bookId}
        price={book.price}
        discount={book.discount ?? null}
      />
      <CartItemInfo
        title={book.title}
        img={book.img}
        discount={book.discount}
        price={book.price}
        unit={book.unit}
      />
      <AmountControl />
    </li>
  );
}
