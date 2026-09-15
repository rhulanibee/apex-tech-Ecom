import formatResponse from '../utils/responseFormatter.js';

export const notFound = (req, res, next) => {
  res.status(404);
  next(new Error(`Route not found - ${req.originalUrl}`));
};

export const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  let message = err.message;

  // Sequelize validation/constraint errors are the client's fault (bad input,
  // duplicate email, etc.) - surface them as 400s with readable messages
  // instead of a generic 500, per the "proper error handling" feedback.
  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    statusCode = 400;
    message = err.errors?.map((e) => e.message).join('; ') || 'Invalid input.';
  }

  if (err.name === 'SequelizeDatabaseError') {
    statusCode = 400;
    message = 'Invalid request data.';
  }

  res.status(statusCode).json(
    formatResponse(
      false,
      null,
      message,
      process.env.NODE_ENV === 'production' ? undefined : err.stack
    )
  );
};
