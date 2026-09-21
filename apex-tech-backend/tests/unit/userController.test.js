import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as userController from '../../controllers/userController.js';
import UserRepository from '../../repositories/userRepository.js';
import bcrypt from 'bcryptjs';

vi.mock('../../repositories/userRepository.js');
vi.mock('jsonwebtoken');

describe('User Controller', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('registerUser', () => {
    it('should register a new user with valid data', async () => {
      const mockReq = {
        body: {
          firstName: 'Test',
          lastName: 'User',
          email: 'test@example.com',
          password: 'password123',
        },
      };

      const mockRes = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      };

      UserRepository.findByEmail.mockResolvedValue(null);
      UserRepository.create.mockResolvedValue({
        id: 1,
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        role: 'User',
        toJSON: () => ({
          id: 1,
          firstName: 'Test',
          lastName: 'User',
          email: 'test@example.com',
          role: 'User',
        }),
      });

      await userController.registerUser(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(UserRepository.findByEmail).toHaveBeenCalledWith('test@example.com');
      expect(UserRepository.create).toHaveBeenCalled();
    });

    it('should reject registration with missing fields', async () => {
      const mockReq = {
        body: {
          firstName: 'Test',
          lastName: 'User',
          // email missing
          password: 'password123',
        },
      };

      const mockRes = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      };

      await userController.registerUser(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
    });

    it('should reject duplicate email', async () => {
      const mockReq = {
        body: {
          firstName: 'Test',
          lastName: 'User',
          email: 'existing@example.com',
          password: 'password123',
        },
      };

      const mockRes = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      };

      UserRepository.findByEmail.mockResolvedValue({ id: 1, email: 'existing@example.com' });

      await userController.registerUser(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
    });
  });

  describe('loginUser', () => {
    it('should login with valid credentials', async () => {
      const mockReq = {
        body: {
          email: 'test@example.com',
          password: 'password123',
        },
      };

      const mockRes = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      };

      const mockUser = {
        id: 1,
        email: 'test@example.com',
        passwordHash: await bcrypt.hash('password123', 10),
        role: 'User',
        toJSON: () => ({
          id: 1,
          email: 'test@example.com',
          role: 'User',
        }),
      };

      UserRepository.findByEmail.mockResolvedValue(mockUser);

      await userController.loginUser(mockReq, mockRes);

      expect(UserRepository.findByEmail).toHaveBeenCalledWith('test@example.com');
      expect(mockRes.json).toHaveBeenCalled();
    });

    it('should reject login with wrong password', async () => {
      const mockReq = {
        body: {
          email: 'test@example.com',
          password: 'wrongpassword',
        },
      };

      const mockRes = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      };

      const mockUser = {
        id: 1,
        email: 'test@example.com',
        passwordHash: await bcrypt.hash('password123', 10),
        role: 'User',
        toJSON: () => ({
          id: 1,
          email: 'test@example.com',
          role: 'User',
        }),
      };

      UserRepository.findByEmail.mockResolvedValue(mockUser);

      await userController.loginUser(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(401);
    });

    it('should reject login with non-existent user', async () => {
      const mockReq = {
        body: {
          email: 'nonexistent@example.com',
          password: 'password123',
        },
      };

      const mockRes = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      };

      UserRepository.findByEmail.mockResolvedValue(null);

      await userController.loginUser(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(401);
    });
  });
});
