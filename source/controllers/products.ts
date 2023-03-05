import { Response, Request } from 'express';
import {prisma} from '../utils/db';
import { current_page } from '../utils/page';
import { AuthRequest } from '../utils/interface';

export class Product {
  // returns all products ordered by their date of creation -- won't work since they have the same creation date

  static getProducts = async (req: Request, res: Response) => {
    
    const [take, skip] = current_page(req, "product")   // pagination done

    const products = await prisma.product.findMany({
      skip, take
    });

    res.json({ success: true, data: products});

  };


  // get a single product     --> returns the first few ratings
  static getProduct = async (req: Request, res: Response) => {
    const id = req.params.id;

    const product = await prisma.product.findUnique({
      where: { id },
      include: { reviews: true, images:true },
    }); // see how i can return only the first 5 ratings -- not neccessary again

    if (!product) { return res.status(404).json({success:false, error:"No Product with given Id"}) }

    res.json({ success: true, data: product });
  };


  // add ratings for a particular product
  static addReview = async (req: AuthRequest, res: Response) => {
    const { rating, content } = req.body;
    const userId = req.user.id;
    const productId = req.params.id

    // check if product exist in the database
    const product = await prisma.product.findUnique({
      where:{ id: productId}
    })

    if (!product) { return res.status(404).json({success:false, error:"No Product with given Id"}) }

    // create a new review for product or update existing review if exist
    const productRating = await prisma.review.upsert({
      where:{
        userId_productId:{
          userId, productId
        }
      },
      create:{
        rating,
        content,
        user: { connect: { id:userId } },
        product: { connect: { id: productId} },
      },
      update: {
        rating,
        content
      },
      select:{
        rating: true, content: true
      }
    });

    res.json({ success: true, data: productRating });
  };
}
