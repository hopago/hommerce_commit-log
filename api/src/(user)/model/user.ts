import { Document, Schema, Types, model } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId | string;
  id: string;
  username: string;
  imageUrl: string;
  email: string;
  grade: UserGrade;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema(
  {
    id: {
      type: String,
      require: true,
    },
    username: {
      type: String,
      require: true,
    },
    imageUrl: {
      type: String,
    },
    email: {
      type: String,
      require: true,
    },
    grade: {
      type: String,
      default: "일반회원",
    },
    status: {
      type: String,
      default: "활성화",
    },
  },
  {
    timestamps: true,
  }
);

const User = model<IUser>("User", userSchema);

export default User;
