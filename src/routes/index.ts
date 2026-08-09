import { Router } from "express";
import authRouter from "./Auth.route";
import rateRouter from "./Rate.route";
import mediaRouter from "./Media.route";
import categoryRouter from "./Category.route";
import shopRouter from "./Shop.route";
import savedRouter from "./Saved.route";

const router = Router();

router.use("/auth", authRouter);
router.use("/rate", rateRouter);
router.use("/media", mediaRouter);
router.use("/category", categoryRouter);
router.use("/shop", shopRouter);
router.use("/saved", savedRouter);

export default router;
