import { useLayoutEffect, useRef, useState } from "react";

export const useHoverMenu = () => {
  const [show, setShow] = useState(false);
  const menuRef = useRef(null);

  useLayoutEffect(() => {
    const menuElement = menuRef.current as HTMLUListElement | null;
    if (!menuElement) return;

    const onHover = () => {
      setShow(true);
    };

    const onLeave = () => {
      setShow(false);
    };

    menuElement.addEventListener("mouseenter", onHover);
    menuElement.addEventListener("mouseleave", onLeave);

    return () => {
      menuElement.removeEventListener("mouseenter", onHover);
      menuElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return {
    show,
    menuRef,
  };
};
