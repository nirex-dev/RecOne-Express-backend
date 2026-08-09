import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken";
import { isAdmin } from "../middleware/isAdmin";
import { upload } from "../middleware/multerMiddleware";
import {
  allMediaController,
  deleteMediaController,
  uploadMediaController,
} from "../controllers/Media.controller";

const router = Router();

router
  .route("/upload/:categoryId")
  .post(verifyToken, isAdmin, upload.single("file"), uploadMediaController);

router
  .route("/:deleteId")
  .delete(verifyToken, isAdmin, deleteMediaController);

router.route("/:categoryId").get(verifyToken, allMediaController);

export default router;
