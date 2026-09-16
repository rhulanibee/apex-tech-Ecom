import express from 'express';
import { getWishlist, addWishlistItem, removeWishlistItem } from '../controllers/wishlistController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.get('/', getWishlist);
router.post('/items', addWishlistItem);
router.delete('/items/:productId', removeWishlistItem);

export default router;
