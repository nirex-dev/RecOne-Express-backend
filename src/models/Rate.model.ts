import mongoose, { Document, Schema } from "mongoose";
import { IRate } from "../utils/types";

export interface RateDocument extends IRate, Document {}

const RateSchema = new Schema<RateDocument>(
  {
    shopId: {
      type: Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
    },
    goldH : {
      type: Number,
      required: true,
    },
    goldG : {
      type: Number,
      required: true,
    },
    silver: {
      type: Number,
      required: true,
    },
    cbSilver : {
      type : Number,
      required : true,
    },
    expireAt: {
      type: Date,
      default: () => {
        const d = new Date();
        d.setMonth(d.getMonth() + 1);
        return d;
      },
      expires: 0,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export default mongoose.model<RateDocument>("Rate", RateSchema);
