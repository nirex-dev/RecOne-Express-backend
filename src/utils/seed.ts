import ShopModel from "../models/Shop.model";
import logger from "./logger";

export const seedShops = async () => {
  const count = await ShopModel.countDocuments();

  if (count === 0) {
    await ShopModel.insertMany([
      {
        name: "Maa Jewellers",
        address: "Kelwagachi",
        folderPath: "/maa_jewellers/",
      },
      {
        name: "NL Jewellers",
        address: "Harichanda",
        folderPath: "/nl_jewellers/",
      },
    ]);
  }

  logger.info("Default shop is Created!");
};
