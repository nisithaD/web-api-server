var express = require('express');
var router = express.Router();
var { Restaurant } = require('../models/restaurant');
var RestaurantController = require('../controllers/restaurant_controller');
const { application } = require('express');
// var { verifyToken } = require('../middlewares/authenticator');

// Get All restaurants : Rumesh 
router.get('/', RestaurantController.getAllRestaurants);
// Specific Restaurant : Palamkubura
router.get('/:id',  RestaurantController.getById);
// TODO: Get Specific Restaurant foods : Rumesh
router.get('/:id/foods', RestaurantController.getRestaurantFood);
// TODO: Get Specific Restaurant Location
router.get('/:id/location', (req, res) => { });

// Create a Restaurant
router.post('/', (req,res)=>{});
// TODO:: Add Food to specific Restaurant
router.post('/:res_id/foods', (req, res) => { });

// Update a Restaurant
router.put('/:id', (req,res)=>{});
// TODO: Update a specific Food Item in a restaurant
router.put('/:id/food/:fid', (req, res) => { });
// TODO: Update location of a restaurant
router.put('/:id/location', (req, res) => { });

// Delete a whole restaurant
router.delete('/:id', (req,res)=>{});
// TODO: Delete Specific Food Item from a restaurant
router.delete('/:id/foods/:fid', (req, res) => { });


module.exports = router;