const authRouter = require('./auth');
const cartRouter = require('./cart');
const orderRouter = require('./order');
const productRouter = require('./product');
const userRouter = require('./user');

module.exports = (app, passport) => {
  authRouter(app, passport);
  cartRouter(app);
  orderRouter(app);
  productRouter(app);
  userRouter(app);

  // Data Deletion Route
  app.get('/data-deletion', (req, res) => {
    res.send('Data Deletion Instructions');
  });
};
