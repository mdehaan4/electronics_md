module.exports = {
  PORT: process.env.PORT || 4000, 
  SESSION_SECRET: process.env.SESSION_SECRET,

  DB: {
    PGHOST: process.env.PGHOST,
    PGUSER: process.env.PGUSER,
    PGDATABASE: process.env.PGDATABASE,
    PGPASSWORD: process.env.PGPASSWORD,
    PGPORT: process.env.PGPORT
  },

  FACEBOOK: {
    CALLBACK_URL: process.env.FACEBOOK_CALLBACK_URL,
    CONSUMER_KEY: process.env.FACEBOOK_CLIENT_ID,
    CONSUMER_SECRET: process.env.FACEBOOK_CLIENT_SECRET
  },
  GOOGLE: {
    CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
    CONSUMER_KEY: process.env.GOOGLE_CLIENT_ID,
    CONSUMER_SECRET: process.env.GOOGLE_CLIENT_SECRET
  },
  STRIPE: {
    SECRET_KEY: process.env.STRIPE_SECRET_KEY
  }
};
