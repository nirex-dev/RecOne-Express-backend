import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";
import ApiResponse from "../utils/ApiResponse";
import Messages from "../constants/messages";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { role } = (req as any).user;
    if (role !== "admin") {
      return ApiResponse.forbidden(res, Messages.ERROR.FORBIDDEN);
    }
    next();
  } catch (error) {
    logger.error("Failed to Check is admin or not!", error);
    return ApiResponse.forbidden(res, Messages.ERROR.FORBIDDEN);
  }
};
