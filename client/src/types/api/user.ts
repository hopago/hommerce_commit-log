type UserGrade = "일반회원" | "VIP" | "관리자";

type UserStatus = "활성화" | "휴면";

export interface IUser extends Document {
  _id: string;
  id: string;
  username: string;
  imageUrl: string;
  email: string;
  grade: UserGrade;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
}
