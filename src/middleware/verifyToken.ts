import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";
import ApiResponse from "../utils/ApiResponse";
import Messages from "../constants/messages";
import config from "../utils/config";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      logger.info("No token provided in the Authorization header");
      return ApiResponse.unauthorized(res, Messages.ERROR.UNAUTHORIZED);
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      logger.info("Token is missing after Bearer");
      return ApiResponse.unauthorized(res, Messages.ERROR.UNAUTHORIZED);
    }

    // verify the token
    const decoded = jwt.verify(token, config.jwt.secret);

    // attach the decoded token to the request object for use in other routes
    (req as any).user = decoded;

    next();
  } catch (error) {
    logger.error("Token verification failed");
    return ApiResponse.unauthorized(res, Messages.ERROR.UNAUTHORIZED);
  }
};
