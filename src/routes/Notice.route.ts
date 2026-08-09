import { Router } from "express";

const router = Router();

router.route("/").get();

router.route("/").post();

router.route("/:noticeId").delete();

router.route("/:noticeId").patch();

export default router;
