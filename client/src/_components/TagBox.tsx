import { useNavigate } from "react-router-dom";

import { AuthorType } from "../pages/_components/types/author";

type TagBoxProps = {
  authorName: string;
  authorJob: AuthorType;
};

export default function TagBox({ authorName, authorJob }: TagBoxProps) {
  const navigate = useNavigate();

  // TODO: findAuthorByAuthorName

  const onClick = () => {
    navigate(`/author/profile/${authorName}`);
  };

  return (
    <button className="tag-btn" onClick={onClick}>
      {authorJob}
    </button>
  );
}
