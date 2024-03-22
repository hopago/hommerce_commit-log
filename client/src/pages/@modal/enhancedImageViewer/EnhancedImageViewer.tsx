import { MdClose } from "react-icons/md";

type EnhancedImageViewerProps = {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  images: string[];
  index: number;
};

export default function EnhancedImageViewer({
  setShow,
  setIndex,
  images,
  index,
}: EnhancedImageViewerProps) {
  return (
    <div className="enhanced-image-viewer">
      <div className="bg" />
      <div className="enhanced-image-viewer__contents">
        <div className="enhanced-image-viewer__contents__wrap">
          <button onClick={() => setShow(false)}>
            <MdClose color="#fff" size={27} />
          </button>
          <div className="curr-img">
            <img src={images[index]} alt="book-image" />
          </div>
          <ul className="enhanced-image-viewer__contents__wrap__preview">
            {images.map((img, i) => (
              <li className="img-wrap" key={img} onClick={() => setIndex(i)}>
                <img src={img} alt="book-image" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
