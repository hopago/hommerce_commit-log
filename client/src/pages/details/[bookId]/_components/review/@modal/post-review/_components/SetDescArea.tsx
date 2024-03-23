type SetDescAreaProps = {
  desc: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export default function SetDescArea({ desc, onChange }: SetDescAreaProps) {
  return (
    <div className="set-desc-area">
      <h1>리뷰 작성</h1>
      <textarea
        value={desc}
        placeholder="내용을 10자 이상 입력해주세요."
        onChange={onChange}
        required
        spellCheck={false}
        autoComplete="off"
      />
    </div>
  );
}
