import express, { Application, Response } from "express";
import cors from "cors";
import config from "./utils/config";
import helmet from "helmet";
import routes from "./routes/index";
import ApiResponse from "./utils/ApiResponse";
import Messages from "./constants/messages";
import { globalLimiter } from "./middleware/RateLimiter";
import { globalErrorHandler } from "./middleware/errorHandler";

const app: Application = express();

// ---------- Helmet Middleware ----------
app.use(helmet());

// ---------- Cors Middleware ----------
app.use(
  cors({
    origin: config.cors.origin,
    credentials: config.cors.credentials,
  }),
);

// ---------- Body Parser Middlewaare ----------
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ---------- Rate Limiter Middleware ---------
app.use(globalLimiter);

// ---------- Routes ----------
app.use(`${config.api.prefix}/${config.api.version}`, routes);

// ---------- Health Route ----------
app.get("/health", (_, res: Response) => {
  ApiResponse.success(
    res,
    {},
    "Server up and running.",
  );
});

// ---------- 404 Not Found Handler ---------
app.use((_, res: Response) => {
  ApiResponse.notFound(res, Messages.ERROR.NOT_FOUND);
});

// ---------- Error Handling ---------
app.use(globalErrorHandler);

export default app;
