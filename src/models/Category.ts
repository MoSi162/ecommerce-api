import { Schema, model, type Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
}

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

categorySchema.set("toJSON", {
  transform: (_doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const Category = model<ICategory>("Category", categorySchema);
