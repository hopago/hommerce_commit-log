import { MdSearch } from "react-icons/md";
import NextIcon from "../../../_components/NextIcon";
import PrevIcon from "../../../_components/PrevIcon";
import { cn } from "../../../../lib/utils";

type ImageHoverMenuProps = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  handleNext: () => void;
  handlePrev: () => void;
  prevDisabled: boolean;
  nextDisabled: boolean;
};

export default function ImageHoverMenu({
  show,
  setShow,
  handleNext,
  handlePrev,
  nextDisabled,
  prevDisabled,
}: ImageHoverMenuProps) {
  return (
    <div className={cn("img-hover-menu", show ? "flex" : "none")}>
      <div className="img-hover-menu__horizontal">
        <PrevIcon handlePrev={handlePrev} prevDisabled={prevDisabled} />
        <button onClick={() => setShow(true)}>
          <MdSearch size={21} />
          <span>크게 보기</span>
        </button>
        <NextIcon handleNext={handleNext} nextDisabled={nextDisabled} />
      </div>
    </div>
  );
}
