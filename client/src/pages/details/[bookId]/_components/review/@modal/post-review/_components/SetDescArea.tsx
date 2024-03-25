import Textarea from "../../../../../../../../_components/Textarea";

type SetDescAreaProps = {
  desc: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export default function SetDescArea({ desc, onChange }: SetDescAreaProps) {
  return (
    <div className="set-desc-area">
      <Textarea
        headingTitle="리뷰 작성"
        value={desc}
        placeholder="내용을 10자 이상 입력해주세요."
        onChange={onChange}
      />
    </div>
  );
}
