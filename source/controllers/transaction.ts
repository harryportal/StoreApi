import { Response, Request } from 'express';
import {prisma} from '../utils/db';
import { AuthRequest, FlutterwaveWebhookData, OrderDetails } from '../utils/interface';
import { FlutterWaveService } from '../service/flutterwave';
import { BadRequestError, NotFoundError } from '../middleware/error';

class OrderController {
  static createOrder = async (req: AuthRequest, res: Response) => {
    const ordertails: OrderDetails[] = req.body;
    const id = req.user.id;

    // create an order Entity for all the orders made
    const orderEntity = await prisma.order.create({
      data: {
        user: { connect: { id } },
      },
    });

    let totalPrice: number = 0;
    // get the price of each product and compute the total price as that is been done
    for (let order of ordertails) {
      const product = await prisma.product.findUnique({
        where: { id: order.productId },
      });

      if (!product) { throw new NotFoundError("No Product with given Id") }

      order.price = parseFloat(product!.price.toFixed());
      totalPrice += order.price * order.quantity;
    }

    for (let order of ordertails) {
      await prisma.orderDetails.create({
        data: {
          product: { connect: { id: order.productId } },
          order: { connect: { id: orderEntity.id } },
          price: order.price!,
          quantity: order.quantity,
        },
      });
    }
    // update the order with the total price that will be sent to flutterwave
    await prisma.order.update({
      where: { id: orderEntity.id },
      data: { totalPrice },
    });
    // FlutterWave Logic
    const user = {
      username: req.user.username,
      email: req.user.email,
      phone: req.user.phone,
    };
    const Order = { id: orderEntity.id, totalPrice: orderEntity.totalPrice };
    const response = await FlutterWaveService.initialisePayment(Order, user, 'Redirect');
    res.json({ link: response.checkoutLink, success: true });
  };

  static flutterwaveWebhook = async (req: Request, res: Response) => {
    const data = req.query as unknown as FlutterwaveWebhookData;
    if (data.status != 'successful') {
      // update the order status
      await prisma.order.update({
        where: { id: data.tx_ref },
        data: { status: 'FAILED' },
      });
      res.json({ message: 'Order Failed', success: false }); // confirm the status code i'm to send here
    } else {
      // now the payment is successful, let's verify the transaction id
      let verifiedData = await FlutterWaveService.verifyPayment(data.transaction_id);
      let { status, flw_ref, created_at } = verifiedData;
      if (status == 'successful') {
        await prisma.order.update({
          where: { id: data.tx_ref },
          data: {
            paymentReference: flw_ref,
            paidAt: created_at,
            status: 'SUCCESS',
          },
        });
        res.json({ message: 'Payment Succesful', success: true });
      } else {
        throw new BadRequestError('Invalid Transaction Id');
      }
    }
  };
}

export default OrderController;
