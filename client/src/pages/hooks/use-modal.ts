import { useEffect, useState } from "react";

// 재사용 가능 모달 (지역)
export const useModal = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [show]);

  return {
    show,
    setShow,
  };
};
