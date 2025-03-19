require('dotenv').config();
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');

module.exports = (app) => {
  // Enable Cross-Origin Resource Sharing (CORS)
  app.use(cors({
    origin: ['http://localhost:5173', 'https://ed3f-82-17-235-177.ngrok-free.app'],
    credentials: true
  }));

  // Parse incoming request bodies
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // Trust proxy settings for cookies over Ngrok
  app.set('trust proxy', 1);

  // Session configuration (✅ Secure for Ngrok, not for local development)
  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production' || process.env.USE_NGROK === 'true', // ✅ Secure for Ngrok
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      sameSite: 'None', // ✅ Required for cross-origin requests
      httpOnly: true
    }
  }));


  return app;
};
