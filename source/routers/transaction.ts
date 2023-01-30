import { Router } from "express";
import { protect } from "../middleware/auth";
import OrderController from "../controllers/transaction";


const transactionRouter = Router();

transactionRouter.post('/create-order', protect, OrderController.createOrder)
transactionRouter.post('/verify-payment', OrderController.flutterwaveWebhook)

export default transactionRouter
