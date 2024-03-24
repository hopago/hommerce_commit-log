import { useParams } from "react-router-dom";

import { useUser } from "@clerk/clerk-react";

import { getQueryClient } from "../../../../../../../lib/react-query/getQueryClient";
import { QueryKeys } from "../../../../../../../lib/react-query/query-key";

import { useFormInputs } from "./hooks/use-form-inputs";

import BookPreview from "./_components/BookPreview";
import SelectKeyword from "./_components/SelectKeyword";
import ReuseButton from "../../../../../../../_components/ReuseButton";
import SetDescArea from "./_components/SetDescArea";

import { MutationProps, usePostReview } from "./services/use-post-review";

import { MdClose } from "react-icons/md";

import { SetterOrUpdater } from "recoil";

type PostReviewProps = {
  setShow: SetterOrUpdater<boolean>;
  hasNoReview?: boolean;
};

const selectList: ReviewKeywords[] = [
  "도움돼요",
  "쉬웠어요",
  "집중돼요",
  "최고에요",
  "추천해요",
];

export default function PostReview({ setShow, hasNoReview }: PostReviewProps) {
  const { bookId } = useParams();
  const { user } = useUser();

  const queryClient = getQueryClient();

  const book = queryClient.getQueryData<IBook>([QueryKeys.BOOK, bookId]);

  const {
    handleScoreChange,
    handleChangeKeyword,
    score,
    keyword,
    handleChangeDesc,
    desc,
  } = useFormInputs();

  // TODO: isUserPosted 시엔 patch handlePatch (로직 작성)
  const { handlePost, isPending } = usePostReview({
    bookId: bookId!,
    setShow,
    userId: user?.id,
  });

  if (!user || !bookId || !book) return null;

  const disabled = isPending || desc.trim() === "" || keyword === null;

  const reviewData: MutationProps = {
    userId: user.id,
    username: user.username!,
    bookTitle: book.title,
    hasNoReview,
    review: {
      rating: String(score) as ReviewRatingType,
      keyword: keyword!,
      desc,
    },
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <div className="post-review">
      <div className="bg-fill" />
      <div className="post-review__contents">
        <form
          className="post-review__contents__container"
          onSubmit={(e) => handlePost(e, reviewData)}
        >
          <div className="form-header">
            <h1>리뷰작성</h1>
            <button type="button" onClick={handleClose}>
              <MdClose size={27} />
            </button>
          </div>
          <div className="post-review__contents__container__scroll">
            {book && (
              <BookPreview
                score={score}
                img={book.representImg}
                title={book.title}
                handleScoreChange={handleScoreChange}
              />
            )}
            <SelectKeyword
              selectList={selectList}
              keyword={keyword}
              handleChangeKeyword={handleChangeKeyword}
            />
            <SetDescArea onChange={handleChangeDesc} desc={desc} />
          </div>
          <div className="submit-button">
            <ReuseButton
              type="submit"
              text="등록"
              size="lg"
              style="purple"
              disabled={disabled}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
