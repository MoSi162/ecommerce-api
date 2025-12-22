import { Schema, model, type Document, Types } from "mongoose";

export interface IOrderProduct {
  productId: Types.ObjectId;
  quantity: number;
}

export interface IOrder extends Document {
  userId: Types.ObjectId;
  products: IOrderProduct[];
  total: number;
}

const orderProductSchema = new Schema<IOrderProduct>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false }
);

const orderSchema = new Schema<IOrder>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: {
      type: [orderProductSchema],
      required: true,
      validate: {
        validator: (v: IOrderProduct[]) => v.length > 0,
        message: "Order must contain at least one product",
      },
    },
    total: { type: Number, required: true, min: 0 },
  },
  {
    timestamps: true,
  }
);

orderSchema.set("toJSON", {
  transform: (_doc, ret) => {
    ret.id = ret._id.toString();
    ret.userId = ret.userId.toString();
    ret.products = ret.products.map((p: any) => ({
      productId: p.productId.toString(),
      quantity: p.quantity,
    }));
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const Order = model<IOrder>("Order", orderSchema);
