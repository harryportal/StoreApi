import { Response, Request, Router } from 'express';
import { Product } from '../controllers/products';
import { protect } from '../middleware/auth';

const productRouter = Router();

productRouter.get('/', Product.getProducts);
//productRouter.get('/categories', Product.getCategories); 
productRouter.get('/:id', Product.getProduct);
productRouter.get('/categories/:id', Product.getProductsByCategory);
productRouter.post('/:id/ratings', protect, Product.addReview);

export default productRouter;
