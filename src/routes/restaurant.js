var express = require('express');
var router = express.Router();
var RestaurantController = require('../controllers/restaurant_controller');
// var { verifyToken } = require('../middlewares/authenticator');

// Get All restaurants : Rumesh 
router.get('/', RestaurantController.getAllRestaurants);
// Specific Restaurant : Palamkubura
router.get('/:id', RestaurantController.getById);
// Get Specific Restaurant foods : Rumesh
router.get('/:id/foods', RestaurantController.getRestaurantFood);
// Get Specific Restaurant Location
router.get('/:id/location', RestaurantController.getLocation);

// Create a Restaurant
router.post('/', RestaurantController.createRestaurant);
// Add Food to specific Restaurant
router.post('/:id/foods', RestaurantController.addFoods);

// Update a Restaurant
router.put('/:id', RestaurantController.updateRestaurant);
// Update a specific Food Item in a restaurant
router.put('/:id/foods/:fid', RestaurantController.updateSingleFood);
// Update location of a restaurant
router.put('/:id/location', RestaurantController.updateLocation);

// Delete a whole restaurant
router.delete('/:id', RestaurantController.deleteRestaurant);
// Delete Specific Food Item from a restaurant
router.delete('/:id/foods/:fid', RestaurantController.deleteFood);


module.exports = router;