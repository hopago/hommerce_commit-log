import AuthorDetails from "./AuthorDetails";
import ReferrerAuthors from "../ReferrerAuthors";

import { author } from "../../../../_components/constants/author";

type AuthorInfoProps = {
  authorName: string;
};

// TODO: 저자 생성 + 저자 fetching ( + 연관책 쿼리 ) + 카테고리별 저자 찾고 저자의 책을 찾은 뒤 total views가 가장 높게

export default function AuthorInfo({ authorName }: AuthorInfoProps) {
  // TODO: findAuthorByAuthorName

  return (
    <div className="details-author-info">
      <div className="details-author-info__horizontal">
        <AuthorDetails author={author} />
        <ReferrerAuthors authorJob={author.job} />
      </div>
    </div>
  );
}
