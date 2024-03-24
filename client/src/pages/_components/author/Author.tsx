import { Link } from "react-router-dom";

import { IAuthor } from "../../../types/api/author";

import defaultProfile from "../../../assets/img_default_pp.png";

type AuthorProps = {
  author: IAuthor;
};

export default function Author({ author }: AuthorProps) {
  return (
    <li>
      <Link className="link" to="/">
        <div className="img-wrap">
          <img src={author.img ?? defaultProfile} alt={author.name} />
          <div className="bg" />
        </div>
        <div className="info">
          <div className="text-wrap">
            <span>{author.representBook}</span>
            <p>{author.name}</p>
          </div>
        </div>
      </Link>
    </li>
  );
}
