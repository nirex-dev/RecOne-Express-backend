import mongoose, { Document, Schema } from "mongoose";
import { IMedia } from "../utils/types";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

export interface MediaDocument extends IMedia, Document {}

const MediaSchema = new Schema<MediaDocument>(
  {
    shopId: {
      type: Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    fileId: {
      type: String,
      required: true,
    },

    publicUrl: {
      type: String,
      required: true,
    },
    saved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false },
);

MediaSchema.index({ shopId: 1, categoryId: 1, saved : 1 }, { unique: true });

MediaSchema.plugin(aggregatePaginate);

export default mongoose.model<MediaDocument>("Media", MediaSchema);
