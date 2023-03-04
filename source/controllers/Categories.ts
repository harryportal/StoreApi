import { Response, Request } from 'express';
import {prisma} from '../utils/db';


export default class CategoriesController{
    // return all categories
    static getCategories = async (req: Request, res: Response) => {
        
        const categories = await prisma.category.findMany({});
        res.json({ success: true, data: categories });
    
      };

    
    // get products for a particular category order them by thier date of creation and add pagination also
    static getProductsByCategory = async (req: Request, res: Response) => {
        const categoryId = req.params.id;
       // const [take, skip] = current_page(req);
        const categories = await prisma.category.findUnique({
            where:{
                id: categoryId
            }, include:{
                products: true
            }
        })
        res.json({ success: true, data: categories });
    };
}