import RequestValidator from "../middleware/validation";
import { protect } from "../middleware/auth";
import { Router } from "express";
import  AuthController from "../controllers/Auth";

const router = Router();

router.post('/signup', AuthController.signUp)

export default router