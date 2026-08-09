import ImageKit from "@imagekit/nodejs";
import config from "./config";
import logger from "./logger";
import AppError from "./AppError";
import HttpStatus from "../constants/httpStatus";

const client = new ImageKit({
  privateKey: config.imagekit.privateKey,
});

// Create folder in image kit
export const createFoldeImagekit = async (
  folderName: string,
  parentFoldePath: string = "/",
) => {
  try {
    if (!folderName) {
      throw new AppError("Folder name is required.", HttpStatus.BAD_REQUEST);
    }

    if (!parentFoldePath) {
      throw new AppError(
        "Parent folder path is required",
        HttpStatus.BAD_REQUEST,
      );
    }

    const newFolderName = folderName.replace(" ", "_");

    const response = await client.folders.create({
      folderName: newFolderName,
      parentFolderPath: parentFoldePath,
    });

    return { success: true, path: `${parentFoldePath}${newFolderName}/` };
  } catch (error: any) {
    logger.error(error.message, error);

    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(
      error.message || "Drive createFolder failed.",
      error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
};

// Delete folder in imagekit
export const deleteFolderImagekit = async (folderPath: string) => {
  try {
    if (!folderPath) {
      throw new AppError("Folder path is required.", HttpStatus.BAD_REQUEST);
    }

    const response = await client.folders.delete({
      folderPath: folderPath,
    });

    return true;
  } catch (error: any) {
    logger.error(error.message, error);

    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(
      error.message || "Delete folder failed.",
      error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
};

// Upload File in imagekit
export const uploadFileImagekit = async (
  fileBuffer: any,
  categoryName: string,
  folderPath: string,
) => {
  try {
    if (!fileBuffer) {
      throw new AppError("File is required.", HttpStatus.BAD_REQUEST);
    }

    if (!categoryName) {
      throw new AppError("Category name is required.", HttpStatus.BAD_REQUEST);
    }

    if (!folderPath) {
      throw new AppError("Folder path is required.", HttpStatus.BAD_REQUEST);
    }

    // convert buffer to base64
    const base64File = fileBuffer.toString("base64");

    const response = await client.files.upload({
      file: base64File,
      fileName: `${categoryName}_${Date.now()}.webp`,
      folder: folderPath,
    });

    return response;
  } catch (error: any) {
    logger.error(error.message, error);

    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(
      error.message || "Delete folder failed.",
      error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
};

// Delete file in imagekit
export const deleteFileImagekit = async (fileId: string) => {
  try {
    if (!fileId) {
      throw new AppError("File id is required.", HttpStatus.BAD_REQUEST);
    }

    const response = await client.files.delete(fileId);

    return true;
  } catch (error: any) {
    logger.error(error.message, error);

    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(
      error.message || "Delete file failed.",
      error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
};
