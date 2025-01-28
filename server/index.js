// Load environment variables from .env
require('dotenv').config({ path: '../client/.env' });

const express = require('express');
const app = express();

const loaders = require('./loaders');
const { PORT } = require('./config'); // PORT should be from your config.js

async function startServer() {
  // Initialize application loaders (like middleware)
  loaders(app);

  // Start the server
  app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
  });
}

startServer();
