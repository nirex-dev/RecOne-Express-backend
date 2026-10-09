import mongoose from "mongoose";
import config from "./config";
import logger from "./logger";

export default async function connectMongodb() {
  // 1 = connected, 2 = connecting
  if (mongoose.connection.readyState === 1 || mongoose.connection.readyState === 2) {
    return;
  }

  try {
    await mongoose.connect(config.mongodb.uri, {
      dbName: config.mongodb.dbName,
      serverSelectionTimeoutMS: 10000,
    });

    logger.info(`MongoDB Connected: ${mongoose.connection.host}`);

    mongoose.connection.on("error", (err) => {
      logger.error("MongoDB error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      logger.warn("MongoDB Disconnected");
    });
  } catch (err) {
    logger.error("MongoDB Connection Failed:", err);
    throw err;
  }
}

