import HttpStatus from "../constants/httpStatus";
import ShopRepository from "../repositories/Shop.repository";
import AppError from "../utils/AppError";
import {
  createFoldeImagekit,
  deleteFolderImagekit,
} from "../utils/ImagekitApi";
import logger from "../utils/logger";

const shopRepo = new ShopRepository();

export async function createShopService(data: {
  name: string;
  address: string;
}) {
  try {
    const existedShop: any = await shopRepo.findOne({ name: data.name });

    if (existedShop?._id) {
      throw new AppError("Shop Already Existed.", HttpStatus.BAD_REQUEST);
    }

    const createdShop: any = await createFoldeImagekit(data.name);

    if (!createdShop) {
      throw new AppError("Faild to create shop.", HttpStatus.BAD_REQUEST);
    }

    const newShop: any = await shopRepo.create({
      name: data.name,
      address: data.address,
      folderPath: createdShop?.path,
    });

    if (!newShop?._id) {
      throw new AppError("Faild to create shop", HttpStatus.BAD_REQUEST);
    }

    return newShop;
  } catch (error) {
    logger.error("Faild to create shop.", error);

    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError("Faild to create shop.", HttpStatus.BAD_REQUEST);
  }
}

export async function getAllShopsService() {
  try {
    const shops = await shopRepo.find();

    // if(!shops || shops.length === 0){
    //   return []
    // }

    return shops;
  } catch (error) {
    logger.error("Faild to get shops.", error);

    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError("Faild to get shops.", HttpStatus.BAD_REQUEST);
  }
}

export async function deleteShopService(shopId: string) {
  try {
    const existedShop: any = await shopRepo.findById(shopId);

    if (!existedShop?._id) {
      throw new AppError("Could not found shop!", HttpStatus.BAD_REQUEST);
    }

    const deletedFolder: any = await deleteFolderImagekit(
      existedShop.folderPath,
    );

    if (!deletedFolder) {
      throw new AppError("Faild to delete shop.", HttpStatus.BAD_REQUEST);
    }

    const deletedShop = await shopRepo.deleteById(existedShop?._id);

    return deletedShop;
  } catch (error) {
    logger.error("Failed to delete shop.", error);

    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError("Faild to delete shop.", HttpStatus.BAD_REQUEST);
  }
}
