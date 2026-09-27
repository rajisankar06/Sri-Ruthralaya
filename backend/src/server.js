require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const { checkDatabaseConnection } = require('./config/db');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const { apiLimiter } = require('./middleware/rateLimiter');

const app = express();
const PORT = process.env.PORT || 5000;

// Serve public uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));
app.use(express.static(path.join(__dirname, '../public')));

// Security Middleware
app.use(helmet({
  crossOriginResourcePolicy: false,
}));

// CORS Configuration
const rawOrigins = (process.env.FRONTEND_URL || 'http://localhost:5173,https://sriruthralaya.netlify.app')
  .split(',')
  .map(url => url.trim().replace(/\/$/, ''))
  .filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, server-to-server)
    if (!origin || process.env.NODE_ENV === 'development') {
      return callback(null, true);
    }
    const cleanOrigin = origin.replace(/\/$/, '');
    const isAllowed = rawOrigins.some(allowed => {
      if (allowed === '*' || allowed === cleanOrigin) return true;
      // Allow any Netlify deploy preview or subdomain if Netlify domain is listed
      if (allowed.includes('netlify.app') && cleanOrigin.endsWith('.netlify.app')) return true;
      return false;
    });
    if (isAllowed) {
      return callback(null, true);
    }
    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Request parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Logging
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
}

// General API rate limiter
app.use('/api/', apiLimiter);

// Root greeting / health status
app.get('/', (req, res) => {
  res.json({
    success: true,
    data: {
      academy: 'Sri Ruthralaya Bharathanatyam Academy',
      motto: 'Natyamevam Pavithram - Traditional Classical Dance Institution',
      location: 'Thiruthangal near Sivakasi, Tamil Nadu',
      apiDoc: '/api/v1/health',
    },
    message: 'Sri Ruthralaya Backend API is active.',
  });
});

// Mount versioned API routes
app.use('/api/v1', routes);

// 404 Handler for unmatched routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    data: null,
    message: `API endpoint '${req.originalUrl}' not found. Please check API documentation.`,
  });
});

// Central Error Handler
app.use(errorHandler);

// Start server
async function startServer() {
  await checkDatabaseConnection();

  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🛕 Sri Ruthralaya Bharathanatyam Academy API Server`);
    console.log(`🚀 Port: ${PORT}`);
    console.log(`🌐 Base URL: http://localhost:${PORT}/api/v1`);
    console.log(`🛡️ Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`====================================================`);
  });
}

startServer();

module.exports = app;
