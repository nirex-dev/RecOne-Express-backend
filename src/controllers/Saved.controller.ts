import HttpStatus from "../constants/httpStatus";
import Messages from "../constants/messages";
import ApiResponse from "../utils/ApiResponse";
import { Request, Response } from "express";
import AppError from "../utils/AppError";
import * as savedService from "../services/Saved.service";

export const saveAndUnSavedMediaController = async (
  req: Request,
  res: Response,
) => {
  try {
    const mediaId: any = req.params.mediaId;

    const id = (req as any).user._id;

    if (!mediaId) {
      throw new AppError("Media id is required.", HttpStatus.BAD_REQUEST);
    }

    if (!id) {
      throw new AppError(Messages.ERROR.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    }

    const response = await savedService.savedAndUnsavedService(mediaId, id);

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

export const allSavedMediaController = async (req: Request, res: Response) => {
  try {
    const id = (req as any).user._id;

    if (!id) {
      throw new AppError(Messages.ERROR.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    }

    const response = await savedService.allSavedMediaService(id);

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
