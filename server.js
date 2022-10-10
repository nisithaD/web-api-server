require("dotenv").config({ path: ".env" });

const express = require("express");
const mongoose = require("mongoose");
//swagger ui
const swaggerUi = require("swagger-ui-express");
//swagger js doc
const swaggerJsDoc = require("swagger-jsdoc");

//swagger options
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Taste Buds API",
      description: "Taste Buds API Information",
      contact: {
        name: "Nisitha",
      },
      servers: ["http://localhost:8000"]
    }
  },
  apis: ["server.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const passport = require('passport');
const session = require('express-session');
const isLoggedIn = require('./src/middlewares/authenticator');

const restaurantRoute = require('./src/routes/restaurant');
const userRoute = require('./src/routes/user');
const authRouter = require('./src/routes/auth');
const orderRoute = require('./src/routes/order');


/** App Configurations */
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


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

app.use(express.json());


/** Routes */
/**
 * @swagger
 * /api/restaurants/:
 *  get:
 *    description: Get all restaurants
 *    responses:
 *      '200':
 *        description: A successful response
 *      '500':
 *        description: Internal server error
 *      '404':
 *        description: Not found
 * 
 * 
 * /api/restaurants/{id}:
 *  parameters:
 *  - in: path
 *  name: id
 *  schema:
 *  type: string
 *  required: true
 *  description: The restaurant id
 *  get:
 *    description: Get a specific restaurant
 *    responses:
 *      '200':
 *        description: A successful response
 *      '500':
 *        description: Internal server error
 *      '404':
 *        description: Not found
 * 
 * 
 * /api/restaurants/{id}/foods:
 *  get:
 *    description: Get all foods of a specific restaurant
 *    responses:
 *      '200':
 *        description: A successful response
 *      '500':
 *        description: Internal server error
 * 
 * 
 * /api/restaurants/{id}/location:
 *  get:
 *    description: Get location of a specific restaurant
 *    responses:
 *      '200':
 *        description: A successful response
 *      '500':
 *        description: Internal server error
 * 
 * 
 * /api/restaurants:post:
 *    description: Create a new restaurant
 *    responses:
 *      '200':
 *        description: A successful response
 *      '500':  
 *        description: Internal server error
 * 
 * 
 * /api/restaurants/{id}/foods:post:
 *  post:
 *   description: Add a new food to a specific restaurant
 *   responses:
 *      '200':
 *        description: A successful response
 *      '500':
 *        description: Internal server error
 * 
 * 
 * /api/restaurants/{id}:put:
 *   description: Update a specific restaurant
 *   responses:
 *      '200':
 *        description: A successful response
 *      '500':
 *        description: Internal server error
 * 
 * 
 * /api/restaurants/{id}/foods/{fid}:put:
 *  description: Update a specific food item of a specific restaurant
 *  responses:
 *   '200':
 *     description: A successful response
 *   '500':
 *     description: Internal server error
 * 
 * 
 * /api/restaurants/{id}/location:put:
 *    description: Update location of a specific restaurant
 *    responses:
 *       '200':
 *         description: A successful response
 *       '500':
 *         description: Internal server error
 */
app.use('/api/restaurants', restaurantRoute);

/**
 * @swagger
 * /api/users/:
 *  get:
 *    description: Get all users
 *    responses:
 *      '200':
 *        description: A successful response
 *      '500':
 *        description: Internal server error
 *      '404':
 *        description: Not found
 * 
 * /api/users/{id}:
 *  get:
 *   description: Get a specific user
 *   responses:
 *    '200':
 *      description: A successful response
 *    '500':
 *      description: Internal server error
 *    '404':
 *      description: Not found
 * 
 * /api/users/{id}/orders:
 *  get:
 *   description: Get all orders of a specific user
 *   responses:
 *    '200':
 *      description: A successful response
 *    '500':
 *      description: Internal server error
 *    '404':
 *      description: Not found
 * 
 * /api/users/{id}/orders/{id}:
 *  get:
 *   description: Get a specific order of a specific user
 *   responses:
 *    '200':
 *      description: A successful response
 *    '500':
 *      description: Internal server error
 *    '404':
 *      description: Not found 
 * 
 * /api/users:
 *  post:
 *    description: Create a new user
 *    responses:
 *      '200':
 *        description: A successful response
 *      '500':
 *        description: Internal server error   
 * */
app.use('/api/users', userRoute);

/**
 * @swagger
 * /api/auth/login:
 *  post:
 *    description: Login to the system
 *    parameters:
 *      - in: body
  *        email: nisithaD@gmail.com
  *        password: Password@123
  *        required: true
 *        schema:
 *          type: object
 *        properties: 
 *          email:
 *           type: string
 *          password:
 *           type: string
 *        example:
 *          email:nisithaD@gmail.com
 *          password:Password@123 
 *    responses:
 *      '200': 
 *       description: A successful response
 * 
 * /api/auth/register:
 *  post:
 *    description: Register to the system
 *    parameters:
 *      - in: body
 *        email: nisithaD@gmail.com
 *        password: Password@123
 *        address: 123, Colombo
 *        phone: 0712345678
 *        isAdmin: false
 *        required: true
 *        schema:
 *          type: object
 *        properties: 
 *          email:
 *           type: string
 *          password:
 *           type: string
 *        example:
 *          email:nisithaD@gmail.com
 *          password:Password@123 
 *    responses:
 *      '200': 
 *       description: A successful response
 * 
 * */        
app.use('/api/auth', authRouter);

/**
 * @swagger
 * /api/orders/:
 *  get:
 *    description: Get all orders
 *    responses:
 *      '200':
 *        description: A successful response
 *      '500':
 *        description: Internal server error
 * 
 * /api/orders/{id}:
 *  get:
 *    description: Get a specific order
 *    responses:
 *      '200':
 *        description: A successful response
 *      '500':
 *        description: Internal server error
 * 
 * /api/orders:
 *  post:
 *    description: Create a new order
 *    responses:
 *      '200':
 *        description: A successful response
 *      '500':
 *        description: Internal server error
 * 
 * /api/orders/{id}:put:
 *   description: Update a specific order
 *   responses:
 *      '200':
 *        description: A successful response
 *      '500':
 *        description: Internal server error
 * 
 * /api/orders/{id}:delete:
 *   description: Delete a specific order
 *   responses:
 *      '200':
 *        description: A successful response
 *      '500':
 *        description: Internal server error
 * */
app.use('/api/orders', orderRoute);


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
