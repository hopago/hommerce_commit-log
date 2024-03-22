import { useState } from "react";

export const useHoverMenu = () => {
  const [show, setShow] = useState(false);

  const onHover = () => {
    setShow(true);
  };

  const onLeave = () => {
    setShow(false);
  };

  return {
    show,
    onHover,
    onLeave,
  };
};
