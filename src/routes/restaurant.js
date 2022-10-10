var express = require('express');
var router = express.Router();
var RestaurantController = require('../controllers/restaurant_controller');
var { verifyToken, isAdmin } = require('../middlewares/authenticator');

// Get All restaurants : Rumesh 
router.get('/', RestaurantController.getAllRestaurants);
// Specific Restaurant : Palamkubura
router.get('/:id', RestaurantController.getById);
// Get Specific Restaurant foods : Rumesh
router.get('/:id/foods', RestaurantController.getRestaurantFood);
// Get Specific Restaurant Location
router.get('/:id/location', RestaurantController.getLocation);

// Create a Restaurant
router.post('/', verifyToken, isAdmin, RestaurantController.createRestaurant);
// Add Food to specific Restaurant
router.post('/:id/foods', verifyToken, isAdmin, RestaurantController.addFoods);

// Update a Restaurant
router.put('/:id', verifyToken, isAdmin, RestaurantController.updateRestaurant);
// Update a specific Food Item in a restaurant
router.put('/:id/foods/:fid', verifyToken, RestaurantController.updateSingleFood);
// Update location of a restaurant
router.put('/:id/location', verifyToken, isAdmin, RestaurantController.updateLocation);

// Delete a whole restaurant
router.delete('/:id', verifyToken, isAdmin, RestaurantController.deleteRestaurant);
// Delete Specific Food Item from a restaurant
router.delete('/:id/foods/:fid', verifyToken, isAdmin, RestaurantController.deleteFood);


module.exports = router;