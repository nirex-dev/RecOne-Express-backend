import mongoose from "mongoose";
import HttpStatus from "../constants/httpStatus";
import CategoryRepository from "../repositories/Category.repository";
import MediaRepository from "../repositories/Media.repository";
import AppError from "../utils/AppError";
import { processImage } from "../utils/ImageHelper";
import { deleteFileImagekit, uploadFileImagekit } from "../utils/ImagekitApi";
import logger from "../utils/logger";
import SavedRepository from "../repositories/Saved.repository";

const categoryRepo = new CategoryRepository();
const mediaRepo = new MediaRepository();
const savedRepo = new SavedRepository();

export async function uploadMediaService(
  file: Express.Multer.File,
  categoryId: string,
  shopId: string,
) {
  try {
    if (!file) {
      throw new AppError("File is required.", HttpStatus.BAD_REQUEST);
    }

    // category check first
    const category = await categoryRepo.findById(categoryId);

    if (!category?._id) {
      throw new AppError("Folder not found.", HttpStatus.NOT_FOUND);
    }

    // process image
    const optimizedBuffer = await processImage(file.buffer);

    // upload image in imagekit
    const uploadedImage = await uploadFileImagekit(
      optimizedBuffer,
      category.name,
      category.folderPath,
    );

    if (!uploadedImage) {
      throw new AppError("Failed to upload media.", HttpStatus.BAD_REQUEST);
    }

    // save db
    const media = await mediaRepo.create({
      shopId,
      name: uploadedImage.name,
      categoryId: category._id,
      fileId: uploadedImage.fileId,
      publicUrl: uploadedImage.url,
    });

    return media;
  } catch (error: any) {
    logger.error(error.message, error);

    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(error.message, HttpStatus.BAD_REQUEST);
  }
}

export async function deleteMediaService(id: string) {
  try {
    const checkExisted = await mediaRepo.findById(id);

    if (!checkExisted?._id) {
      throw new AppError("File not found.", HttpStatus.NOT_FOUND);
    }

    const deletedFile: any = await deleteFileImagekit(checkExisted.fileId);

    if (!deletedFile) {
      throw new AppError("Failed to delete media.", HttpStatus.BAD_REQUEST);
    }

    const deletedMedia = await mediaRepo.deleteById(checkExisted._id);

    if (!deletedMedia) {
      throw new AppError("Failed to delete media.", HttpStatus.BAD_REQUEST);
    }

    return deletedMedia;
  } catch (error: any) {
    logger.error(error.message, error);

    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(error.message, HttpStatus.BAD_REQUEST);
  }
}

export async function allMediaService(
  categoryId: string,
  sort: Object | string,
  page: number,
  limit: number,
  shopId: string,
) {
  try {
    const folderDetails: any = await categoryRepo.findById(categoryId);

    if (!folderDetails?._id) {
      throw new AppError("Faild the get folder.", HttpStatus.BAD_REQUEST);
    }

    const customLabels = {
      totalDocs: "totalMedia",
      docs: "media",
    };

    const pipeline: any = [
      {
        $match: {
          shopId: new mongoose.Types.ObjectId(shopId),
          categoryId: new mongoose.Types.ObjectId(categoryId),
        },
      },
    ];

    const allMedia: any = await mediaRepo.findAll(
      pipeline,
      sort,
      page,
      limit,
      customLabels,
    );

    return allMedia;
  } catch (error: any) {
    logger.error(error.message, error);

    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(error.message, HttpStatus.BAD_REQUEST);
  }
}
