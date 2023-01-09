import RequestValidator from "../middleware/validation";
import { protect } from "../middleware/auth";
import { Router } from "express";
import  AuthController from "../controllers/Auth";

const router = Router();

router.post('/signup', AuthController.signUp)
router.post('/login', AuthController.signIn)

export default router