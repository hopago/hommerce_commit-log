import EnhancedImageViewer from "../../../../@modal/enhancedImageViewer/ShowImage";

import { useHoverMenu } from "../../../../hooks/use-hover-menu";
import { useModal } from "../../../../hooks/use-modal";
import { useImageSlide } from "../../hooks/use-image-slide";
import ImageHoverMenu from "../ImageHoverMenu";
import ImageSliderIndicator from "../ImageSliderIndicator";

type SingleBookThumbnailProps = {
  representImage: string;
  images: string[] | undefined;
};

export default function SingleBookThumbnail({
  representImage,
  images,
}: SingleBookThumbnailProps) {
  if (!images) {
    return (
      <div className="details-single-book__horizontal__thumbnail">
        <div className="img-wrap">
          <img src={representImage} alt="details-single-book" />
        </div>
      </div>
    );
  }

  if (images) {
    const slideImages = [representImage, ...images];

    const { show: showHoverMenu, onHover, onLeave } = useHoverMenu();

    const { index, handleNext, handlePrev, setIndex } = useImageSlide(
      slideImages.length
    );

    const { show: showImageModal, setShow: setShowImageModal } = useModal();

    return (
      <div className="details-single-book__horizontal__img-slide">
        <div className="img-wrap" onMouseEnter={onHover} onMouseLeave={onLeave}>
          <img src={slideImages[index]} alt="details-single-book" />
        </div>
        {showHoverMenu && <ImageHoverMenu setShow={setShowImageModal} />}
        {showImageModal && <EnhancedImageViewer setShow={setShowImageModal} />}
        <ImageSliderIndicator handleNext={handleNext} handlePrev={handlePrev} />
      </div>
    );
  }

  return null;
}
