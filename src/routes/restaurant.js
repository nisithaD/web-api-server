var express = require('express');
var router = express.Router();
var { Restaurant } = require('../models/restaurant');

/* GET home page. */
router.get('/', async function (req, res, next) {
  const allRestaurants = await Restaurant.find();
  res.send(allRestaurants);
});

module.exports = router;