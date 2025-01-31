const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const AuthService = require('../services/AuthService');
const AuthServiceInstance = new AuthService();

module.exports = (app) => {

  // Initialize passport
  app.use(passport.initialize());  
  app.use(passport.session());
  
  // Set method to serialize data to store in cookie
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  // Set method to deserialize data stored in cookie and attach to req.user
  passport.deserializeUser((id, done) => {
    // Implement logic to find user by ID
    AuthServiceInstance.findUserById(id)
      .then(user => done(null, user))
      .catch(err => done(err));
  });

  // Configure local strategy for local login
  passport.use(new LocalStrategy(
    async (username, password, done) => {
      try {
        const user = await AuthServiceInstance.login({ email: username, password });
        return done(null, user);
      } catch(err) {
        return done(err);
      }
    }
  ));

  // Configure Google strategy
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      // Find or create user in your database
      const user = await AuthServiceInstance.findOrCreateGoogleUser(profile);
      done(null, user);
    } catch (err) {
      done(err);
    }
  }));

  // Configure Facebook strategy
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: '/auth/facebook/callback'
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      // Find or create user in your database
      const user = await AuthServiceInstance.findOrCreateFacebookUser(profile);
      done(null, user);
    } catch (err) {
      done(err);
    }
  }));

  return passport;
}
