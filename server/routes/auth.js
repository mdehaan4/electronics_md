const express = require('express');
const router = express.Router();
const createError = require('http-errors');  // Add this import for error handling

// Instantiate Services
const AuthService = require('../services/AuthService');
const AuthServiceInstance = new AuthService();

module.exports = (app, passport) => {

  app.use('/auth', router);

  // Registration Endpoint
  router.post('/register', async (req, res, next) => {
    try {
      const data = req.body;
      const response = await AuthServiceInstance.register(data);
      res.status(200).send(response);
    } catch(err) {
      next(err);
    }
  });


  // Add this route to check if user is authenticated
  router.get('/me', (req, res, next) => {
    try {
      if (req.isAuthenticated()) {
        return res.json({ user: req.user });
      } else {
        return res.status(401).json({ message: 'Not authenticated' });
      }
    } catch (err) {
      next(createError(500, 'Internal Server Error'));
    }
  });

  router.post('/login', passport.authenticate('local'), (req, res) => {
    console.log(req.session); // Log the session object to see if it's being created
    res.status(200).send(req.user); // Send authenticated user as response
  });

  // Google OAuth
  router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
  router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    console.log('✅ Google login success:', req.user);
    res.redirect(`http://localhost:5173/`); // Redirect to home or dashboard after successful login
  });

  // Facebook OAuth
  router.get('/facebook', passport.authenticate('facebook'));
  router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
    res.redirect(`http://localhost:5173/`); // Redirect to home or dashboard after successful login
  });
};
