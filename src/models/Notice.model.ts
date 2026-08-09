import mongoose, { Schema } from "mongoose";

const noticeSchema = new mongoose.Schema(
  {
    shopId: {
      type: Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
    },
    notice: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export default mongoose.model("Notice", noticeSchema);