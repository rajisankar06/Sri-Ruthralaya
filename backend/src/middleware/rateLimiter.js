const rateLimit = require('express-rate-limit');

// Rate limiter for authentication routes (login/register/forgot-password)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // Limit each IP to 30 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    data: null,
    message: 'Too many authentication attempts from this IP, please try again after 15 minutes.',
  },
});

// Rate limiter for Chatbot messages
const chatbotLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20, // 20 messages per minute
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    data: null,
    message: 'Chatbot rate limit reached. Please wait a moment before sending more messages.',
  },
});

// General API limiter
const apiLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    data: null,
    message: 'Too many API requests, please slow down.',
  },
});

module.exports = {
  authLimiter,
  chatbotLimiter,
  apiLimiter,
};
