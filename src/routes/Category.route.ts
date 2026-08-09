import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken";
import {
  allCategoryController,
  createCategoryController,
  deleteCategoryController,
} from "../controllers/Category.controller";
import { createCategoryValidator } from "../utils/validators/Category.validator";
import validateRequest from "../utils/validators";
import { isAdmin } from "../middleware/isAdmin";

const router = Router();

router
  .route("/")
  .post(
    verifyToken,
    isAdmin,
    createCategoryValidator,
    validateRequest,
    createCategoryController,
  );

router
  .route("/:categoryId")
  .delete(verifyToken, isAdmin, deleteCategoryController);

router.route("/").get(verifyToken, allCategoryController);

export default router;
