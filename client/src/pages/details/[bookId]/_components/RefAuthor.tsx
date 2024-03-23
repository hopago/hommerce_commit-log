import { Link } from "react-router-dom";

import { IAuthor } from "../../../../types/api/author";

import defaultImg from "../../../../assets/img_default_pp.png";

type RefAuthorProps = {
  author: IAuthor;
};

export default function RefAuthor({ author }: RefAuthorProps) {
  return (
    <li>
      <Link to={`/author/profile/${author._id}`} className="link">
        <div className="img-wrap">
          <img src={author.img ?? defaultImg} alt={`${author.name}`} />
        </div>
        <div className="info-col">
          <span>{author.name}</span>
          <p>{author.representBook}</p>
        </div>
      </Link>
    </li>
  );
}
