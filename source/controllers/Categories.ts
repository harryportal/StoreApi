import { Response, Request } from 'express';
import { NotFoundError } from '../middleware/error';
import {prisma} from '../utils/db';
import { current_page } from '../utils/page';


export default class CategoriesController{
    // return all categories
    static getCategories = async (req: Request, res: Response) => {

        const [take, skip] = current_page(req, "categories")   // pagination done 
        const categories = await prisma.category.findMany({ take, skip });
        res.json({ success: true, data: categories });
    
      };

    
    // get products for a particular category order them by thier date of creation and add pagination also
    static getProductsByCategory = async (req: Request, res: Response) => {
        const categoryId = req.params.id;
       
        const categories = await prisma.category.findUnique({
            where:{
                id: categoryId
            }, include:{
                products: true
            }
        })

        if(!categories) { throw new NotFoundError("No Category with given Id") }
        
        res.json({ success: true, data: categories });
    };
}