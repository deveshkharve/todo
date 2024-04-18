const { Router } = require('express');
const { verifyUser, createUser } = require('../services/users.js');
const jwt = require('jsonwebtoken');
const { checkJwt, createSecurePassword } = require('../auth.js');
const usersApiRouter = Router()

usersApiRouter.post('/login',  (req, res) => {
  // login user and return jwt getUser
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({ message: 'Title and status are required' });
      return;
    }
  
    verifyUser(username, password)
      .then(user => {
        if(user) {
          // generate jwt token
          const token = jwt.sign({ id: user.id }, 'your_secret_key', { expiresIn: '1h' });
          res.json({ token });
        } else {
          res.status(401).json({ message: 'Invalid username or password' });
        }
      })
      .catch(error => {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Internal server error' });
      });
  })
  
  usersApiRouter.post('/register',  (req, res) => {
  // create user and return jwt createUser
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({ message: 'Title and status are required' });
      return;
    }
    createUser(username, password)
      .then(response => {
        const { message, user } = response
        if(user) {
          // generate jwt token
          const token = jwt.sign({ id: user.id }, 'your_secret_key', { expiresIn: '1h' });
          res.json({ token });
        } else {
          res.status(400).json({ message });
        }
      })
      .catch(error => {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
      });
  })

  usersApiRouter.get('/', checkJwt, (req, res) => {
    // create user and return jwt createUser
    res.status(200).json({ userId: req.userId });
  })


module.exports = {
  usersApiRouter
}
