const jwt = require('jsonwebtoken');
const {logger} = require('./utils/logger')

const checkJwt = (req, res, next) => {
  const token = req.headers['authorization'];
  logger.info('token', { token: token.replace('Bearer ', '') })
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }
  jwt.verify(token.replace('Bearer ', ''), 'your_secret_key', (err, decoded) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to authenticate token' });
    }

    req.userId = decoded.id;
    next();
  });
};


const bcrypt = require('bcrypt');

const createSecurePassword = async (password) => {
  const saltRounds = 10;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    logger.info('hashed password',  { password, hashedPassword })
    return hashedPassword;
  } catch (error) {
    console.error('Error creating secure password:', error);
    throw error;
  }
}

module.exports = {
  checkJwt,
  createSecurePassword
};


