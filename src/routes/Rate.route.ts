import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken";
import {
  deleteRateValidator,
  rateValidator,
} from "../utils/validators/Rate.Validator";
import validateRequest from "../utils/validators";
import {
  createAndUpdateRateController,
  deleteRateController,
  getTodayRateController,
  getWeeklyRateController,
} from "../controllers/Rate.controller";
import { isAdmin } from "../middleware/isAdmin";

const router = Router();

router
  .route("/")
  .get(verifyToken, getTodayRateController)
  .post(
    verifyToken,
    isAdmin,
    rateValidator,
    validateRequest,
    createAndUpdateRateController,
  );

router.route("/:deleteId").delete(verifyToken, isAdmin, deleteRateController);

router.route("/chart").get(verifyToken, getWeeklyRateController);

export default router;
