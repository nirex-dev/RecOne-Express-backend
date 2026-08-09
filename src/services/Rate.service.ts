import HttpStatus from "../constants/httpStatus";
import Messages from "../constants/messages";
import RateRepository from "../repositories/Rate.repository";
import AppError from "../utils/AppError";
import logger from "../utils/logger";

const rateRepo = new RateRepository();

export async function createRateOrUpdateService(
  data: { goldH: string; goldG: string; silver: string; cbSilver: string },
  startOfDay: any,
  endOfDay: any,
  shopId: string,
) {
  try {
    let result;

    const filter = {
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
      shopId: shopId,
    };

    const existedRate: any = await rateRepo.findOne(filter);

    if (existedRate?._id) {
      existedRate.goldH = data.goldH;
      existedRate.goldG = data.goldG;
      existedRate.silver = data.silver;
      existedRate.cbSilver = data.cbSilver;

      result = await existedRate.save();

      return result;
    }

    result = await rateRepo.create({
      shopId: shopId,
      goldH: data.goldH,
      goldG: data.goldG,
      silver: data.silver,
      cbSilver: data.cbSilver,
    });

    return result;
  } catch (error) {
    logger.error("Failed to create or update rate.", error);

    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(
      "Faild To Create or Update Rate.",
      HttpStatus.BAD_REQUEST,
    );
  }
}

export async function getTodayRateService(
  startOfDay: any,
  endOfDay: any,
  shopId: string,
) {
  try {
    const filter = {
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
      shopId: shopId,
    };

    const tudayRate: any = await rateRepo.findOne(filter);

    if (!tudayRate?._id) {
      throw new AppError("Faild to get today rate.", HttpStatus.NO_CONTENT);
    }

    return tudayRate;
  } catch (error) {
    logger.error("Faild to get today rate.", error);

    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError("Faild to get today rate.", HttpStatus.BAD_REQUEST);
  }
}

export async function getWeeklyRateService(
  startOfDay: any,
  endOfDay: any,
  shopId: string,
) {
  try {
    const filter = {
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
      shopId: shopId,
    };

    const weeklyRate = await rateRepo.find(filter);

    if (!weeklyRate || weeklyRate?.length === 0) {
      throw new AppError("No weekly rate found.", HttpStatus.NOT_FOUND);
    }

    return weeklyRate;
  } catch (error) {
    logger.error("Failed to get weekly rate.", error);

    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError("Faild to get weekly rate.", HttpStatus.BAD_REQUEST);
  }
}

export async function deleteRateService(id: string) {
  try {
    const isExist: any = await rateRepo.findById(id);

    if (!isExist?._id) {
      throw new AppError(Messages.ERROR.NOT_FOUND, HttpStatus.BAD_REQUEST);
    }

    const deleteRate: any = await rateRepo.deleteById(id);

    if (!deleteRate?._id) {
      throw new AppError("Faild to delete rate.", HttpStatus.BAD_REQUEST);
    }

    return deleteRate;
  } catch (error) {
    logger.error("Faild to delete rate.", error);

    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError("Faild to delete rate.", HttpStatus.BAD_REQUEST);
  }
}
