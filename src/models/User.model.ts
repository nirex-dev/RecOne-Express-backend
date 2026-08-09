import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../utils/config";
import { IAuth } from "../utils/types";

export interface UserDocument extends IAuth, Document {}

const UserSchema = new mongoose.Schema<UserDocument>(
  {
    shopId: {
      type: Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    number: {
      type: Number,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    otpValidation: {
      type: Boolean,
      default: false,
    },
    resetSessionExpiry: {
      type: Date,
    },
    otpHash: {
      type: String,
    },
    otpExpiry: {
      type: Date,
    },
    accessToken: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false },
);

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string,
) {
  return await bcrypt.compare(candidatePassword, this.password);
};

UserSchema.methods.generateOTP = function () {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const salt = bcrypt.genSaltSync(10);
  this.otpHash = bcrypt.hashSync(otp, salt);
  this.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
  this.otpValidation = false;
  return otp;
};

UserSchema.methods.verifyOTP = function (otp: string) {
  if (this.otpExpiry < new Date()) {
    return false;
  }
  return bcrypt.compareSync(otp, this.otpHash);
};

UserSchema.methods.generateAccessToken = function (shopId: string) {
  const payload = {
    _id: this._id,
    shopId: shopId,
    role: this.isAdmin === true ? "admin" : "user",
  };

  return jwt.sign(payload, config.jwt.secret);
};

const UserModel = mongoose.model<UserDocument>("User", UserSchema);

export default UserModel;
