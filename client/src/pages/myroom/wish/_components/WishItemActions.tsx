import { useRef } from "react";

import { useToggle } from "../../../hooks/use-toggle";

import { MdMoreVert } from "react-icons/md";

import FavorItemActions from "./FavorItemActions";

export default function WishItemActions({ bookId }: { bookId: string }) {
  const moreVertRef = useRef(null);

  const { show, toggleClick } = useToggle(moreVertRef);

  return (
    <div className="actions" ref={moreVertRef}>
      <MdMoreVert className="icon" onClick={toggleClick} />
      {show && <FavorItemActions bookId={bookId} />}
    </div>
  );
}
