const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'sri_ruthralaya_jwt_access_secret_key_super_secure_2026';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'sri_ruthralaya_jwt_refresh_secret_key_super_secure_2026';

function generateAccessToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
      status: user.status,
    },
    JWT_SECRET,
    { expiresIn: '15m' }
  );
}

function generateRefreshToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );
}

function verifyRefreshToken(token) {
  return jwt.verify(token, JWT_REFRESH_SECRET);
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  JWT_SECRET,
  JWT_REFRESH_SECRET,
};
