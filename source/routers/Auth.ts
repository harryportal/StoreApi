import RequestValidator from "../middleware/validation";
import { protect } from "../middleware/auth";
import { Router } from "express";
import  AuthController from "../controllers/Auth";
import { SignUp,SignIn, Profile } from "../serializers/Auth";
import 'express-async-errors'

const router = Router();

router.post('/signup',RequestValidator.validate(SignUp), AuthController.signUp)
router.post('/login', RequestValidator.validate(SignIn),  AuthController.signIn)
router.post('/addprofile', protect, RequestValidator.validate(Profile), AuthController.addProfile)
router.put('/editprofile', protect, RequestValidator.validate(Profile), AuthController.editProfile)
router.get('/getprofile',  protect, AuthController.getProfile)


export default router