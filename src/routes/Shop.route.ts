import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken";
import {
  createShopController,
  deleteShopController,
  getAllShopsController,
} from "../controllers/Shop.controller";
import { createShopValidator } from "../utils/validators/Shop.Validation";
import validateRequest from "../utils/validators";

const router = Router();

router
  .route("/")
  .get(verifyToken, getAllShopsController)
  .post(
    verifyToken,
    createShopValidator,
    validateRequest,
    createShopController,
  );

router.route("/:shopId").delete(verifyToken, deleteShopController);

export default router;
