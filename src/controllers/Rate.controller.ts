import * as rateService from "../services/Rate.service";
import { Request, Response } from "express";
import ApiResponse from "../utils/ApiResponse";
import Messages from "../constants/messages";
import HttpStatus from "../constants/httpStatus";
import AppError from "../utils/AppError";

export const createAndUpdateRateController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { goldH, goldG, silver, cbSilver } = await req.body;
    const { shopId } = await (req as any).user;

    if (!shopId) {
      throw new AppError(Messages.ERROR.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    }

    // 1. Get today's start & end
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const result = await rateService.createRateOrUpdateService(
      { goldH, goldG, cbSilver, silver },
      startOfDay,
      endOfDay,
      shopId,
    );

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

export const getTodayRateController = async (req: Request, res: Response) => {
  try {
    const { shopId } = await (req as any).user;

    if (!shopId) {
      throw new AppError(Messages.ERROR.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    }

    // 1. Get today's start & end
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const result = await rateService.getTodayRateService(
      startOfDay,
      endOfDay,
      shopId,
    );

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

export const getWeeklyRateController = async (req: Request, res: Response) => {
  try {
    const { shopId } = await (req as any).user;

    if (!shopId) {
      throw new AppError(Messages.ERROR.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    }

    const now = new Date();

    const firstDay = new Date(now.setDate(now.getDate() - now.getDay() + 1));
    firstDay.setHours(0, 0, 0, 0);

    const lastDay = new Date(firstDay);
    lastDay.setDate(firstDay.getDate() + 6);
    lastDay.setHours(23, 59, 59, 999);

    const result = await rateService.getWeeklyRateService(
      firstDay,
      lastDay,
      shopId,
    );

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

export const deleteRateController = async (req: Request, res: Response) => {
  try {
    const deleteId: any = req.params.deleteId;

    if (!deleteId) {
      throw new AppError("Delete id is required.", HttpStatus.BAD_REQUEST);
    }

    const result = await rateService.deleteRateService(deleteId);

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
