import app from "./app";
import config from "./utils/config";
import logger from "./utils/logger";
import connectMongodb from "./utils/mongodb";
import { seedShops } from "./utils/seed";

const startServer = async () => {
  try {
    // // connect with mongodb
    await connectMongodb();

    // // create default shops
    // await seedShops();

    app.listen(config.port, () => {
      console.log(`⚡ Server running on http://localhost:${config.port}`);
      console.log(`📡 Environment: ${config.node_env}`);
    });
  } catch (error) {
    logger.error("Failed to Start Server: ", error);
  }
};

startServer();
