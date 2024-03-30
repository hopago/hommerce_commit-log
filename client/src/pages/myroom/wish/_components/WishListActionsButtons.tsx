import MutateWishList from "./MutateWishList";
import SelectAll from "./SelectAll";

export default function WishListActionsButtons() {
  return (
    <div className="wish-list-container__actions">
      <div className="wish-list-container__actions__wrap">
        <SelectAll />
        <MutateWishList />
      </div>
    </div>
  );
}
