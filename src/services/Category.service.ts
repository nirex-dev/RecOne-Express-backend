import HttpStatus from "../constants/httpStatus";
import CategoryRepository from "../repositories/Category.repository";
import ShopRepository from "../repositories/Shop.repository";
import AppError from "../utils/AppError";
import {
  createFoldeImagekit,
  deleteFolderImagekit,
} from "../utils/ImagekitApi";
` `;
import logger from "../utils/logger";

const categoryRepo = new CategoryRepository();
const shopRepo = new ShopRepository();

export async function createCateroyService(
  name: string,
  shopId: string,
  thumbnail: File | string,
) {
  try {
    const shop: any = await shopRepo.findById(shopId);

    if (!shop?._id) {
      throw new AppError("Faild to create folder.", HttpStatus.BAD_REQUEST);
    }

    const existedFolder: any = await categoryRepo.findOne({ name: name });

    if (existedFolder?._id) {
      throw new AppError("Folder all ready exist.", HttpStatus.CONFLICT);
    }

    const createdFolder: any = await createFoldeImagekit(name, shop.folderPath);

    if (!createdFolder) {
      throw new AppError("Faild to create folder.", HttpStatus.BAD_REQUEST);
    }

    const newFolder: any = await categoryRepo.create({
      shopId: shopId,
      name: name,
      folderPath: createdFolder?.path,
      thumbnail: thumbnail,
    });

    if (!newFolder?._id) {
      throw new AppError("Faild to create folder.", HttpStatus.BAD_REQUEST);
    }

    return newFolder;
  } catch (error: any) {
    logger.error(error.message, error);

    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(error.message, HttpStatus.BAD_REQUEST);
  }
}

export async function deleteCategoryService(categoryId: string) {
  try {
    const existedFolder: any = await categoryRepo.findById(categoryId);

    if (!existedFolder?._id) {
      throw new AppError("Faild to delete folder.", HttpStatus.BAD_REQUEST);
    }

    const deletedFolder: any = await deleteFolderImagekit(
      existedFolder.folderPath,
    );

    if (!deletedFolder) {
      throw new AppError("Faild to delete folder.", HttpStatus.BAD_REQUEST);
    }

    const deletedCategory: any = await categoryRepo.deleteById(
      existedFolder?._id,
    );

    if (!deletedCategory?._id) {
      throw new AppError("Faild to delete folder.", HttpStatus.BAD_REQUEST);
    }

    return deletedCategory;
  } catch (error: any) {
    logger.error(error.message, error);

    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(error.message, HttpStatus.BAD_REQUEST);
  }
}

export async function allCaterogryService(shopId: string) {
  try {
    const allCategory: any = await categoryRepo.find({ shopId });

    // if (!allCategory || allCategory?.length === 0) {
    //   throw new AppError("No categories found.", HttpStatus.NOT_FOUND);
    // }

    return allCategory;
  } catch (error: any) {
    logger.error(error.message, error);

    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(error.message, HttpStatus.BAD_REQUEST);
  }
}
