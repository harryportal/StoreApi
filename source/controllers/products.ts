import { Response, Request } from 'express';
import {prisma} from '../utils/db';
import { current_page } from '../utils/page';
import { AuthRequest } from '../utils/interface';

export class Product {
  // returns all products ordered by their date of creation and implement pagination

  static getProducts = async (req: Request, res: Response) => {
    //const [take, skip] = current_page(req)
    const products = await prisma.product.findMany({
      include:{
        category: true
      }
    });
    res.json({ success: true, data: products });
  };

  // get a single product     --> returns the first few ratings
  static getProduct = async (req: Request, res: Response) => {
    const id = req.params.id;

    const product = await prisma.product.findUnique({
      where: { id },
      include: { reviews: true, images:true },
    }); // see how i can return only the first 5 ratings

    res.json({ success: true, data: product });
  };


  // add ratings for a particular product
  static addReview = async (req: AuthRequest, res: Response) => {
    const { rating, content } = req.body;
    const id = req.user.id;
    const productId = req.params.id

    // create a new review for product or update existing review if exist
    const productRating = await prisma.review.upsert({
      where:{
        userId_productId:{
          userId: id, productId
        }
      },
      create:{
        rating,
        content,
        user: { connect: { id } },
        product: { connect: { id: req.params.id } },
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
