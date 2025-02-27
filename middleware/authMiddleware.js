const jwt = require('jsonwebtoken');
const createError = require('../utils/createError');
const dotenv = require('dotenv');

dotenv.config();

const authMiddleware = (req, res, next) => {
  const token = req.cookies.access_token || req.header('Authorization');

  if (!token) {
    return next(createError({ status: 401, message: 'No token, authorization denied' }));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(createError({ status: 401, message: 'Unauthorized, invalid token' }));
    }
    req.user = decoded;
    next();
  });
};

module.exports = authMiddleware;
