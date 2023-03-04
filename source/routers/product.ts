import { Router } from 'express';
import { Product } from '../controllers/products';
import { protect } from '../middleware/auth';
import RequestValidator from '../middleware/validation';
import ProductRating from '../serializers/product';

const productRouter = Router();

productRouter.get('/', Product.getProducts);
productRouter.get('/:id', Product.getProduct);
productRouter.post('/:id/ratings', protect, RequestValidator.validate(ProductRating), Product.addReview);

export default productRouter;
