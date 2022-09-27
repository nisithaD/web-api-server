var express = require('express');
var router = express.Router();
var restaurant_controller = require('../controllers/restaurant_controller');
var { verifyToken } = require('../middlewares/authenticator');

router.get('/', verifyToken, restaurant_controller.get_all_restaurants);
router.get('/:id', verifyToken, restaurant_controller.get_restaurant_by_id);
router.post('/', verifyToken, restaurant_controller.create_restaurant);
router.put('/:id', verifyToken, restaurant_controller.update_restaurant);
router.delete('/:id', verifyToken, restaurant_controller.delete_restaurant);


module.exports = router;