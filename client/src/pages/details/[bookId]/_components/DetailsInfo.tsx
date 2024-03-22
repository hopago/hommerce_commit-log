import BookContentList from "./book/BookContentList";
import BookIntro from "./book/BookIntro";
import BookInside from "./book/BookInside";
import BookPublisherReview from "./book/BookPublisherReview";

import { DetailsContentType } from "./book/BookDetailsContents";

type DetailsInfoProps = {
  content: DetailsContentType;
  details: IDetails;
};

export default function DetailsInfo({ content, details }: DetailsInfoProps) {
  switch (content) {
    case "책소개":
      return <BookIntro intro={details.intro} awards={details.awards} />;
    case "목차":
      return <BookContentList contentList={details.contentsList} />;
    case "책 속으로":
      return <BookInside bookInside={details.bookInside} />;
    case "서평":
      return <BookPublisherReview review={details.bookPublisherReview} />;
    default:
      return null;
  }
}
