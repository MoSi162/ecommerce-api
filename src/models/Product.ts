import { Schema, model, type Document, Types } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  categoryId: Types.ObjectId;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.set("toJSON", {
  transform: (_doc, ret: any) => {
    ret.id = ret._id.toString();
    ret.categoryId = ret.categoryId.toString();
    delete ret._1;
    delete ret.__v;
    return ret;
  },
});

export const Product = model<IProduct>("Product", productSchema);
