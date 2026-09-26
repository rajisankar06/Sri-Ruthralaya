/**
 * Central Error Handler Middleware
 * Formats all errors into standard JSON: { success: false, data: null, message: ... }
 */
function errorHandler(err, req, res, next) {
  console.error('❌ Server Error:', err);

  const statusCode = err.statusCode || (res.statusCode !== 200 ? res.statusCode : 500);

  // Handle Zod validation errors
  if (err.name === 'ZodError') {
    const errorDetails = err.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ');
    return res.status(400).json({
      success: false,
      data: null,
      message: `Validation Error: ${errorDetails}`,
    });
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      data: null,
      message: 'Invalid or malformed authentication token.',
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      data: null,
      message: 'Authentication token has expired. Please refresh your session.',
    });
  }

  res.status(statusCode).json({
    success: false,
    data: null,
    message: err.message || 'An unexpected internal server error occurred.',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
}

module.exports = errorHandler;
