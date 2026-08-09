import winston from "winston";
import config from "./config";

const transports: winston.transport[] = [];

// Console transport (CloudWatch on Lambda)
transports.push(
  new winston.transports.Console({
    format:
      config.node_env === "production"
        ? winston.format.json()
        : winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp({
              format: "YYYY-MM-DD HH:mm:ss",
            }),
            winston.format.printf(
              ({ timestamp, level, message, stack }) =>
                `${timestamp} ${level}: ${stack || message}`,
            ),
          ),
  }),
);

// File logs only for local development
if (process.env.AWS_EXECUTION_ENV === undefined) {
  transports.push(
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
    }),
  );

  transports.push(
    new winston.transports.File({
      filename: "logs/combined.log",
    }),
  );
}

const logger = winston.createLogger({
  level: config.node_env === "production" ? "info" : "debug",

  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.errors({
      stack: true,
    }),
    winston.format.splat(),
    winston.format.json(),
  ),

  defaultMeta: {
    service: "RecOne",
  },

  transports,
});

export default logger;