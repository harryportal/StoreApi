import { Router } from "express";
import CategoriesController from "../controllers/Categories";

const categoriesRouter = Router();

categoriesRouter.get('/', CategoriesController.getCategories)
categoriesRouter.get('/:id', CategoriesController.getProductsByCategory)

export default categoriesRouter