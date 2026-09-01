import { Router } from 'express';

export const createProductRouter = (productController) => {
  const router = Router();

  router.get('/', productController.getAllProducts);
  router.get('/:id', productController.getProductById);
  router.post('/', productController.createProduct);

  return router;
};