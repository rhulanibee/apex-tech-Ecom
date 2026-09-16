import asyncHandler from 'express-async-handler';
import WishlistRepository from '../repositories/wishlistRepository.js';
import formatResponse from '../utils/responseFormatter.js';

export const getWishlist = asyncHandler(async (req, res) => {
  const wishlist = await WishlistRepository.findOrCreateForUser(req.user.id);
  res.json(formatResponse(true, wishlist, 'Wishlist retrieved'));
});

export const addWishlistItem = asyncHandler(async (req, res) => {
  const { productId } = req.body;
  if (!productId) {
    return res.status(400).json(formatResponse(false, null, 'productId is required'));
  }
  const wishlist = await WishlistRepository.findOrCreateForUser(req.user.id);
  await WishlistRepository.addItem(wishlist.id, productId);
  const updated = await WishlistRepository.findByUser(req.user.id);
  res.status(201).json(formatResponse(true, updated, 'Item added to wishlist'));
});

export const removeWishlistItem = asyncHandler(async (req, res) => {
  const wishlist = await WishlistRepository.findOrCreateForUser(req.user.id);
  await WishlistRepository.removeItem(wishlist.id, req.params.productId);
  const updated = await WishlistRepository.findByUser(req.user.id);
  res.json(formatResponse(true, updated, 'Item removed from wishlist'));
});
