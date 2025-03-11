
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');

module.exports = (app) => {
  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());

  // Transforms raw string of req.body into JSON
  app.use(bodyParser.json());

  // Parses urlencoded bodies
  app.use(bodyParser.urlencoded({ extended: true }));

  // Set to trust proxy (needed for session cookie when behind a proxy or load balancer)
  app.set('trust proxy', 1);

  // Creates a session
  app.use(
    session({  
      secret: process.env.SESSION_SECRET,  // Now using the environment variable
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false,  // Use true if you're in production with HTTPS
        maxAge: 24 * 60 * 60 * 1000  // 1 day in milliseconds
      }
    })
  );

  return app;
};
