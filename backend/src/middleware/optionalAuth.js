const jwt = require('jsonwebtoken');
const { ACCESS_SECRET } = require('../utils/tokens');

module.exports = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header) {
    return next();
  }
  try {
    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, ACCESS_SECRET);

    req.user = decoded;
  } catch (err) {
    console.log('Invalid token');
  }
  next();
};
