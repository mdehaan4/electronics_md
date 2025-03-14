require('dotenv').config();
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');

module.exports = (app) => {
  // Enable Cross Origin Resource Sharing with credentials
  app.use(cors({
    origin: ['http://localhost:5173', 'https://d5f3-82-17-235-177.ngrok-free.app'],
    credentials: true
  }));

  // Transforms raw string of req.body into JSON
  app.use(bodyParser.json());

  // Parses urlencoded bodies
  app.use(bodyParser.urlencoded({ extended: true }));

  // Set to trust proxy (needed for session cookie when behind a proxy or load balancer)
  app.set('trust proxy', 1);

  // Creates a session
  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // 
      maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
      sameSite: 'lax', // 
      httpOnly: true 
    }
  }));
  
  return app;
};
