import mongoose from "mongoose";
import config from "./config";
import logger from "./logger";

let isConnected = false;

export default async function connectMongodb() {
  if (isConnected) {
    return;
  }
  try {
    const options = {
      dbName: config.mongodb.dbName,
    };

    await mongoose.connect(config.mongodb.uri, options);
    // await mongoose.connect(config.mongodb.uri, {
    //   dbName: config.mongodb.dbName,
    //   maxPoolSize: 10,
    //   minPoolSize: 1,
    // });

    isConnected = true;

    logger.info(`MongoDB Connected : ${mongoose.connection.host}`);

    mongoose.connection.on("error", (err) => {
      logger.error(err);
    });

    mongoose.connection.on("disconnected", () => {
      isConnected = false;
      logger.warn("MongoDB Disconnected");
    });
  } catch (err) {
    logger.error(err);
    throw err;
  }
}

// import mongoose from "mongoose";
// import config from "./config";

// let cachedConnection = global.AbortController as any;

// if (!cachedConnection) {
//   cachedConnection = { conn: null, promise: null };
//   global.AbortController = cachedConnection;
// }

// export async function connectMongodb() {
//   if (cachedConnection.conn) {
//     return cachedConnection.conn;
//   }

//   if (!cachedConnection.promise) {
//     const options = {
//       dbName: config.mongodb.dbName,
//       maxPoolSize: 10,
//       minPoolSize: 1,
//     };
//     cachedConnection.promise = mongoose
//       .connect(config.mongodb.uri, options)
//       .then((mongoose) => {
//         return mongoose;
//       });
//   }

//   try {
//     cachedConnection.conn = await cachedConnection.promise;
//   } catch (err) {
//     cachedConnection.promise = null;
//     throw err;
//   }
//   return cachedConnection.conn;
// }
