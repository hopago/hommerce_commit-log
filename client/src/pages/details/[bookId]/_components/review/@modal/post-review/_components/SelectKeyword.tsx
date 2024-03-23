import { cn } from "../../../../../../../../lib/utils";

type SelectKeywordProps = {
  selectList: ReviewKeywords[];
  keyword: ReviewKeywords | null;
  handleChangeKeyword: (keyword: ReviewKeywords) => void;
};

export default function SelectKeyword({
  keyword,
  selectList,
  handleChangeKeyword,
}: SelectKeywordProps) {
  return (
    <div className="select-keyword-container">
      <div className="select-keyword-container__header">
        <h3>리뷰 키워드</h3>
        <p>가장 와 닿는 하나의 키워드를 선택해주세요.</p>
      </div>
      <ul>
        {selectList.map((list) => (
          <li key={list}>
            <button
              type="button"
              className={cn("", keyword === list && "active")}
              onClick={() => handleChangeKeyword(list)}
            >
              <p>{list}</p>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
