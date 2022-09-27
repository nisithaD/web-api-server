require("dotenv").config({ path: ".env" });
const express = require("express");
const mongoose = require("mongoose");
const passport = require('passport');
const session = require('express-session');
const isLoggedIn = require('./src/middlewares/authenticator');

const restaurantRoute = require('./src/routes/restaurant');
const userRoute = require('./src/routes/user.js');
const authRouter = require('./src/routes/auth');


/** App Configurations */
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;


/** Middleware */
app.use(cors());
app.use(express.json());
app.use(session({
  secret: 'taste',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


/** Routes */
app.use('/api/restaurants', restaurantRoute);
app.use('/api/users', userRoute);
app.use('/api/auth', authRouter);


app.listen(port, async () => {
  try {
    console.log('Initialize connections....')
    // Load ENV variables
    const ENV = process.env;
    await mongoose.connect(
      "mongodb://" + ENV.DB_USER + ":" + ENV.DB_PASSWORD + "@" + ENV.IP + "/" + ENV.DB
    );
    console.log(`Server is listning on ${port}`)
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
});
