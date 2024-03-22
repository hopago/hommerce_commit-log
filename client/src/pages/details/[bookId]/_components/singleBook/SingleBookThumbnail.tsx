import { useHoverMenu } from "../../../../hooks/use-hover-menu";
import { useImageSlide } from "../../../../hooks/use-image-slide";
import { useModal } from "../../../../hooks/use-modal";

import EnhancedImageViewer from "../../../../@modal/enhancedImageViewer/ShowImage";
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
  if (!images?.length) {
    return (
      <div className="details-single-book__horizontal__thumbnail">
        <div className="img-wrap">
          <img src={representImage} alt="details-single-book" />
        </div>
      </div>
    );
  }

  if (images.length) {
    const slideImages = [representImage, ...images];

    const { show: showHoverMenu, menuRef } = useHoverMenu();

    const {
      handleNext,
      handlePrev,
      setIndex,
      prevDisabled,
      nextDisabled,
      index,
      position,
    } = useImageSlide({ total: slideImages.length, pixelPerSlide: 380 });

    const { show: showImageModal, setShow: setShowImageModal } = useModal();

    return (
      <div className="details-single-book__horizontal__img-slide" ref={menuRef}>
        <ul
          className="img-slide-container"
          style={{
            transform: `translateX(${position}px)`,
            transition: "transform 0.3s ease-out",
          }}
        >
          {slideImages.map((image) => (
            <li key={image}>
              <div className="img-wrap">
                <img src={image} alt={image} />
              </div>
            </li>
          ))}
        </ul>
        <ImageHoverMenu
          show={showHoverMenu}
          setShow={setShowImageModal}
          handleNext={handleNext}
          handlePrev={handlePrev}
          prevDisabled={prevDisabled}
          nextDisabled={nextDisabled}
        />
        {showImageModal && (
          <EnhancedImageViewer
            setShow={setShowImageModal}
            setIndex={setIndex}
          />
        )}
        <ImageSliderIndicator
          currIndex={index}
          total={slideImages.length}
          handleNext={handleNext}
          handlePrev={handlePrev}
          prevDisabled={prevDisabled}
          nextDisabled={nextDisabled}
        />
      </div>
    );
  }

  return null;
}
