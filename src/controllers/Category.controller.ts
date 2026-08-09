import { Request, Response } from "express";
import * as categoryService from "../services/Category.service";
import ApiResponse from "../utils/ApiResponse";
import Messages from "../constants/messages";
import HttpStatus from "../constants/httpStatus";
import AppError from "../utils/AppError";

export const createCategoryController = async (req: Request, res: Response) => {
  try {
    const { name } = await req.body;
    const { shopId } = await (req as any).user;

    if (!shopId) {
      throw new AppError(Messages.ERROR.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    }

    const result = await categoryService.createCateroyService(
      name,
      shopId,
      "/",
    );

    return ApiResponse.created(res, Messages.SUCCESS, result);
  } catch (err: any) {
    return ApiResponse.error(
      res,
      err.message || Messages.ERROR.INTERNAL_SERVER_ERROR,
      err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      err,
    );
  }
};

export const deleteCategoryController = async (req: Request, res: Response) => {
  try {
    const categoryId: any = await req.params.categoryId;

    if (!categoryId) {
      throw new AppError("Category id is required.", HttpStatus.BAD_REQUEST);
    }

    const result = await categoryService.deleteCategoryService(categoryId);

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

export const allCategoryController = async (req: Request, res: Response) => {
  try {
    const { shopId } = await (req as any).user;

    if (!shopId) {
      throw new AppError(Messages.ERROR.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    }

    const result = await categoryService.allCaterogryService(shopId);

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
