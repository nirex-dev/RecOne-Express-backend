import { Request, Response, NextFunction } from "express";
import HttpStatus from "../constants/httpStatus";
import Messages from "../constants/messages";
import ApiResponse from "../utils/ApiResponse";
import logger from "../utils/logger";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.error("Error", err);

  let statusCode = err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
  let message = err.message || Messages.ERROR.INTERNAL_SERVER_ERROR;
  let errorDetails: any = null;

  // 🔹 Mongoose Validation Error
  if (err.name === "ValidationError") {
    statusCode = HttpStatus.BAD_REQUEST;
    message = Messages.ERROR.BAD_REQUEST;
    errorDetails = Object.values(err.errors).map((e: any) => e.message);
  }

  // 🔹 Duplicate Key Error
  else if (err.code === 11000) {
    statusCode = HttpStatus.CONFLICT;
    const field = Object.keys(err.keyValue)[0];
    message = `${field} already exists`;
  }

  // 🔹 JWT Errors
  else if (err.name === "JsonWebTokenError") {
    statusCode = HttpStatus.UNAUTHORIZED;
    message = "Invalid token";
  } else if (err.name === "TokenExpiredError") {
    statusCode = HttpStatus.UNAUTHORIZED;
    message = "Token expired";
  }

  // 🔹 Invalid MongoDB ID
  else if (err.name === "CastError") {
    statusCode = HttpStatus.BAD_REQUEST;
    message = "Invalid ID format";
  }

  // 🔹 Express Validator Error (if passed via next)
  else if (err.array) {
    statusCode = HttpStatus.BAD_REQUEST;
    message = Messages.ERROR.BAD_REQUEST;
    errorDetails = err.array().map((e: any) => ({
      field: e.param,
      message: e.msg,
    }));
  }

  // 🔥 Development stack trace
  if (process.env.NODE_ENV === "development") {
    errorDetails = {
      ...errorDetails,
      stack: err.stack,
    };
  }

  return ApiResponse.error(res, message, statusCode, errorDetails);
};
