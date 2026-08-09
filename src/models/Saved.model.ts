import mongoose, { Document, Schema } from "mongoose";
import { ISaved } from "../utils/types";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

export interface SavedDocument extends ISaved, Document {}

const SavedSchema = new Schema<SavedDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    mediaId: {
      type: Schema.Types.ObjectId,
      ref: "Media",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

SavedSchema.plugin(aggregatePaginate);

export default mongoose.model<SavedDocument>("saved", SavedSchema);
