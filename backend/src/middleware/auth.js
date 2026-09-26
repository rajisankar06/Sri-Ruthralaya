const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'sri_ruthralaya_jwt_access_secret_key_super_secure_2026';

/**
 * Authenticates request using JWT Bearer token
 */
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!token) {
    return res.status(401).json({
      success: false,
      data: null,
      message: 'Access denied. No authorization token provided.',
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        data: null,
        message: 'Token expired. Please refresh your session.',
      });
    }
    return res.status(403).json({
      success: false,
      data: null,
      message: 'Invalid or forged authentication token.',
    });
  }
}

/**
 * Optional authentication - extracts user if token provided, but doesn't block if missing
 */
function optionalAuth(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
    } catch {
      // Ignored for optional auth
    }
  }
  next();
}

/**
 * Enforces role-based permissions
 * @param {Array<string>} roles - e.g. ['admin'], ['admin', 'staff'], ['student']
 */
function requireRole(roles = []) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        data: null,
        message: 'Authentication required.',
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        data: null,
        message: `Forbidden: Access requires one of [${roles.join(', ')}] roles. Your role is '${req.user.role}'.`,
      });
    }

    next();
  };
}

module.exports = {
  authenticateToken,
  optionalAuth,
  requireRole,
};
