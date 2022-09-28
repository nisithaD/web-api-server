require("dotenv").config({ path: ".env" });
const express = require("express");
const mongoose = require("mongoose");
var restaurantRoute = require('./src/routes/restaurant');
var userRoute = require('./src/routes/user');

/** App Configurations */
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;


/** Middleware */
app.use(cors());
app.use(express.json());

/** Routes */
app.use('/api/restaurants', restaurantRoute);
app.use('/api/users', userRoute);

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
