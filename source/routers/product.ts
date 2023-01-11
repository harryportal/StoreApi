import {Response, Request, Router} from 'express'
import { Product } from '../controllers/products';
import { protect } from '../middleware/auth';


const productRouter = Router();


// returns all products ordered by their date of creation and implement pagination
productRouter.get('/', Product.getProducts)

// get a single product    
productRouter.get('/:id', async(req: Request, res: Response)=>{

})

// get products for a particular category order them by thier date of creation and add pagination also
productRouter.get('/categories/:id', async(req: Request, res: Response)=>{

})

// add rating to a particular product
productRouter.post('/:id/ratings', protect, async(req: Request, res: Response)=>{

})

// get ratings for a particular product
productRouter.get('/:id/ratings', async(req: Request, res: Response)=>{

})

export default productRouter

