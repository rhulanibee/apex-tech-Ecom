import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import UserRepository from '../repositories/userRepository.js';
import formatResponse from '../utils/responseFormatter.js';

const signToken = (user) =>
  jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
  });

const sanitizeUser = (user) => {
  const { passwordHash, ...safe } = user.toJSON();
  return safe;
};

export const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json(formatResponse(false, null, 'All fields are required'));
  }

  const existingUser = await UserRepository.findByEmail(email);
  if (existingUser) {
    return res.status(400).json(formatResponse(false, null, 'User already exists'));
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = await UserRepository.create({ firstName, lastName, email, passwordHash });
  const token = signToken(user);

  res.status(201).json(formatResponse(true, { user: sanitizeUser(user), token }, 'User registered successfully'));
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await UserRepository.findByEmail(email);
  if (!user) {
    return res.status(401).json(formatResponse(false, null, 'Invalid credentials'));
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    return res.status(401).json(formatResponse(false, null, 'Invalid credentials'));
  }

  const token = signToken(user);
  res.json(formatResponse(true, { user: sanitizeUser(user), token }, 'Login successful'));
});

export const getMe = asyncHandler(async (req, res) => {
  const user = await UserRepository.findById(req.user.id);
  res.json(formatResponse(true, user, 'Current user'));
});
