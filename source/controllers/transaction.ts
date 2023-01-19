import { Order } from '@prisma/client';
import {Response, Request} from 'express'
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

        const orderEntity = await prisma.order.create({
            data:{
                user: { connect: { id }},
                reference: generateUniqueDigits()
            } }) 
        

        let totalPrice: number = 0
        for(let order of ordertails){
            const product = await prisma.product.findUnique({
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

        await prisma.order.update({
            where: {id: orderEntity.id},
            data:{ totalPrice }
        })
        
        
        
    }}