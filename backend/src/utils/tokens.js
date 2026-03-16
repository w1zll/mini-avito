const jwt = require('jsonwebtoken');

const ACCESS_SECRET = 'access-secret';
const REFRESH_SECRET = 'refresh-secret';

function generateAccessToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, ACCESS_SECRET, {
    expiresIn: '15m',
  });
}

function generateRefreshToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, REFRESH_SECRET, {
    expiresIn: '7d',
  });
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  ACCESS_SECRET,
  REFRESH_SECRET,
};
