require("dotenv").config({ path: ".env" });
const express = require("express");
const mongoose = require("mongoose");
const restaurantRoute = require('./src/routes/restaurant');
const userRoute = require('./src/routes/user');
const favouriteRoute = require('./src/routes/favourite');

/** App Configurations */
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;


/** Middleware */
app.use(cors());
app.use(express.json());

/** Routes */
app.use('/api/restaurant', restaurantRoute);
app.use('/api/favourite', favouriteRoute);
app.use('/api', userRoute);

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
