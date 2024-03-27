import { MdCheck } from "react-icons/md";

export default function SelectAllCartItem() {
  const onClick = () => {};

  return (
    <button className="select-all">
      <div className="icon">
        <MdCheck />
      </div>
      <span>전체</span>
    </button>
  );
}
