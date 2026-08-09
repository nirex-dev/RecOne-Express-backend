import { validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";
import ApiResponse from "../ApiResponse";
import Messages from "../../constants/messages";

const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  return ApiResponse.badRequest(
    res,
    Messages.ERROR.BAD_REQUEST,
    errors.array(),
  );
};

export default validateRequest;
