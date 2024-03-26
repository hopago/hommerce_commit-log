import RecommendBookInformationBookList from "./recommend/RecommendBookInformation-BookList";
import RecommendBookInformationMarketing from "./recommend/RecommendBookInformation-Marketing";
import RecommendBookInformationHeading from "./recommend/RecommendBookInformationHeading";

export default function Picks() {
  return (
    <div className="recommend-books picks">
      <div className="recommend-books__user">
        <RecommendBookInformationHeading />
        <div className="recommend-books__user__horizontal">
          <RecommendBookInformationMarketing />
          <RecommendBookInformationBookList />
        </div>
      </div>
    </div>
  );
}
