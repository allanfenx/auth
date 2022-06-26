import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

const router = Router();

const controller = new AuthController();

router.post("/auth", controller.authenticade);

export default router;