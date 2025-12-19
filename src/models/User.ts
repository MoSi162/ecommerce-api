import { Schema, model, type Document } from "mongoose";
export * from "./User";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

 // normalize _id -> id and hide password
 userSchema.set("toJSON", {
   transform: (_doc, ret: any) => {
     ret.id = ret._id.toString();
     delete ret._id;
     delete ret.__v;
     delete ret.password;
     return ret;
   },
 });

export const User = model<IUser>("User", userSchema);
