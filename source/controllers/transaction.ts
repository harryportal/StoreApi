import {Response} from 'express'
import prisma from '../utils/db';
import AuthRequest from '../utils/user';
import generateUniqueDigits from '../utils/random';

interface OrderDetails {
    productId : string
    quantity: number
    price?: number
}

class OrderController{
    static createOrder = async(req: AuthRequest, res: Response)=>{
        const ordertails: OrderDetails[] = req.body
        const id = req.user.id
        const reference = generateUniqueDigits()

        // create an order Entity for all the orders made
        const orderEntity = await prisma.order.create({
            data:{
                user: { connect: { id }}, reference
            } }) 
        
        let totalPrice: number = 0
        // get the price of each product and compute the total price as that is been done
        for(let order of ordertails){
            const product = await prisma.product.findUniqueOrThrow({
                where: { id : order.productId}
            })
            order.price = parseFloat(product!.price.toFixed())
            totalPrice += order.price
        }

        for(let order of ordertails){
            prisma.orderDetails.create({
                data:{ 
                    product: {connect: {id: order.productId}},
                    order: {connect: {id: orderEntity.id}},
                    price: order.price! * order.quantity,
                    quantity: order.quantity
                }
           })
        }
        // update the order with the total price that will be sent to flutterwave
        await prisma.order.update({
            where: {id: orderEntity.id},
            data:{ totalPrice }
        })
        // flutterwave logic takes over from here
        
        
        
    }}

    export default OrderController