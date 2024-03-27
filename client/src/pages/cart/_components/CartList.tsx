import CartItem from "./CartItem";

type CartListProps = {
  books: IBook[];
};

export default function CartList({ books }: CartListProps) {
  return (
    <>
      <div className="divider" />
      <div className="cart-list">
        <ul>
          {books.map((book) => (
            <CartItem key={book._id} book={book} />
          ))}
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
