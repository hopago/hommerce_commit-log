type EnhancedImageViewerProps = {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
};

export default function EnhancedImageViewer({
  setShow,
  setIndex,
}: EnhancedImageViewerProps) {
  return <div>ShowImage</div>;
}
