import { Request, Response } from "express";
import ApiResponse from "../utils/ApiResponse";
import Messages from "../constants/messages";
import HttpStatus from "../constants/httpStatus";
import * as shopService from "../services/Shop.service";

export const createShopController = async (req: Request, res: Response) => {
  try {
    const result = await shopService.createShopService(req.body);

    return ApiResponse.created(res, Messages.CREATED, result);
  } catch (err: any) {
    return ApiResponse.error(
      res,
      err.message || Messages.ERROR.INTERNAL_SERVER_ERROR,
      err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      err,
    );
  }
};

export const getAllShopsController = async (req: Request, res: Response) => {
  try {
    const result = await shopService.getAllShopsService();
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

export const deleteShopController = async (req: Request, res: Response) => {
  try {
    const shopId: any = req.params.shopId;

    const result = await shopService.deleteShopService(shopId);

    return ApiResponse.success(res, result, Messages.DELETED);
  } catch (err: any) {
    return ApiResponse.error(
      res,
      err.message || Messages.ERROR.INTERNAL_SERVER_ERROR,
      err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      err,
    );
  }
};
