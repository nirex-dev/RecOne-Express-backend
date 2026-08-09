import HttpStatus from "../constants/httpStatus";
import AppError from "../utils/AppError";
import logger from "../utils/logger";

export async function createNoticeServices(notice: string) {
  try {
  } catch (error: any) {
    logger.error(error.message, error);

    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(error.message, HttpStatus.BAD_REQUEST);
  }
}

export async function getNoticeServices() {
  try {
  } catch (error: any) {
    logger.error(error.message, error);

    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(error.message, HttpStatus.BAD_REQUEST);
  }
}

export async function deleteNoticeServices(deleteId: string) {
  try {
  } catch (error: any) {
    logger.error(error.message, error);

    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(error.message, HttpStatus.BAD_REQUEST);
  }
}
