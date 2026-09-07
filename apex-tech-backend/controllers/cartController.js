import asyncHandler from 'express-async-handler';
import CartRepository from '../repositories/cartRepository.js';
import formatResponse from '../utils/responseFormatter.js';

export const getCart = asyncHandler(async (req, res) => {
  const cart = await CartRepository.findOrCreateForUser(req.user.id);
  res.json(formatResponse(true, cart, 'Cart retrieved'));
});

export const addItem = asyncHandler(async (req, res) => {
  const { productId, quantity, priceAtAdd } = req.body;
  if (!productId || !quantity || priceAtAdd === undefined) {
    return res.status(400).json(formatResponse(false, null, 'productId, quantity and priceAtAdd are required'));
  }

  const cart = await CartRepository.findOrCreateForUser(req.user.id);
  await CartRepository.addItem(cart.id, { productId, quantity, priceAtAdd });
  const updatedCart = await CartRepository.findByUser(req.user.id);

  res.status(201).json(formatResponse(true, updatedCart, 'Item added to cart'));
});

export const removeItem = asyncHandler(async (req, res) => {
  await CartRepository.removeItem(req.params.cartId, req.params.productId);
  const updatedCart = await CartRepository.findByUser(req.user.id);
  res.json(formatResponse(true, updatedCart, 'Item removed from cart'));
});
