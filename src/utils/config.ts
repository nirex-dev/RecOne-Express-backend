import dotenv from "dotenv";

dotenv.config();

const config = {
  // server
  node_env: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT || "5000"),

  // Mongodb
  mongodb: {
    uri: process.env.MONGO_URI || "mongodb://localhost:27017/",
    dbName: process.env.MONGO_DB_NAME || "RecOne",
  },

  // Jsonwebtoken
  jwt: {
    secret: process.env.JWT_SECRET || "thisismysecret",
    tempSecret: process.env.JWT_TEMP_SECRET || "thisismytempsecret",
  },

  // Rate Limit
  ratelimit: {
    windowMs: parseInt(process.env.RATELIMIT_WINDOW_MS || "90000"),
    maxRequests: parseInt(process.env.RATELIMIT_MAX_REQUESTS || "100"),
  },

  // CORS
  cors: {
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  },

  // api
  api: {
    prefix: "/api",
    version: "v1",
  },

  // imagekit
  imagekit: {
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY || "",
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
    urlEndPoint: process.env.IMAGEKIT_URL_END_POINT || "",
  },
};

export default config;
