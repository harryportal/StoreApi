import { ApiError, BadRequestError } from "../middleware/error";
import axios, {AxiosRequestConfig} from "axios";


interface OrderEntity{
    id: string,
    price: number
    reference: string // work on the logic for creating this later
    email: string
    phoneNumber: string
    fullname: string
}

//mediator pattern


class FlutterWaveResponse {
    status: string
    message: string
    checkoutLink: string

}


class FlutterWaveService {
    static initialisePayment = async(order: OrderEntity, redirectUrl:string)=>{
        const config = {
            headers: {
                Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
                "Content-Type":"application/json",
                "cache-control":"no-cache"
            } }  as AxiosRequestConfig
        const data = this.generateBody(order, redirectUrl)
        try {
            const response = await axios.post('http://api.flutterwave.com/v3/payments', data, config)
            const responseBody = response.data
            if (responseBody.status != "success"){
                throw new BadRequestError('Payment Failed')
            }
            // the response body contains status, message and checkout link ( as data.link)
            // map the info on the response body to the checkout Object
            const checkOut = new FlutterWaveResponse()


        }catch(error:any){
            throw new ApiError("Error from FlutterWave" + error.data.response.message, 500 )
        }




    }










    static generateBody = (order: OrderEntity, redirectUrl:string)=>{
        const body = {
            "public_key": process.env.FLUTTERWAVE_PUBLIC_KEY,
            "tx_ref":order.id,
            "amount":order.price,
            "currency":"NGN",
            "redirect_url":redirectUrl,
            "payment_options":"card",
            "meta": {
                "order_number":order.reference
            },
            "customer":{
                "email":order.email,
                "phone_number":order.phoneNumber,
                "name":order.fullname
            }
        }
        return body
    }



}

