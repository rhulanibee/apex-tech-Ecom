import express from 'express';
import { getCart, addItem, removeItem } from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect); // every cart route requires a logged-in user

router.get('/', getCart);
router.post('/items', addItem);
router.delete('/:cartId/items/:productId', removeItem);

export default router;
