import AuthRepository from "../repositories/Auth.repository";
import UserModel from "../models/User.model";
import Messages from "../constants/messages";
import { LoginData, SignupData } from "../utils/types";
import jwt from "jsonwebtoken";
import config from "../utils/config";
import AppError from "../utils/AppError";
import HttpStatus from "../constants/httpStatus";
import logger from "../utils/logger";

const authRepo = new AuthRepository();

export async function registerUserService(data: SignupData, shopId: string) {
  try {
    const existingUser = await authRepo.findByPhoneNo(data.number);

    if (existingUser?._id) {
      throw new AppError(Messages.AUTH.ALREADY_EXISTS, HttpStatus.NO_CONTENT);
    }

    // Create user with validation: false initially
    const newUser: any = new UserModel({
      shopId: shopId,
      name: data?.name,
      number: data?.number,
      password: data?.password,
      validation: false,
    });

    await newUser.save();

    if (!newUser?._id) {
      throw new AppError("User creation failed!", HttpStatus.BAD_REQUEST);
    }

    return null;
  } catch (error: any) {
    logger.error(error.message, error);

    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(
      error.message || "Failed to register user.",
      HttpStatus.BAD_REQUEST,
    );
  }
}

export async function loginUserService(data: LoginData) {
  try {
    const user: any = await authRepo.findByPhoneNo(data.number);

    if (!user) {
      throw new AppError(Messages.AUTH.NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    const isMatch = await user.comparePassword(data.password);

    if (!isMatch) {
      throw new AppError(
        Messages.ERROR.INVALID_CREDENTIAL,
        HttpStatus.BAD_REQUEST,
      );
    }

    const accessToken = user.generateAccessToken(user?.shopId);
    user.accessToken = accessToken;

    await user.save();

    return { accessToken, user: { name: user.name, number: user.number } };
  } catch (error: any) {
    logger.error(error.message, error);

    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(
      error.message || "user Login Failed.",
      HttpStatus.BAD_REQUEST,
    );
  }
}

export async function findUserService(number: number) {
  try {
    const user: any = await authRepo.findByPhoneNo(number);

    if (!user) {
      throw new AppError(Messages.AUTH.NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    const otp = user.generateOTP();

    await user.save();

    const payload = {
      _id: user._id,
    };

    const tempToken = jwt.sign(payload, config.jwt.tempSecret, {
      expiresIn: "10m",
    });

    // todo: send otp through sms

    if (config.node_env !== "production") {
      return { otp, tempToken };
    }

    return { tempToken };
  } catch (error: any) {
    logger.error(error.message, error);

    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(
      error.message || "Failed to find user.",
      HttpStatus.BAD_REQUEST,
    );
  }
}

export async function verifyOTPService(data: any) {
  try {
    if (!data?.token) {
      throw new AppError(Messages.ERROR.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    }

    const decordedToken: any = jwt.verify(data?.token, config.jwt.tempSecret);

    if (!decordedToken) {
      throw new AppError(Messages.ERROR.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    }

    const user: any = await authRepo.findById(decordedToken._id);

    if (!user) {
      throw new AppError(Messages.AUTH.NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    if (user?.otpValidation) {
      throw new AppError("OTP already validated", HttpStatus.UNAUTHORIZED);
    }

    const isValid = user.verifyOTP(data.otp);

    if (!isValid) {
      throw new AppError("Invalid or expired OTP", HttpStatus.BAD_REQUEST);
    }

    user.otpValidation = true;
    // create reset session expiry
    user.resetSessionExpiry = new Date(Date.now() + 10 * 60 * 1000);
    user.otpHash = undefined;
    user.otpExpiry = undefined;
    await user.save();

    return null;
  } catch (error: any) {
    logger.error(error.message, error);

    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(
      error.message || "Failed to verify otp.",
      HttpStatus.BAD_REQUEST,
    );
  }
}

export async function resetPasswordService(data: any) {
  try {
    if (!data?.token) {
      throw new AppError(Messages.ERROR.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    }

    const decordedToken: any = jwt.verify(data.token, config.jwt.tempSecret);

    if (!decordedToken) {
      throw new AppError(Messages.ERROR.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    }

    const user: any = await authRepo.findById(decordedToken._id);

    if (!user) {
      throw new AppError(Messages.AUTH.NOT_FOUND, HttpStatus.BAD_REQUEST);
    }

    if (!user?.otpValidation) {
      throw new AppError(Messages.ERROR.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    }

    if (!user.resetSessionExpiry || user.resetSessionExpiry < new Date()) {
      // session expired

      user.otpValidation = false;
      user.resetSessionExpiry = null;

      await user.save();

      return new AppError("Reset session expired", 400);
    }
    await user.save();

    return null;
  } catch (error: any) {
    logger.error(error.message, error);

    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(
      error.message || "Failed to reset password.",
      HttpStatus.BAD_REQUEST,
    );
  }
}

export async function logoutService(id: string) {
  try {
    const checkUserIsLogoutOrNot = await authRepo.findById(id);

    if (checkUserIsLogoutOrNot.accessToken === null) {
      throw new AppError("User is allready logout.", HttpStatus.BAD_REQUEST);
    }

    await authRepo.updateById(id, { accessToken: null });

    return true;
  } catch (error: any) {
    logger.error(error.message, error);

    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(
      error.message || "Failed to reset password.",
      HttpStatus.BAD_REQUEST,
    );
  }
}
