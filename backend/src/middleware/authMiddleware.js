const jwt = require('jsonwebtoken');
const { ACCESS_SECRET } = require('../utils/tokens');

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const user = jwt.verify(token, ACCESS_SECRET);
    req.user = user;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
}

module.exports = authMiddleware;
