import config from "./config";

class AppError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);

    this.statusCode = statusCode;

    if (config.node_env !== "production") {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default AppError;
