type AuthorType =
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

export interface IAuthor extends Document {
  _id: string;
  name: string;
  job: AuthorType;
  intro: string;
  books: IBook[];
  representBook: string;
  img?: string;
  createdAt: Date;
  updatedAt: Date;
}
