import { Document, Schema, Types, model } from "mongoose";

export interface IUserData extends Document {
  _id: Types.ObjectId;
  id: string;
  category: Record<BookSubCategory, number>;
}

const userDataSchema = new Schema(
  {
    id: {
      type: String,
      require: true,
    },
    category: {
      type: Map,
      of: Number,
    },
  },
  {
    timestamps: true,
  }
);

const UserData = model<IUserData>("UserData", userDataSchema);

export default UserData;
