import { Request, Response } from "express";
import ApiResponse from "../utils/ApiResponse";
import Messages from "../constants/messages";
import HttpStatus from "../constants/httpStatus";
import AppError from "../utils/AppError";
import * as noticeServices from "../services/Notice.services";

export const createNoticeController = async (req: Request, res: Response) => {
  try {
    const { notice } = req.body;

    const { shopId } = await (req as any).user;

    if (!shopId) {
      throw new AppError(Messages.ERROR.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    }

    const result = await noticeServices.createNoticeServices(notice);

    return ApiResponse.created(res, Messages.SUCCESS);
  } catch (err: any) {
    return ApiResponse.error(
      res,
      err.message || Messages.ERROR.INTERNAL_SERVER_ERROR,
      err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      err,
    );
  }
};

export const getNoticeController = async (req: Request, res: Response) => {
  try {
    const { shopId } = await (req as any).user;

    if (!shopId) {
      throw new AppError(Messages.ERROR.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    }

    const result = await noticeServices.getNoticeServices();

    return ApiResponse.success(res, result, Messages.SUCCESS, HttpStatus.OK);
  } catch (err: any) {
    return ApiResponse.error(
      res,
      err.message || Messages.ERROR.INTERNAL_SERVER_ERROR,
      err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      err,
    );
  }
};

export const deleteNoticeController = async (req: Request, res: Response) => {
  try {
    const deleteId: any = req.params.deleteId;

    if (!deleteId) {
      throw new AppError("Delete id is required.", HttpStatus.BAD_REQUEST);
    }

    const result = await noticeServices.deleteNoticeServices(deleteId);

    return ApiResponse.success(res, result, Messages.SUCCESS, HttpStatus.OK);

  } catch (err: any) {
    return ApiResponse.error(
      res,
      err.message || Messages.ERROR.INTERNAL_SERVER_ERROR,
      err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      err,
    );
  }
};
