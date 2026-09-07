import formatResponse from '../utils/responseFormatter.js';

export const notFound = (req, res, next) => {
  res.status(404);
  next(new Error(`Route not found - ${req.originalUrl}`));
};

export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json(
    formatResponse(
      false,
      null,
      err.message,
      process.env.NODE_ENV === 'production' ? undefined : err.stack
    )
  );
};
