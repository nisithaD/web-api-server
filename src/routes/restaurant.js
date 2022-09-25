var express = require('express');
var router = express.Router();
var restaurant_controller = require('../controllers/restaurant_controller');

router.get('/', restaurant_controller.get_all_restaurants);
router.get('/:id', restaurant_controller.get_restaurant_by_id);
router.post('/', restaurant_controller.create_restaurant);
router.put('/:id', restaurant_controller.update_restaurant);
router.delete('/:id', restaurant_controller.delete_restaurant);


module.exports = router;