import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getProducts, createProduct } from '../../controllers/productController.js';
import { Product, Category } from '../../models/index.js';

vi.mock('../../models/index.js');

describe('Product Controller', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getProducts', () => {
    it('should fetch all products with query parameters', async () => {
      const mockReq = {
        query: {
          category: undefined,
          isFlashDeal: undefined,
        },
      };

      const mockRes = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      };

      const mockProducts = [
        { id: 1, name: 'Laptop', price: 1200, stock: 5 },
        { id: 2, name: 'Mouse', price: 50, stock: 100 },
      ];

      Product.findAll.mockResolvedValue(mockProducts);

      await getProducts(mockReq, mockRes);

      expect(Product.findAll).toHaveBeenCalled();
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          data: mockProducts,
        })
      );
    });

    it('should filter products by category', async () => {
      const mockReq = {
        query: {
          category: 'Electronics',
          isFlashDeal: undefined,
        },
      };

      const mockRes = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      };

      const filteredProducts = [
        { id: 1, name: 'Laptop', price: 1200, category: 'Electronics' },
      ];

      Product.findAll.mockResolvedValue(filteredProducts);

      await getProducts(mockReq, mockRes);

      expect(Product.findAll).toHaveBeenCalled();
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          data: filteredProducts,
        })
      );
    });

    it('should handle empty product list', async () => {
      const mockReq = {
        query: {},
      };

      const mockRes = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      };

      Product.findAll.mockResolvedValue([]);

      await getProducts(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          data: [],
        })
      );
    });
  });

  describe('createProduct', () => {
    it('should create a product with valid data', async () => {
      const mockReq = {
        body: {
          name: 'New Laptop',
          price: 1500,
          stock: 10,
          categoryId: 1,
          description: 'High-performance laptop',
        },
      };

      const mockRes = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      };

      const createdProduct = {
        id: 3,
        ...mockReq.body,
      };

      Product.create.mockResolvedValue(createdProduct);

      await createProduct(mockReq, mockRes);

      expect(Product.create).toHaveBeenCalledWith(mockReq.body);
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          data: createdProduct,
        })
      );
    });

    it('should include product in response after creation', async () => {
      const mockReq = {
        body: {
          name: 'Test Product',
          price: 99.99,
          stock: 5,
        },
      };

      const mockRes = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      };

      const createdProduct = {
        id: 4,
        name: 'Test Product',
        price: 99.99,
        stock: 5,
      };

      Product.create.mockResolvedValue(createdProduct);

      await createProduct(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          data: createdProduct,
        })
      );
    });
  });
});
