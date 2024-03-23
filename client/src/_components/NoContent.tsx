import noResult from "../assets/img_no-results.png";

type NoContentProps = {
  text?: string;
};

export default function NoContent({ text }: NoContentProps) {
  return (
    <div className="spinner-container">
      <img src={noResult} alt="" />
      {text && <span>{text}</span>}
    </div>
  );
}
