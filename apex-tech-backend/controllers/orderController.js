import asyncHandler from 'express-async-handler';
import OrderRepository from '../repositories/orderRepository.js';
import CartRepository from '../repositories/cartRepository.js';
import formatResponse from '../utils/responseFormatter.js';

export const createOrder = asyncHandler(async (req, res) => {
  const { items, subtotal, tax, shippingFee, total } = req.body;
  if (!items || !items.length) {
    return res.status(400).json(formatResponse(false, null, 'Order must contain at least one item'));
  }

  const orderData = { userId: req.user.id, subtotal, tax, shippingFee, total };
  const order = await OrderRepository.create(orderData, items);

  // Clear the user's cart after a successful order
  const cart = await CartRepository.findByUser(req.user.id);
  if (cart) await CartRepository.clearCart(cart.id);

  res.status(201).json(formatResponse(true, order, 'Order created successfully'));
});

export const getOrderById = asyncHandler(async (req, res) => {
  const order = await OrderRepository.findById(req.params.id);
  if (!order || order.userId !== req.user.id) {
    return res.status(404).json(formatResponse(false, null, 'Order not found or unauthorized'));
  }
  res.json(formatResponse(true, order, 'Order retrieved'));
});

export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await OrderRepository.findByUser(req.user.id);
  res.json(formatResponse(true, orders, 'Orders retrieved'));
});
