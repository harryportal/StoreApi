import { ApiError, BadRequestError } from '../middleware/error';
import axios, { AxiosRequestConfig } from 'axios';
import { FlutterwaveVerificationResponse, OrderEntity, User } from '../utils/interface';

class FlutterWaveResponse {
  constructor(public status: string, public message: string, public checkoutLink: string) {}
}

export class FlutterWaveService {
  static initialisePayment = async (
    order: OrderEntity,
    user: User,
    redirectUrl: string,
  ): Promise<FlutterWaveResponse> => {
    const config = {
      headers: {
        Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
        'Content-Type': 'application/json',
        'cache-control': 'no-cache',
      },
    } as AxiosRequestConfig;
    const data = this.generateBody(order, user, redirectUrl);
    try {
      const response = await axios.post('http://api.flutterwave.com/v3/payments', data, config);
      const responseBody = response.data;
      if (responseBody.status != 'success') {
        throw new BadRequestError('Payment Failed');
      }
      const checkOut = new FlutterWaveResponse(responseBody.status, responseBody.message, responseBody.data.link);
      return checkOut;
    } catch (error: any) {
      throw new ApiError('Error from FlutterWave' + error.data.response.message, 500);
    }
  };

  static verifyPayment = async (transactionId: string): Promise<FlutterwaveVerificationResponse> => {
    const config = {
      headers: {
        Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    } as AxiosRequestConfig;

    const response = await axios.get(`https://api.flutterwave.com/v3/transactions/${transactionId}/verify`, config);
    const responseBody = response.data as FlutterwaveVerificationResponse;

    return responseBody;
  };

  static generateBody = (order: OrderEntity, user: User, redirectUrl: string) => {
    const body = {
      public_key: process.env.FLUTTERWAVE_PUBLIC_KEY,
      tx_ref: order.id,
      amount: order.totalPrice,
      currency: 'NGN',
      redirect_url: redirectUrl,
      payment_options: 'card',
      customer: {
        email: user.email,
        phone_number: user.phone,
        name: user.username,
      },
    };
    return body;
  };
}
