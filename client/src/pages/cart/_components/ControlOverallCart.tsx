import RemoveAllCartItem from "./RemoveAllCartItem";
import SelectAllCartItem from "./SelectAllCartItem";

export default function ControlOverallCart() {
  return (
    <div className="cart-control">
      <div className="cart-control__wrap">
        <SelectAllCartItem />
        <RemoveAllCartItem />
      </div>
    </div>
  );
}
