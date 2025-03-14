const express = require('express');
const app = express();

const loaders = require('./loaders');
const { PORT } = require('./config');

async function startServer() {
 

  // ✅ Load all middlewares & services (including session & passport)
  await loaders(app);

  // ✅ Start server
  app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
  });
}

startServer();
