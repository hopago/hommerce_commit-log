import { MdOutlineInfo } from "react-icons/md";

import TagBox from "../../../../../_components/TagBox";
import ShowDataToggle from "../../../../../_components/ShowDataToggle";
import ReferrerBookItem from "../ReferrerBookItem";
import { AuthorType } from "../../../../_components/types/author";

import { useState } from "react";
import { useParams } from "react-router-dom";

import { IAuthor } from "../../../../../types/api/author";

type AuthorDetailsProps = {
  author: IAuthor;
};

export default function AuthorDetails({ author }: AuthorDetailsProps) {
  const { bookId } = useParams();

  const preview = author.intro.slice(0, 100);

  const [show, setShow] = useState(false);

  return (
    <div className="details-author-info__horizontal__contents">
      <h1>작가정보</h1>
      <div className="details-author-info__horizontal__contents__inner">
        <div className="title-wrap">
          <div className="author-name">
            <span>저자(글)</span>
            <span>
              <strong>{author.name}</strong>
            </span>
          </div>
          <button className="details-info-box">
            <MdOutlineInfo className="icon" />
            <span>상세정보</span>
          </button>
        </div>
        <div className="tag-box-wrap">
          <TagBox
            authorName={author.name}
            authorJob={author.job as AuthorType}
          />
        </div>
        <p>{show ? author.intro : preview + "..."}</p>
        <ShowDataToggle show={show} setShow={setShow} />
        <ul>
          {author.books.map((book) => {
            if (bookId && book._id !== bookId) {
              return <ReferrerBookItem key={book._id} book={book} />;
            }
          })}
        </ul>
      </div>
    </div>
  );
}
