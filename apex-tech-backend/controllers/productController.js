import asyncHandler from 'express-async-handler';
import ProductRepository from '../repositories/productRepository.js';
import formatResponse from '../utils/responseFormatter.js';

export const getProducts = asyncHandler(async (req, res) => {
  const { category, isFlashDeal } = req.query;
  const filter = {};
  if (category && category !== 'all') filter.category = category;
  if (isFlashDeal !== undefined) filter.isFlashDeal = isFlashDeal === 'true';

  const products = await ProductRepository.findAll(filter);
  res.json(formatResponse(true, products, 'Products retrieved'));
});

export const getProductById = asyncHandler(async (req, res) => {
  const product = await ProductRepository.findById(req.params.id);
  if (!product) {
    return res.status(404).json(formatResponse(false, null, `Product ${req.params.id} not found`));
  }
  res.json(formatResponse(true, product, 'Product retrieved'));
});

export const createProduct = asyncHandler(async (req, res) => {
  const product = await ProductRepository.create(req.body);
  res.status(201).json(formatResponse(true, product, 'Product created successfully'));
});
