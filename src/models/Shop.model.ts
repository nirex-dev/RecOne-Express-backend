import mongoose, { Document, Schema } from "mongoose";
import { IShop } from "../utils/types";

export interface ShopDocument extends IShop, Document {}

const ShopSchema = new Schema<ShopDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    folderPath: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default mongoose.model<ShopDocument>("Shop", ShopSchema);
