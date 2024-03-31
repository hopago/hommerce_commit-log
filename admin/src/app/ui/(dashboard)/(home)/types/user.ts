export interface IUser {
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
