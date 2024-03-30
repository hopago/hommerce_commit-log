import Button from "../../../_components/Button";

import heart from "../../../assets/ico_heart.png";

export default function AddFavorButton() {
  // TODO: Search Favor many
  const onFavorClick = () => {};

  return (
    <Button
      className="favor"
      icon={heart}
      type="button"
      size="sm"
      onClick={onFavorClick}
      isAuth={true}
    />
  );
}
