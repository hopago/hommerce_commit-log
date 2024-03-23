import { IAuthor } from "../../../types/api/author";

/* author-referrer / name, job, intro, books: TBookShortcut[] */
export type AuthorType =
  | "문학가"
  | "그림책작가"
  | "교육가/인문학자"
  | "사회학자"
  | "경제/금융/기업인"
  | "종교인"
  | "IT종사자"
  | "스포츠인"
  | "철학자"
  | "그외직업군";

export type AuthorShortcut = Pick<IAuthor, "name" | "img" | "representBook">;
