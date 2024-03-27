import { useLocation } from "react-router-dom";

type SearchHeadingProps = {
  docsLength: number;
};

export default function SearchHeading({ docsLength }: SearchHeadingProps) {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get("keyword");

  return (
    <div className="search-heading">
      <h1>
        <span>' {keyword} '</span> 에 대한 {docsLength.toLocaleString()}
        개의 검색 결과
      </h1>
    </div>
  );
}
