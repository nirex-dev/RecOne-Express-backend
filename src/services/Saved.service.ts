import HttpStatus from "../constants/httpStatus";
import Messages from "../constants/messages";
import MediaRepository from "../repositories/Media.repository";
import AppError from "../utils/AppError";
import logger from "../utils/logger";

const mediaRepo = new MediaRepository();

export async function savedAndUnsavedService(mediaId: string, userId: string) {
  try {
    const checkMedia = await mediaRepo.findById(mediaId);

    if (!checkMedia) {
      return new AppError(Messages.ERROR.NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    if (checkMedia.saved === true) {
      checkMedia.saved = false;
      checkMedia.save({ validationResult: false });
    }

    checkMedia.saved = true;
    checkMedia.save({ validationResult: false });

    const savedMedia = await mediaRepo.findOne({ saved: true });

    if (!savedMedia.saved) {
      return new AppError("Faild to save media.", HttpStatus.BAD_REQUEST);
    }

    return savedMedia;
  } catch (error: any) {
    logger.error("Faild to create shop.", error);

    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError("Faild to create shop.", HttpStatus.BAD_REQUEST);
  }
}

export async function allSavedMediaService(userId: string) {
  try {
    const allSavedMedia = await mediaRepo.find({ userId: userId });

    return allSavedMedia;
  } catch (error: any) {
    logger.error("Faild to create shop.", error);

    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError("Faild to create shop.", HttpStatus.BAD_REQUEST);
  }
}
