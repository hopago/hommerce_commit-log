import { Link } from "react-router-dom";

type CartItemInfoProps = {
  title: string;
  img: string;
  discount: number | undefined;
  price: number;
  unit: "원";
  bookId: string;
};

export default function CartItemInfo({
  title,
  img,
  discount,
  price,
  unit,
  bookId,
}: CartItemInfoProps) {
  const discountedPrice = discount ? price - price * (discount / 100) : price;

  return (
    <div className="cart-list__container__scroll-inner__cart-item__details">
      <Link to={`/details/${bookId}`} className="link">
        <img src={img} alt={title} />
      </Link>
      <div className="flex-col">
        <Link to={`/details/${bookId}`} className="link">
          <h1 className="title">{title}</h1>
        </Link>
        <div className="price-wrap">
          {discount ? <span className="discount">{discount}%</span> : null}
          {discount ? (
            <>
              <span className="price">{discountedPrice.toLocaleString()}</span>
              <span className="discounted price">{price.toLocaleString()}</span>
            </>
          ) : (
            <span className="price">{price.toLocaleString()}</span>
          )}
          <span className="unit">{unit}</span>
        </div>
      </div>
    </div>
  );
}
