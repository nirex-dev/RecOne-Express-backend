import { Router } from "express";
import validateRequest from "../utils/validators";
import {
  signUpValidator,
  signInValidator,
  userValidator,
  otpValidator,
  resetPasswordValidator,
} from "../utils/validators/Auth.Validator";
import {
  signUpController,
  signInController,
  findUserController,
  verifyOTPController,
  resetPasswordController,
  logOutController,
} from "../controllers/Auth.controller";
import { authLimiter, passwordLimiter } from "../middleware/RateLimiter";
import { verifyToken } from "../middleware/verifyToken";

const router = Router();

router
  .route("/sign-up")
  .post(authLimiter, signUpValidator, validateRequest, signUpController);

router
  .route("/sign-in")
  .post(authLimiter, signInValidator, validateRequest, signInController);

router
  .route("/find-user")
  .post(passwordLimiter, userValidator, validateRequest, findUserController);

router
  .route("/verify-otp")
  .post(passwordLimiter, otpValidator, validateRequest, verifyOTPController);

router
  .route("/reset-password")
  .post(
    passwordLimiter,
    resetPasswordValidator,
    validateRequest,
    resetPasswordController,
  );

router.route("/logout").post(verifyToken, logOutController);

export default router;
