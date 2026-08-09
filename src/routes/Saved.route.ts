import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken";
import {
  allSavedMediaController,
  saveAndUnSavedMediaController,
} from "../controllers/Saved.controller";

const router = Router();

router.route("/").get(verifyToken, allSavedMediaController);

router.route("/:mediaId").post(verifyToken, saveAndUnSavedMediaController);

export default router;
