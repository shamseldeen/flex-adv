import { Router, type IRouter } from "express";
import healthRouter from "./health";
import servicesRouter from "./services";
import portfolioRouter from "./portfolio";
import contactRouter from "./contact";
import statsRouter from "./stats";
import clientsRouter from "./clients";
import galleryRouter from "./gallery";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/services", servicesRouter);
router.use("/portfolio", portfolioRouter);
router.use("/contact", contactRouter);
router.use("/stats", statsRouter);
router.use("/clients", clientsRouter);
router.use("/gallery", galleryRouter);

export default router;
