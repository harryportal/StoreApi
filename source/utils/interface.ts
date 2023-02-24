import { Decimal } from '@prisma/client/runtime';
import { Request } from 'express';

export interface AuthRequest extends Request {
  user?: any;
}

export interface OrderDetails {
  productId: string;
  quantity: number;
  price?: number;
}
export interface OrderEntity {
  id: string;
  totalPrice: Decimal;
}

export interface User {
  email: string;
  phone: string;
  username: string;
}

export interface FlutterwaveTransferResponse {
  status: string;
  message: string;
  checkoutLink: string;
}

export interface FlutterwaveVerificationResponse {
  flw_ref: string;
  status: string;
  created_at: Date;
}

export interface FlutterwaveWebhookData {
  status: string;
  tx_ref: string;
  transaction_id: string;
}

export interface GoogleUserResult{
  id: string,
  email: string,
  verified_email: string,
  name: string,
  given_name: string,
  family_name: string,
  locale: string
}

export interface GoogleOauthToken {
  access_token: string;
  id_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
  scope: string;
}