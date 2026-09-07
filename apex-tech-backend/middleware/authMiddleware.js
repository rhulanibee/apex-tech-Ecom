import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { User } from '../models/index.js';

// Verify JWT. The original version called `User.findById(...).select(...)`,
// which is Mongoose's API — it doesn't exist on a Sequelize model and would
// throw a TypeError on every protected request. Fixed to use findByPk.
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findByPk(decoded.id, {
      attributes: { exclude: ['passwordHash'] },
    });
    if (!req.user) {
      res.status(401);
      throw new Error('Not authorized, user no longer exists');
    }
    next();
  } catch (error) {
    res.status(401);
    throw new Error('Not authorized, token failed');
  }
});

export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'Admin') {
    return next();
  }
  res.status(403);
  throw new Error('Admin access only');
};
