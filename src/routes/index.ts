import dashboardRoutes from "./dashboardRoutes";
import { Router } from "express";

const router = Router();

router.use("/dashboard", dashboardRoutes);

export default router;
