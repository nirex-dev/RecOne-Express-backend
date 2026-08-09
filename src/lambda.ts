import serverlessExpress from "@codegenie/serverless-express";

import app from "./app";
import connectMongodb from "./utils/mongodb";
import logger from "./utils/logger";

let server: ReturnType<typeof serverlessExpress>;

async function bootstrap() {
  if (!server) {
    logger.info("Initializing Lambda...");

    await connectMongodb();

    // Safe only if idempotent
    // await seedShops();

    server = serverlessExpress({
      app,
    });

    logger.info("Lambda initialized");
  }

  return server;
}

export const handler = async (event: any, context: any) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const server = await bootstrap();

  return server(event, context);
};
