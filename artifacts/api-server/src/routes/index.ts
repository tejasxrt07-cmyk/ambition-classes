import { Router, type IRouter } from "express";
import healthRouter from "./health";
import notesRouter from "./notes";
import adminRouter from "./admin";
import storageRouter from "./storage";

const router: IRouter = Router();

router.use(healthRouter);
router.use(notesRouter);
router.use(adminRouter);
router.use(storageRouter);

export default router;
