type CartItemInfoProps = {
  title: string;
  img: string;
  discount: number | undefined;
  price: number;
  unit: "원";
};

export default function CartItemInfo({
  title,
  img,
  discount,
  price,
  unit,
}: CartItemInfoProps) {
  return (
    <div className="cart-list__scroll-inner__cart-item__details">
      <img src={img} alt={title} />
      <div className="flex-col">
        <h1 className="title">{title}</h1>
        <div className="text-wrap">
          {discount ? <span className="discount">{discount}</span> : null}
          {price && (
            <span className="price" style={{ fontWeight: "bold" }}>
              {price.toLocaleString()}
            </span>
          )}
          <span className="unit">{unit}</span>
        </div>
      </div>
    </div>
  );
}
