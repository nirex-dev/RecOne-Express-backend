import HttpStatus from "../constants/httpStatus";
import Messages from "../constants/messages";
import ApiResponse from "../utils/ApiResponse";
import { Request, Response } from "express";
import * as mediaService from "../services/Media.service";
import AppError from "../utils/AppError";

export const uploadMediaController = async (req: Request, res: Response) => {
  try {
    const file = req.file;

    const categoryId: any = await req.params.categoryId;

    const { shopId } = await (req as any).user;

    if (!file) {
      throw new AppError("File is required.", HttpStatus.BAD_REQUEST);
    }

    if (!shopId) {
      throw new AppError(Messages.ERROR.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    }

    if (!categoryId) {
      throw new AppError("Category id is required.", HttpStatus.BAD_REQUEST);
    }

    const result = await mediaService.uploadMediaService(
      file,
      categoryId,
      shopId,
    );

    return ApiResponse.success(res, result, Messages.SUCCESS);
  } catch (err: any) {
    return ApiResponse.error(
      res,
      err.message || Messages.ERROR.INTERNAL_SERVER_ERROR,
      err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      err,
    );
  }
};

export const deleteMediaController = async (req: Request, res: Response) => {
  try {
    const deleteId: any = await req.params.deleteId;

    if (!deleteId) {
      throw new AppError("File id is required.", HttpStatus.BAD_REQUEST);
    }

    const result = await mediaService.deleteMediaService(deleteId);

    return ApiResponse.success(res, result, Messages.SUCCESS);
  } catch (err: any) {
    return ApiResponse.error(
      res,
      err.message || Messages.ERROR.INTERNAL_SERVER_ERROR,
      err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      err,
    );
  }
};

export const allMediaController = async (req: Request, res: Response) => {
  try {
    const categoryId: any = await req.params.categoryId;

    const { shopId } = await (req as any).user;

    if (!shopId) {
      throw new AppError(Messages.ERROR.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    }

    if (!categoryId) {
      throw new AppError("Category id is required.", HttpStatus.BAD_REQUEST);
    }

    const page = Number(req.query.page);
    const limit = Number(req.query.limit);

    const sort = {
      createdAt: -1,
    };

    const result = await mediaService.allMediaService(
      categoryId,
      sort,
      page,
      limit,
      shopId,
    );

    return ApiResponse.success(res, result, Messages.SUCCESS);
  } catch (err: any) {
    return ApiResponse.error(
      res,
      err.message || Messages.ERROR.INTERNAL_SERVER_ERROR,
      err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      err,
    );
  }
};
