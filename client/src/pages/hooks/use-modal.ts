import { useEffect } from "react";

import { SetterOrUpdater } from "recoil";

type UseModalProps = {
  show: boolean;
  setShow:
    | SetterOrUpdater<boolean>
    | React.Dispatch<React.SetStateAction<boolean>>;
};

// 재사용 가능 모달 (지역)
export const useModal = ({ show, setShow }: UseModalProps) => {
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
