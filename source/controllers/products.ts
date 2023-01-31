import {Response, Request} from 'express'
import prisma from '../utils/db';
import { current_page } from '../utils/page';
import {AuthRequest} from '../utils/interface';


export class Product {
// returns all products ordered by their date of creation and implement pagination
static getProducts = async(req: Request, res: Response)=>{
    //const [take, skip] = current_page(req)
    const products = prisma.product.findMany();

    res.json({success: true, data: products})
}

// get a single product     --> returns the first few ratings
static getProduct =  async(req: Request, res: Response)=>{
    const id = req.params.id
 
    const product = await prisma.product.findUnique({ 
        where: { id },
        include: { reviews: true } })  // see how i can return only the first 5 ratings 

    res.json({success:true, data:product})
}

// get products for a particular category order them by thier date of creation and add pagination also
static getProductsByCategory =  async(req: Request, res: Response)=>{
    const categoryId = req.params.id
    const [take, skip] = current_page(req)

    const products = prisma.product.findMany({
         where:{ categoryId }, skip, take,
         })

    res.json({success:true, data:products})
}

static getCategories =async(req: Request, res: Response) => {
    const categories = await prisma.category.findMany();
    res.json({success:true, data:categories})
    
}

// add ratings for a particular product
static addReview  = async(req: AuthRequest, res: Response)=>{
    const {rating, content } = req.body
    const id = req.user.id

    const productRating = prisma.review.create({
        data:{ rating, content, user: { connect: { id } }, 
            product: {  connect: {id: req.params.id } }} 
    })

    res.json({success:true, data: productRating})
}}