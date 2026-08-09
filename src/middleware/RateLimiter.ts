import rateLimit from "express-rate-limit";
import { Response, Request } from "express";
import HttpStatus from "../constants/httpStatus";
import Messages from "../constants/messages";

// Global rate limiter - applies to all routes
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 request per windowMs
  message: {
    error: "Too many request form IP, please try again after 15 minutes",
  },
  standardHeaders: true, // Retrun rate limit info in the "RateLimit-*" headers
  legacyHeaders: false, // Disable the "X-Ratelimit-*" headers
  handler: (req: Request, res: Response) => {
    const retryAfter = (req as any).rateLimit?.resetTime;

    res.status(HttpStatus.TOO_MANY_REQUESTS).json({
      error: "Too many requests",
      message: Messages.ERROR.TO_MANY_REQUEST,
      retryAfter,
    });
  },
});

// Stricter rate limiter for authentication endpoints
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  skipSuccessfulRequests: false, // Count successful requests
  message: {
    error:
      "Too many authentication attempts from this IP, please try again after 15 minutes",
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    const retryAfter = (req as any).rateLimit?.resetTime;
    res.status(HttpStatus.TOO_MANY_REQUESTS).json({
      error: "Too many authentication attempts",
      message:
        "You have exceeded the maximum number of login/register attempts. Please try again later.",
      retryAfter,
    });
  },
});

// Very strict rate limiter for password-related operations
export const passwordLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // Limit each IP to 3 requests per hour
  skipSuccessfulRequests: true, // Don't count successful requests
  message: {
    error:
      "Too many password attempts from this IP, please try again after 1 hour",
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    const retryAfter = (req as any).rateLimit?.resetTime;
    res.status(HttpStatus.TOO_MANY_REQUESTS).json({
      error: "Too many password attempts",
      message:
        "You have exceeded the maximum number of password attempts. Please try again in 1 hour.",
      retryAfter,
    });
  },
});
