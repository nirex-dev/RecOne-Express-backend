import mongoose, { Schema } from "mongoose";
import { Document } from "mongoose";
import { ICategory } from "../utils/types";

export interface CategoryDocument extends ICategory, Document {}

const CategorySchema = new Schema<CategoryDocument>(
  {
    shopId: {
      type: Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    folderPath: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

CategorySchema.index({ shopId: 1, folderPath: 1, name: 1 }, { unique: true });

export default mongoose.model<CategoryDocument>("Category", CategorySchema);
