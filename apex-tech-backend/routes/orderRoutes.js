import express from 'express';
import { createOrder, getOrderById, getMyOrders } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect); // every order route requires a logged-in user

router.post('/', createOrder);
router.get('/mine', getMyOrders);
router.get('/:id', getOrderById);

export default router;
