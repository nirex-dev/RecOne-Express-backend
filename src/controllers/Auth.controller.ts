import { Request, Response } from "express";
import * as authService from "../services/Auth.service";
import ApiResponse from "../utils/ApiResponse";
import Messages from "../constants/messages";
import HttpStatus from "../constants/httpStatus";
import AppError from "../utils/AppError";

export const signUpController = async (req: Request, res: Response) => {
  try {
    const { shopId } = await req.body;

    const result = await authService.registerUserService(req.body, shopId);
    return ApiResponse.created(res, Messages.AUTH.CREATED, result);
  } catch (err: any) {
    return ApiResponse.error(
      res,
      err.message || Messages.ERROR.INTERNAL_SERVER_ERROR,
      err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      err,
    );
  }
};

export const signInController = async (req: Request, res: Response) => {
  try {
    const result = await authService.loginUserService(req.body);
    return ApiResponse.success(res, result, "Login successful");
  } catch (err: any) {
    return ApiResponse.error(
      res,
      err.message || Messages.ERROR.INTERNAL_SERVER_ERROR,
      err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      err,
    );
  }
};

export const findUserController = async (req: Request, res: Response) => {
  try {
    const result = await authService.findUserService(req.body.number);

    return ApiResponse.success(res, result, "User found and OTP generated");
  } catch (err: any) {
    return ApiResponse.error(
      res,
      err.message || Messages.ERROR.INTERNAL_SERVER_ERROR,
      err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      err,
    );
  }
};

export const verifyOTPController = async (req: Request, res: Response) => {
  try {
    await authService.verifyOTPService(req.body);
    return ApiResponse.success(res, null, "OTP verified successfully");
  } catch (err: any) {
    return ApiResponse.error(
      res,
      err.message || Messages.ERROR.INTERNAL_SERVER_ERROR,
      err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      err,
    );
  }
};

export const resetPasswordController = async (req: Request, res: Response) => {
  try {
    await authService.resetPasswordService(req.body);
    return ApiResponse.success(res, null, "Password reset successfully");
  } catch (err: any) {
    return ApiResponse.error(
      res,
      err.message || Messages.ERROR.INTERNAL_SERVER_ERROR,
      err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      err,
    );
  }
};

export const logOutController = async (req: Request, res: Response) => {
  try {
    const id = (req as any).user._id;

    if (!id) {
      throw new AppError(Messages.ERROR.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    }

    const response = await authService.logoutService(id);
    return ApiResponse.success(res, response, Messages.SUCCESS);
  } catch (err: any) {
    return ApiResponse.error(
      res,
      err.message || Messages.ERROR.INTERNAL_SERVER_ERROR,
      err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      err,
    );
  }
};
